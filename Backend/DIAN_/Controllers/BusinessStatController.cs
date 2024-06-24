using DIAN_.DTOs.BusinessStatDTO;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.StatDto;
using DIAN_.Mapper;
using DIAN_.Models;
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

            // Define the list of super-categories and their respective sub-categories
            var superCategories = new Dictionary<string, int[]>
    {
        { "Rings", new[] { 1, 5, 9 } },
        { "Earrings", new[] { 2, 6 } },
        { "Bracelets", new[] { 3, 7 } },
        { "Necklaces", new[] { 4, 8 } }
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

            // Initialize the result with all super-categories set to 0
            var superCategoryCounts = superCategories.ToDictionary(
                sc => sc.Key,
                sc => new
                {
                    SuperCategory = sc.Key,
                    Count = 0,
                    Categories = sc.Value
                });

            // Update the counts based on soldProductCount
            foreach (var sold in soldProductCount)
            {
                var superCategory = superCategoryMapping[(int)sold.CategoryId];
                superCategoryCounts[superCategory] = new
                {
                    SuperCategory = superCategory,
                    Count = superCategoryCounts[superCategory].Count + sold.Count,
                    Categories = superCategoryCounts[superCategory].Categories
                };
            }

            // Calculate the total number of sold products
            int totalSoldProducts = superCategoryCounts.Values.Sum(s => s.Count);

            // Calculate the percentage of products sold for each super-category
            var categoryPercent = superCategoryCounts.Values.Select(s => new
            {
                Categories = s.Categories,
                Percentage = totalSoldProducts > 0 ? (double)s.Count / totalSoldProducts *100 : 0
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
        [HttpGet("top-10-selling-products")]
        public async Task<ActionResult<IEnumerable<ProductStatisticDto>>> GetTop10SellingProducts(DateTime? startDate, DateTime? endDate)
        {
            DateTime effectiveStartDate = startDate ?? DateTime.MinValue;
            DateTime effectiveEndDate = endDate ?? DateTime.Now;

            var topProducts = await _context.Orderdetails
                .Include(od => od.Product)
                .Where(od => od.Order.Date >= startDate && od.Order.Date <= endDate)
                .GroupBy(od => od.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    ItemSold = g.Count(),
                    LineTotal = g.Sum(od => od.LineTotal)
                })
                .OrderByDescending(g => g.ItemSold)
                .Take(10)
                .Join(_context.Products,
                    g => g.ProductId,
                    p => p.ProductId,
                    (g, p) => new ProductStatisticDto
                    {
                        LineTotal = g.LineTotal,
                        ProductCode = p.ProductCode,
                        Name = p.Name,
                        ItemSold = g.ItemSold
                    })
                .ToListAsync();

            return Ok(topProducts);
        }

        [HttpGet("top-8-selling-products")]
        public async Task<ActionResult<IEnumerable<ProductListDTO>>> GetTop8SellingProducts(DateTime? startDate, DateTime? endDate)
        {
            DateTime effectiveStartDate = startDate ?? DateTime.MinValue;
            DateTime effectiveEndDate = endDate ?? DateTime.Now;

            var topProducts = await _context.Orderdetails
                .Include(od => od.Product)
                .ThenInclude(p => p.MainDiamond)
                .Where(od => od.Order.Date >= effectiveStartDate && od.Order.Date <= effectiveEndDate)
                .GroupBy(od => od.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    ItemSold = g.Count(),
                })
                .OrderByDescending(g => g.ItemSold)
                .Take(8)
                .Join(_context.Products,
                    g => g.ProductId,
                    p => p.ProductId,
                    (g, p) => p)
                .ToListAsync();

            var diamondIds = topProducts.Select(tp => tp.MainDiamondId).Distinct().ToList();
            var diamonds = await _context.Diamonds
                                         .Where(d => diamondIds.Contains(d.DiamondId))
                                         .ToListAsync();

            var productDTOs = topProducts.Select(tp =>
            {
                var diamond = diamonds.FirstOrDefault(d => d.DiamondId == tp.MainDiamondId);
                return tp.ToProductListDTO(diamond);
            }).ToList();

            return Ok(productDTOs);
        }


        [HttpGet("daily-statistics")]
        public async Task<ActionResult<TodayStatisticDto>> GetDailyStatistics(DateTime date)
        {
            var startDate = date.Date;
            var endDate = date.Date.AddDays(1);

            var ordersOnDate = await _context.Purchaseorders
                .Where(o => o.Date >= startDate && o.Date < endDate)
                .Include(o => o.Orderdetails)
                .ToListAsync();

            var totalOrders = ordersOnDate.Count;
            var totalCustomers = ordersOnDate.Select(o => o.UserId).Distinct().Count();
            var totalSales = ordersOnDate.Sum(o => o.TotalPrice);
            var profit = totalSales - ordersOnDate.Sum(o => o.Orderdetails.Sum(d => d.LineTotal * 0.8m));

            var statistics = new TodayStatisticDto
            {
                TotalOrders = totalOrders,
                TotalCustomers = totalCustomers,
                TotalSales = totalSales,
                Profit = profit
            };

            return Ok(statistics);
        }

    }
}
