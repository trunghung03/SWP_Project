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

        [HttpGet("products/soldpercentage")]
        public async Task<IActionResult> GetSoldProductPercentage([FromQuery] string startMonthYear, [FromQuery] string endMonthYear)
        {
            DateTime? startDate = null;
            DateTime? endDate = null;

            // Parse the startMonthYear and endMonthYear parameters
            if (!string.IsNullOrEmpty(startMonthYear))
            {
                startDate = DateTime.ParseExact(startMonthYear, "MM-yyyy", null);
            }

            if (!string.IsNullOrEmpty(endMonthYear))
            {
                endDate = DateTime.ParseExact(endMonthYear, "MM-yyyy", null).AddMonths(1).AddDays(-1); // End of the month
            }

            // Get the order details, optionally filtered by date
            var query = _context.Orderdetails.AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(od => od.Order.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(od => od.Order.Date <= endDate.Value);
            }

            // Group by category and count the number of products sold in each category
            var soldProductCount = await query
                .GroupBy(od => od.Product.CategoryId)
                .Select(g => new
                {
                    CategoryId = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Calculate the total number of sold products
            int totalSoldProducts = soldProductCount.Sum(s => s.Count);

            // Calculate the percentage of products sold for each category
            var categoryPercent = soldProductCount.Select(s => new
            {
                CategoryId = s.CategoryId,
                Percentage = (double)s.Count / totalSoldProducts
            }).ToList();

            return Ok(categoryPercent);
        }

        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthlyStat([FromQuery] int? year)
        {
            int targetYear = year ?? DateTime.Now.Year;
            var monthlyStats = new List<object>();

            for (int month = 1; month <= 12; month++)
            {
                DateTime startDate = new DateTime(targetYear, month, 1);
                DateTime endDate = startDate.AddMonths(1).AddDays(-1);

                int purchaseOrderCount = await _context.Purchaseorders
                    .Where(po => po.Date >= startDate && po.Date <= endDate)
                    .CountAsync();

                decimal totalValue = await _context.Purchaseorders
                    .Where(po => po.Date >= startDate && po.Date <= endDate)
                    .SumAsync(po => po.TotalPrice);

                monthlyStats.Add(new
                {
                    Month = month,
                    PurchaseOrderCount = purchaseOrderCount,
                    TotalValue = totalValue
                });
            }

            return Ok(monthlyStats);
        }

    }
}
