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

        public PurchaseOrderController(IPurchaseOrderRepository purchaseOrderRepo, IOrderService orderService, 
            ApplicationDbContext context)
        {
            _purchaseOrderRepo = purchaseOrderRepo;
            _orderService = orderService;
            _context = context;
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
            return Ok(purchaseOrderInfo);
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePurchaseOrderDTO purchaseOrderDTO)
        {
            var order = purchaseOrderDTO.ToCreatePurchaseOrder();
            var createdOrder = await _purchaseOrderRepo.CreatePurchaseOrderAsync(order);
            return CreatedAtAction(nameof(GetInfo), new { id = createdOrder.OrderId }, createdOrder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePurchaseOrderDTO purchaseOrderDTO)
        {
            var order = await _purchaseOrderRepo.GetPurchaseOrderInfoAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            var existingOrder = await _context.Purchaseorders.FindAsync(id);
            existingOrder.ToUpdatePurchaseOrder(purchaseOrderDTO);

            var updatedOrder = await _purchaseOrderRepo.UpdatePurchaseOrderAsync(existingOrder, id);
            return Ok(updatedOrder);
        }

        [HttpPost("duyen_test_order_logic")]
        public async Task<IActionResult> Checkout([FromBody] CreatePurchaseOrderDTO purchaseOrderDTO)
        {
            var orderDetails = PurchaseOrderMapper.ToOrderDetails(purchaseOrderDTO.OrderDetails);
            var createdOrderResult = await _orderService.CreatePurchaseOrderAsync(purchaseOrderDTO, orderDetails);

            if (createdOrderResult != null)
            {
                return Ok(createdOrderResult);
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Unknown error occurred");
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

        //// Endpoint to update order status
        //[HttpPut("{orderId}/status/{status}")]
        //public async Task<ActionResult<Purchaseorder>> UpdateOrderStatus(int orderId, string status)
        //{
        //    var updatedOrder = await _purchaseOrderRepo.UpdatePurchaseOrderStatusAsync(orderId, status);
        //    if (updatedOrder == null)
        //    {
        //        return NotFound($"Cannot find {status} order");

        //    }
        //    return updatedOrder;
        //}
    }
}
