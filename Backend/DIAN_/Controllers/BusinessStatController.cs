using DIAN_.DTOs.BusinessStatDTO;
using DIAN_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
        public async Task<IActionResult> GetSoldProductPercentage([FromQuery] string? startMonthYear, [FromQuery] string? endMonthYear)
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

            // Define the mapping from category ID to super-category
            var superCategoryMapping = new Dictionary<int, string>
                {
                    { 1, "Rings" },
                    { 5, "Rings" },
                    { 9, "Rings" },
                    { 2, "Earrings" },
                    { 6, "Earrings" },
                    { 3, "Bracelets" },
                    { 7, "Bracelets" },
                    { 4, "Necklaces" },
                    { 8, "Necklaces" }
                };

            // Group by category and count the number of products sold in each category
            var soldProductCount = await query
                .GroupBy(od => od.Product.CategoryId)
                .Select(g => new
                {
                    CategoryId = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            // Group by super-category and aggregate counts
            var superCategoryCounts = soldProductCount
                .GroupBy(s => superCategoryMapping[(int)s.CategoryId])
                .Select(g => new
                {
                    SuperCategory = g.Key,
                    Count = g.Sum(x => x.Count),
                    Categories = g.Select(x => x.CategoryId).ToArray()
                })
                .ToList();

            // Calculate the total number of sold products
            int totalSoldProducts = superCategoryCounts.Sum(s => s.Count);

            // Calculate the percentage of products sold for each super-category
            var categoryPercent = superCategoryCounts.Select(s => new
            {
                Categories = s.Categories,
                Percentage = (double)s.Count / totalSoldProducts * 100
            }).ToList();

            return Ok(categoryPercent);
        }


        [HttpGet("monthlyPurchaseOrderCount")]
        public async Task<IActionResult> GetMonthlyPurchaseOrderCount([FromQuery] int? year)
        {
            int targetYear = year ?? DateTime.Now.Year;
            var monthlyCounts = new int[12];

            for (int month = 1; month <= 12; month++)
            {
                DateTime startDate = new DateTime(targetYear, month, 1);
                DateTime endDate = startDate.AddMonths(1).AddDays(-1);

                int purchaseOrderCount = await _context.Purchaseorders
                    .Where(po => po.Date >= startDate && po.Date <= endDate)
                    .CountAsync();

                monthlyCounts[month - 1] = purchaseOrderCount;
            }

            return Ok(monthlyCounts);
        }


        [HttpGet("monthlyTotalValue")]
        public async Task<IActionResult> GetMonthlyTotalValue([FromQuery] int? year)
        {
            int targetYear = year ?? DateTime.Now.Year;
            var monthlyValues = new decimal[12];

            for (int month = 1; month <= 12; month++)
            {
                DateTime startDate = new DateTime(targetYear, month, 1);
                DateTime endDate = startDate.AddMonths(1).AddDays(-1);

                decimal totalValue = await _context.Purchaseorders
                    .Where(po => po.Date >= startDate && po.Date <= endDate)
                    .SumAsync(po => po.TotalPrice);

                monthlyValues[month - 1] = totalValue;
            }

            return Ok(monthlyValues);
        }


    }
}
