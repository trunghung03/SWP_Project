using DIAN_.DTOs.BusinessStatDTO;
using DIAN_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Controllers
{
    [Route("api/stat")]
    [ApiController]
    public class BusinessStatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public BusinessStatController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET api/stat/purchaseorders
        [HttpGet("purchaseorders")]
        public async Task<IActionResult> GetPurchaseOrdersCount([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            IQueryable<Purchaseorder> query = _context.Purchaseorders;

            if (startDate.HasValue)
            {
                query = query.Where(po => po.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(po => po.Date < endDate.Value.AddDays(1));
            }

            int count = await query.CountAsync();

            return Ok(count);
        }

        // GET api/stat/customers
        [HttpGet("customers")]
        public async Task<IActionResult> GetCustomersCount()
        {
            int count = await _context.Customers.CountAsync();
            return Ok(count);
        }

        // GET api/stat/ordervalue
        [HttpGet("ordervalue")]
        public async Task<IActionResult> GetTotalPurchaseOrderValue([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            IQueryable<Purchaseorder> query = _context.Purchaseorders;

            if (startDate.HasValue)
            {
                query = query.Where(po => po.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(po => po.Date < endDate.Value.AddDays(1));
            }

            decimal totalValue = await query.SumAsync(po => po.TotalPrice);

            return Ok(totalValue);
        }

        // GET api/stat/timestampedorders
        [HttpGet("timestampedorders")]
        public async Task<IActionResult> GetTimestampedOrders([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            IQueryable<Purchaseorder> query = _context.Purchaseorders;

            if (startDate.HasValue)
            {
                query = query.Where(po => po.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(po => po.Date < endDate.Value.AddDays(1));
            }

            var timestampedOrders = await query
                .Select(po => new TimeStampedOrderDto
                {
                    Date = po.Date,
                    TotalPrice = po.TotalPrice
                })
                .ToListAsync();

            return Ok(timestampedOrders);
        }

        // GET api/stat/products
        [HttpGet("products")]
        public async Task<IActionResult> GetProductCount()
        {
            int count = await _context.Products.CountAsync();
            return Ok(count);
        }
    }
}
