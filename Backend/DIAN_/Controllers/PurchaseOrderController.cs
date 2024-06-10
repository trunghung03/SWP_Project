using DIAN_.DTOs.CollectionDTO;
using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using DIAN_.Services;
using DIAN_.VnPay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Serilog;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.X9;


namespace DIAN_.Controllers
{
    [Route("api/purchaseorders")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepo;

        private readonly IOrderService _orderService;

        private readonly ApplicationDbContext _context;

        private readonly IVnPayService _vnPayService;

        private ILoggerManager _loggerManager;

        public PurchaseOrderController(IPurchaseOrderRepository purchaseOrderRepo, IOrderService orderService,
            ApplicationDbContext context, IVnPayService vpnPayService, ILoggerManager loggerManager)
        {
            _purchaseOrderRepo = purchaseOrderRepo;
            _orderService = orderService;
            _context = context;
            _vnPayService = vpnPayService;
            _loggerManager = loggerManager;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var purchaseOrders = await _purchaseOrderRepo.GetAllPurchaseOrderAsync();
            return Ok(purchaseOrders);
        }


        //
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInfo(int id)
        {
            var purchaseOrderInfo = await _purchaseOrderRepo.GetPurchaseOrderInfoAsync(id);
            if (purchaseOrderInfo == null)
            {
                return NotFound();
            }
            return Ok(purchaseOrderInfo.ToPurchaseOrderDetail());
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreatePurchaseOrderDTO purchaseOrderDTO)
        {

                var order = purchaseOrderDTO.ToCreatePurchaseOrder();
                var createdOrder = await _purchaseOrderRepo.CreatePurchaseOrderAsync(order);
                return CreatedAtAction(nameof(GetInfo), new { id = createdOrder.OrderId }, createdOrder.ToPurchaseOrderDTO());

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePurchaseOrderDTO purchaseOrderDTO)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var purchaseOrder = await _purchaseOrderRepo.UpdatePurchaseOrderAsync(purchaseOrderDTO.ToUpdatePurchaseOrder(id), id);

            if (purchaseOrder == null) { return BadRequest("Error! Please try again!"); }

            return Ok(purchaseOrder);
        }

        [HttpPost("checkout")]
        public ActionResult Checkout(CreatePurchaseOrderDTO purchaseOrderDTO, string promotionCode)
        {
            var createdOrderResult = _orderService.CreatePurchaseOrderAsync(purchaseOrderDTO, promotionCode);

            return Ok(createdOrderResult);
        }


        // Endpoint to view orders by status
        [HttpGet("status/{status}")]
        public async Task<ActionResult<List<Purchaseorder>>> ViewOrderByStatus(string status)
        {
            var orders = await _purchaseOrderRepo.GetPurchaseOrderStatusAsync(status);
            if (orders == null)
            {
                return NotFound($"Cannot find {status} order");

            }
            return orders;
        }

        [HttpPost("apply-coupon")]
        public async Task<ActionResult<decimal>> ApplyCoupon(string code, decimal totalPrice)
        {
            var updatedTotalPrice = await _orderService.ApplyCoupon(code, totalPrice);
            return Ok(updatedTotalPrice);
        }

        [HttpPost("check-used-points")]
        public async Task<ActionResult<decimal>> CheckUsedPoints(int userId, decimal totalPrice, bool usedPoints)
        {
            var updatedTotalPrice = await _orderService.CheckUsedPoints(userId, totalPrice, usedPoints);
            return Ok(updatedTotalPrice);
        }

        [HttpPost("request-vnpay-payment")]
        public async Task<IActionResult> RequestVnPayPayment([FromBody] VnPaymentRequestModel model)
        {
            try
            {
                var paymentUrl = await Task.Run(() => _vnPayService.CreatePaymentUrl(HttpContext, model));

                if (string.IsNullOrEmpty(paymentUrl))
                {
                    return BadRequest(new { message = "Unable to create payment URL." });
                }

                return Ok(new { paymentUrl = paymentUrl });
            }
            catch (Exception)
            {
                throw;
            }
        }

        //[HttpPost("vnpay-return")]
        //public async Task<IActionResult> PaymentCallBack()
        //{
        //    var response = _vnPayService.PaymentExecute(Request.Query);

        //    if (response == null)
        //    {
        //        return BadRequest("Error processing VN Pay payment: No response received.");
        //    }

        //    var order = await _purchaseOrderRepo.GetPurchaseOrderInfoAsync(int.Parse(response.OrderId));
        //    if (order == null)
        //    {
        //        return NotFound($"Order with ID {response.OrderId} not found.");
        //    }

        //    var OrderStatus = response.VnPayResponseCode == "00" ? "Paid" : "Failed";

        //    var updatedOrder = await _purchaseOrderRepo.UpdatePurchaseOrderStatusAsync(order.OrderId, OrderStatus);
        //    if (updatedOrder == null)
        //    {
        //        return BadRequest("Error updating order status.");
        //    }
        //    return Ok("VNPay payment processed successfully");
        //}

        //test
        [HttpGet("vnpay-ipn-return")]
        public IActionResult PaymentUpdateDatabase()
        {
            try
            {
                var result = _vnPayService.PaymentUpdateDatabase(Request.Query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //test
        [HttpGet("vnpay-return")]
        public IActionResult PaymentExecute()
        {
            try
            {
                var result = _vnPayService.PaymentExecute(Request.Query);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("GetQR")]
        public async Task<IActionResult> GetQR(VnPayQrRequestDto payQrRequest)
        {
            try
            {
                var pathImage = await _vnPayService.GenerateQRCodeAsync(payQrRequest);
                return Ok(pathImage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

