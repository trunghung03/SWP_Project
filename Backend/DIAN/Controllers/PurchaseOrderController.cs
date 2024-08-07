﻿using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Helper;
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
        public async Task<IActionResult> GetAll([FromQuery] PurchaseOrderQuerry query)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var (purchaseOrders, totalCount) = await _purchaseOrderRepo.GetAllPurchaseOrderAsync(query);

                if (!purchaseOrders.Any())
                {
                    return NotFound("No purchase orders found");
                }

                var purchaseOrderDtos = purchaseOrders.Select(po => po.ToPurchaseOrderDetail()).ToList();

                // Check if pagination parameters are provided
                if (!query.PageNumber.HasValue && !query.PageSize.HasValue)
                {
                    // No pagination info needed if we are returning all purchase orders
                    return Ok(new { data = purchaseOrderDtos });
                }

                var pagination = new
                {
                    currentPage = query.PageNumber ?? 1,
                    pageSize = query.PageSize ?? 6,
                    totalPages = (int)Math.Ceiling((double)totalCount / (query.PageSize ?? 6)),
                    totalCount = totalCount
                };

                return Ok(new { data = purchaseOrderDtos, pagination });
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { title = "An unexpected error occurred.", status = 500, detail = ex.Message });
            }
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

        [HttpPost("confirm-vnpay-payment")]
        public Task<IActionResult> SendEmailConfirmVnPay([FromQuery] int orderId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Task.FromResult<IActionResult>(NotFound("Cannot found order."));
                }
                var result = _orderService.SendEmailForVnPay(orderId);
                if (result)
                {
                    return Task.FromResult<IActionResult>(Ok("Email sent successfully."));
                }
                else
                {
                    return Task.FromResult<IActionResult>(BadRequest("Failed to send email."));
                }
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
        [HttpGet("by-customer/{customerId}")]
        public async Task<IActionResult> GetOrdersByCustomerId(int customerId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var orders = await _purchaseOrderRepo.GetOrdersForCusAsync(customerId);
                if (orders == null || !orders.Any())
                {
                    return NotFound();
                }

                var orderDTOs = orders.Select(o => o.ToPurchaseOrderInfoDTO()).ToList();
                return Ok(orderDTOs);
            }
            catch (Exception ex)
            {
                // Log the exception
                _loggerManager.LogError($"Something went wrong inside GetOrdersByCustomerId action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("searchOrders")]
        public async Task<IActionResult> SearchOrdersAsync([FromQuery] string query)
        {
            try
            {
                var searchCriteria = new PurchaseOrderSearch
                {
                    Query = query
                };

                var orders = await _purchaseOrderRepo.SearchOrderAsync(searchCriteria);

                if (!orders.Any())
                {
                    return NotFound("No orders match the search criteria.");
                }

                var poDTOs = orders.Select(po => po.ToPurchaseOrderDTO()).ToList();
                return Ok(poDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

