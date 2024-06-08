using DIAN_.DTOs.CollectionDTO;
using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using DIAN_.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DIAN_.Controllers
{
    [Route("api/purchaseorders")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepo;
        private readonly IOrderService _orderService;
        private readonly ApplicationDbContext _context;

        public PurchaseOrderController(IPurchaseOrderRepository purchaseOrderRepo, IOrderService orderService, ApplicationDbContext context)
        {
            _purchaseOrderRepo = purchaseOrderRepo;
            _orderService = orderService;
            _context = context;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var purchaseOrders = await _purchaseOrderRepo.GetAllPurchaseOrderAsync();
                return Ok(purchaseOrders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInfo(int id)
        {
            try
            {
                var purchaseOrderInfo = await _purchaseOrderRepo.GetPurchaseOrderInfoAsync(id);
                if (purchaseOrderInfo == null)
                {
                    return NotFound();
                }
                return Ok(purchaseOrderInfo.ToPurchaseOrderDetail());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("creaaaa")]
        public async Task<IActionResult> Create(CreatePurchaseOrderDTO purchaseOrderDTO)
        {
            try
            {
                var order = purchaseOrderDTO.ToCreatePurchaseOrder();
                var createdOrder = await _purchaseOrderRepo.CreatePurchaseOrderAsync(order);
                return CreatedAtAction(nameof(GetInfo), new { id = createdOrder.OrderId }, createdOrder.ToPurchaseOrderDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePurchaseOrderDTO purchaseOrderDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var purchaseOrder = await _purchaseOrderRepo.UpdatePurchaseOrderAsync(purchaseOrderDTO.ToUpdatePurchaseOrder(id), id);
                if (purchaseOrder == null)
                {
                    return BadRequest("Error! Please try again!");
                }
                return Ok(purchaseOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("duyen_test_order_logic")]
        public ActionResult Checkout(CreatePurchaseOrderDTO purchaseOrderDTO, string promotionCode)
        {
            try
            {
                var createdOrderResult = _orderService.CreatePurchaseOrderAsync(purchaseOrderDTO, promotionCode);
                return Ok(createdOrderResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<List<Purchaseorder>>> ViewOrderByStatus(string status)
        {
            try
            {
                var orders = await _purchaseOrderRepo.GetPurchaseOrderStatusAsync(status);
                if (orders == null)
                {
                    return NotFound($"Cannot find {status} order");
                }
                return orders;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("apply-coupon")]
        public async Task<ActionResult<decimal>> ApplyCoupon(string code, decimal totalPrice)
        {
            try
            {
                var updatedTotalPrice = await _orderService.ApplyCoupon(code, totalPrice);
                return Ok(updatedTotalPrice);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("check-used-points")]
        public async Task<ActionResult<decimal>> CheckUsedPoints(int userId, decimal totalPrice, bool usedPoints)
        {
            try
            {
                var updatedTotalPrice = await _orderService.CheckUsedPoints(userId, totalPrice, usedPoints);
                return Ok(updatedTotalPrice);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
