using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.VnPay;
using Microsoft.AspNetCore.Mvc;


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
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var purchaseOrders = await _purchaseOrderRepo.GetAllPurchaseOrderAsync();
                return Ok(purchaseOrders);
            }
            catch (Exception) { throw; }
        }


        //
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInfo(int id)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var purchaseOrderInfo = await _purchaseOrderRepo.GetPurchaseOrderInfoAsync(id);
                if (purchaseOrderInfo == null)
                {
                    return NotFound();
                }
                return Ok(purchaseOrderInfo.ToPurchaseOrderDetail());
            }
            catch (Exception) { throw; }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePurchaseOrderDTO purchaseOrderDTO)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }
                var purchaseOrder = await _purchaseOrderRepo.UpdatePurchaseOrderAsync(purchaseOrderDTO.ToUpdatePurchaseOrder(id), id);

                if (purchaseOrder == null) { return BadRequest("Error! Please try again!"); }

                return Ok(purchaseOrder);
            }
            catch (Exception) { throw; }
        }

        [HttpPost("checkout")]
        public ActionResult Checkout(CreatePurchaseOrderDTO purchaseOrderDTO, string promotionCode)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var createdOrderResult = _orderService.CreatePurchaseOrderAsync(purchaseOrderDTO, promotionCode);

                return Ok(createdOrderResult);
            }
            catch (Exception) { throw; }
        }

        [HttpPost("request-vnpay-payment")]
        public async Task<IActionResult> RequestVnPayPayment([FromBody] VnPaymentRequestModel model)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
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

        [HttpGet("vnpay-ipn-return")]
        public IActionResult PaymentUpdateDatabase()
        {
            try
            {
                var result = _vnPayService.PaymentUpdateDatabase(Request.Query);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("vnpay-return")]
        public IActionResult PaymentExecute()
        {
            try
            {
                var result = _vnPayService.PaymentExecute(Request.Query);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
            }
        }
    }
}

