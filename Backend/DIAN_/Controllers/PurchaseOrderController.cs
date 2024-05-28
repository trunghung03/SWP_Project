using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepo;
        private readonly ApplicationDbContext _context;

        public PurchaseOrderController(IPurchaseOrderRepository purchaseOrderRepo, ApplicationDbContext context)
        {
            _purchaseOrderRepo = purchaseOrderRepo;
            _context = context;
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
    }
}
