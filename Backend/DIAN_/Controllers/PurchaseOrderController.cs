using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/purchaseorders")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepo;

        private readonly IPointAccumulateService _pointAccumulateService;

        private readonly IOrderService _orderService;

        private readonly ApplicationDbContext _context;

        public PurchaseOrderController(IPurchaseOrderRepository purchaseOrderRepo, IOrderService orderService, 
            ApplicationDbContext context, IPointAccumulateService pointAccumulateService)
        {
            _purchaseOrderRepo = purchaseOrderRepo;
            _orderService = orderService;
            _context = context;
            _pointAccumulateService = pointAccumulateService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var purchaseOrders = await _purchaseOrderRepo.GetAllAsync();
            return Ok(purchaseOrders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInfo(int id)
        {
            var purchaseOrderInfo = await _purchaseOrderRepo.GetInfoAsync(id);
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
            var createdOrder = await _purchaseOrderRepo.CreateAsync(order);
            return CreatedAtAction(nameof(GetInfo), new { id = createdOrder.OrderId }, createdOrder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePurchaseOrderDTO purchaseOrderDTO)
        {
            var order = await _purchaseOrderRepo.GetInfoAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            var existingOrder = await _context.Purchaseorders.FindAsync(id);
            existingOrder.ToUpdatePurchaseOrder(purchaseOrderDTO);

            var updatedOrder = await _purchaseOrderRepo.UpdateAsync(existingOrder);
            return Ok(updatedOrder);
        }

        [HttpPost("duyen_test_order_logic")]
        public async Task<IActionResult> Checkout([FromBody] CreatePurchaseOrderDTO purchaseOrderDTO)
        {
            var createdOrderResult = await _orderService.CreatePurchaseOrderInformation(purchaseOrderDTO);
            if (createdOrderResult.Result is OkObjectResult okResult && okResult.Value is PurchaseOrderDTO createdOrder)
            {
                return CreatedAtAction(nameof(GetInfo), new { id = createdOrder.OrderId }, createdOrder);
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Unknown error occurred");
        }

        [HttpPut("{id}/completeorder")]
        public async Task<IActionResult> CompleteOrder(int id)
        {
            var order = await _purchaseOrderRepo.GetPurchasrOrderById(id);
            if (order == null)
            {
                return NotFound();
            }

            order.OrderStatus = "Success";
            var updatedOrder = await _purchaseOrderRepo.UpdateAsync(order);

            if (updatedOrder != null && updatedOrder.OrderStatus == "Success")
            {
                await _pointAccumulateService.AccumulatePointsAsync(updatedOrder.OrderId);
            }

            return Ok(updatedOrder);
        }


    }
}
