using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Stores;
using DIAN_.VnPay;
using Hangfire.Logging;
using log4net;
using MailKit.Search;
using NLog;
using NLog.Config;
using System.Net.Http.Headers;
using System.Net;
using DIAN_.Common;
using System.Text.Json;
using NLog.Targets;
using System.Text;
using Microsoft.AspNetCore.Http;
using DIAN_.Models;
using Azure;
namespace DIAN_.Services
{
    public class VnPayService : IVnPayService
    {
        private readonly IConfiguration _config;
        private readonly ILogger<VnPayService> _logger;
        private IPurchaseOrderRepository _purchaseOrderRepository;
        private IHttpClientFactory _factory;
        private readonly JsonSerializerOptions _jsonSerializerOptions;
        public VnPayService(IConfiguration config, ILogger<VnPayService> logger, IPurchaseOrderRepository purchaseOrderRepository,
             IHttpClientFactory factory)
        {
            _config = config;
            _logger = logger;
            _purchaseOrderRepository = purchaseOrderRepository;
            _factory = factory;
            _jsonSerializerOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
        }

        public string CreatePaymentUrl(HttpContext context, VnPaymentRequestModel model)
        {
            var tick = DateTime.Now.Ticks.ToString();

            var vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", _config["VnPay:Version"]);
            vnpay.AddRequestData("vnp_Command", _config["VnPay:Command"]);
            vnpay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"]);
            vnpay.AddRequestData("vnp_Amount", (model.Amount * 100).ToString()); //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000

            vnpay.AddRequestData("vnp_CreateDate", model.CreatedDate.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", _config["VnPay:CurrCode"]);
            vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            vnpay.AddRequestData("vnp_Locale", _config["VnPay:Locale"]);

            vnpay.AddRequestData("vnp_OrderInfo", "Thanh toán cho đơn hàng:" + model.OrderId);
            vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other
            vnpay.AddRequestData("vnp_ReturnUrl", _config["VnPay:ReturnUrl"]);

            var id = model.OrderId.ToString();
            vnpay.AddRequestData("vnp_TxnRef", id); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

            var paymentUrl = vnpay.CreateRequestUrl(_config["VnPay:BaseUrl"], _config["VnPay:HashSecret"]);
            _logger.LogInformation("create payment");
            return paymentUrl;
        }
        public VnPaymentResponseModel PaymentExecute(IQueryCollection collections) // not save data to database yet
        {
            _logger.LogInformation("start paymetn excute");
            var vnpay = new VnPayLibrary();
            foreach (var (key, value) in collections)
            {
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnpay.AddResponseData(key, value.ToString());
                }
            }
            var message = string.Empty;
            var vnp_orderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
            var vnp_TransactionId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
            var vnp_SecureHash = collections.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value;
            var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
            var vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");
            var vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus");
            var TerminalID = collections["vnp_TmnCode"].ToString();
            var vnp_Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount"));
            _logger.LogInformation("check sig");
            bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _config["VnPay:HashSecret"]);
            if (checkSignature)
            {
                if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                {
                    message = "Payment successfully. Thank you for choosing Dian Diamond Jewelry.";
                    _logger.LogInformation($"Payment successfully, OrderId={vnp_orderId}, VNPAY TranId={vnp_TransactionId}");
                }
                else
                {
                    message = $"Error while processing payment. Error code: {vnp_ResponseCode}";
                    _logger.LogInformation($"Payment error, OrderId={vnp_orderId}, VNPAY TranId={vnp_TransactionId}, ResponseCode={vnp_ResponseCode}");
                }
            }
            else
            {
                _logger.LogInformation($"Invalid signature, InputData={collections}");
                message = "Error while processing payment.";
            }
            _logger.LogInformation("before return vnpaymentresponsemodel");
            return new VnPaymentResponseModel
            {
                Success = true,
                PaymentMethod = "VnPay",
                OrderDescription = vnp_OrderInfo,
                OrderId = vnp_orderId.ToString(),
                TransactionId = vnp_TransactionId.ToString(),
                Token = vnp_SecureHash,
                VnPayResponseCode = vnp_ResponseCode,
                Amount = vnpay.GetResponseData("vnp_Amount"),
                Message = message
            };

        }
        public async Task<(string StatusCode, string Message)> PaymentUpdateDatabase(IQueryCollection collections) //ipn return 
        {
            _logger.LogInformation("start func payment update db");
            string returnContent = string.Empty;
            var message = string.Empty;
            if (collections.Count > 0)
            {
                var vnpay = new VnPayLibrary();
                foreach (var (key, value) in collections)
                {
                    if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                    {
                        vnpay.AddResponseData(key, value.ToString());
                    }
                }
                var vnp_orderId = Convert.ToInt64(vnpay.GetResponseData("vnp_TxnRef"));
                var vnp_TransactionId = Convert.ToInt64(vnpay.GetResponseData("vnp_TransactionNo"));
                var vnp_SecureHash = collections.FirstOrDefault(p => p.Key == "vnp_SecureHash").Value;
                var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
                var vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");
                var vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus");
                var TerminalID = _config["VnPay:TmnCode"].ToString();
                var vnp_Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount"));

                bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash, _config["VnPay:HashSecret"]);
                if (checkSignature)
                {
                    _logger.LogInformation("initialize inst");
                    //Purchaseorder purchaseorder = new Purchaseorder();
                    //purchaseorder.OrderId = (int)vnp_orderId;
                    var purchaseorderTask = await  _purchaseOrderRepository.GetPurchasrOrderById((int)vnp_orderId);
                    _logger.LogInformation("get id done");
                    _logger.LogInformation($"order id: {vnp_orderId}");
                    if (purchaseorderTask == null)
                    {
                        returnContent = "{\"RspCode\":\"01\",\"Message\":\"Order not found\"}";
                        _logger.LogInformation("not found id");
                    }
                    else
                    {
                        _logger.LogInformation("declare order ");
                        var purchaseorder = purchaseorderTask;
                        if (purchaseorder != null)
                        {
                            //_logger.LogInformation("check amount");
                            //_logger.LogInformation($"{ purchaseorder.TotalPrice }");
                            //_logger.LogInformation($"{vnp_Amount}");


                                _logger.LogInformation("check order status");
                                _logger.LogInformation($"{purchaseorder.OrderStatus}");
                                if (purchaseorder.OrderStatus == "Unpaid")
                                {
                                    _logger.LogInformation("start update status");
                                    UpdateOrderStatus order = new UpdateOrderStatus();
                                    if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                                    {
                                        //order.OrderStatus = "Paid";
                                        message = "Payment successfully. Thank you for choosing Dian Diamond Jewelry.";
                                        _logger.LogInformation($"Payment successfully, OrderId={vnp_orderId}, VNPAY TranId={vnp_TransactionId}");
                                        var orderUpdate = await _purchaseOrderRepository.UpdatePurchaseOrderStatusAsync(purchaseorder.OrderId, "Paid");
                                        _logger.LogInformation("end update status");

                                    }
                                    else
                                    {
                                        order.OrderStatus = "Failed";
                                        message = $"Error while processing payment. Error code: {vnp_ResponseCode}";
                                        _logger.LogInformation($"Payment error, OrderId={vnp_orderId}, VNPAY TranId={vnp_TransactionId}, ResponseCode={vnp_ResponseCode}");
                                        var orderUpdate = await _purchaseOrderRepository.UpdatePurchaseOrderStatusAsync(purchaseorder.OrderId, order.OrderStatus);
                                    }
                                    return ($"{{\"RspCode\":\"{vnp_ResponseCode}\",\"Message\":\"{message}\"}}", message);
                                }
                                else
                                {
                                    returnContent = "{\"RspCode\":\"02\",\"Message\":\"Order already confirmed\"}";
                                }
                          
                        }
                    }
                }
                else
                {
                    _logger.LogInformation($"Invalid signature, InputData={collections}");
                    returnContent = "{\"RspCode\":\"97\",\"Message\":\"Invalid signature\"}";
                }
            }
            else
            {
                returnContent = "{\"RspCode\":\"99\",\"Message\":\"Input data required\"}";
            }
            return (returnContent, message);
        }

        public async Task<string> GenerateQRCodeAsync(VnPayQrRequestDto payQrRequest)
        {
            HttpClient client = _factory.CreateClient();
            client.BaseAddress = new Uri(_config["VnPay:UrlCreateQR"]);

            if (!TokenStore.TokenVNP.ContainsKey(Constants.KEY_TOKEN_DIC))
            {
                TokenStore.TokenVNP.Add(Constants.KEY_TOKEN_DIC, "");
            }

            string queryString = $"?Amount={payQrRequest.Amount}&MerchantCode={payQrRequest.MerchantCode}&ImageFormat={payQrRequest.ImageFormat}" +
                $"&ImageType={payQrRequest.ImageType}&TerminalID={payQrRequest.TerminalID}&Height={payQrRequest.Height}" +
                $"&Width={payQrRequest.Width}&BillNumber={payQrRequest.BillNumber}";

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", TokenStore.TokenVNP[Constants.KEY_TOKEN_DIC]);

            var response = await client.GetAsync(queryString);

            if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                GetToken();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", TokenStore.TokenVNP[Constants.KEY_TOKEN_DIC]);
                response = await client.GetAsync(queryString);
            }

            string jsonData = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<VnPayQrResponse>(jsonData, _jsonSerializerOptions);
            var pathImage = Utils.Base64ToImage(data.Data.Image, Guid.NewGuid().ToString(), _config["VnPay:PathImage"]);

            return pathImage;
        }
        private void GetToken()
        {
            HttpClient client = _factory.CreateClient();
            client.BaseAddress = new Uri(_config["VnPayQR:UrlGetToken"]);
            string queryString = Constants.QUERY_STRING_TOKEN;

            // Thêm xác thực cơ bản vào header yêu cầu
            string credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_config["VnPayQR:UserName"]}:{_config["VnPayQR:Password"]}"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
            // Tạo nội dung yêu cầu
            var content = new StringContent("", Encoding.UTF8, "application/json");
            var response = client.PostAsync(queryString, content).Result;
            string jsonData = response.Content.ReadAsStringAsync().Result;
            var data = JsonSerializer.Deserialize<VnPayToken>(jsonData, _jsonSerializerOptions);

            if (!TokenStore.TokenVNP.ContainsKey(Constants.KEY_TOKEN_DIC))
            {
                TokenStore.TokenVNP.Add(Constants.KEY_TOKEN_DIC, data.Access_token);
            }
            else
            {
                TokenStore.TokenVNP.Remove(Constants.KEY_TOKEN_DIC);
                TokenStore.TokenVNP.Add(Constants.KEY_TOKEN_DIC, data.Access_token);
            }
        }


    }
}
