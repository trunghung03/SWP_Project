using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using DIAN_.Helper;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Caching.Distributed;
using DIAN_.DTOs.ProductDTOs;

namespace DIAN_.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        private const string CacheKey = "ProductList";
        private IMemoryCache _memoryCache;
        private readonly IDistributedCache _distributedCache;
        private static readonly SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        private readonly ILogger<ProductRepository> _logger;
        public ProductRepository(ApplicationDbContext context, IMemoryCache memoryCache, IDistributedCache distributedCache, ILogger<ProductRepository> logger)
        {
            _context = context;
            _memoryCache = memoryCache;
            _distributedCache = distributedCache;
            _logger = logger;
        }
        public async Task<Product> CreateAsync(Product product) //not plus shell yet
        {
            var mainDiamondPrice = product.MainDiamondAtrributeId.HasValue
               ? await _context.Diamonds
                   .Where(d => d.DiamondId == product.MainDiamondAtrributeId.Value)
                   .Select(d => d.Price)
                   .FirstOrDefaultAsync()
               : 0;

            var subDiamondPrice = product.SubDiamondAtrributeId.HasValue
                ? await _context.Diamonds
                    .Where(d => d.DiamondId == product.SubDiamondAtrributeId.Value)
                    .Select(d => d.Price)
                    .FirstOrDefaultAsync()
                : 0;

            product.Price = (mainDiamondPrice * (product.MainDiamondAmount ?? 0)) +
                            (subDiamondPrice * (product.SubDiamondAmount ?? 0) * 0.05m) +
                            (product.LaborCost ?? 0);

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            _memoryCache.Remove(CacheKey);
            CacheUtils.InvalidateAllPaginationKeys(_memoryCache, CacheKey);
            return product;
        }


        public async Task<Product?> DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product != null)
            {
                product.Status = false;
                await _context.SaveChangesAsync();

                _memoryCache.Remove($"ProductDetail_{id}");

                CacheUtils.InvalidateAllPaginationKeys(_memoryCache, CacheKey);

                _logger.LogInformation("Product deleted");
                return product;
            }
            return null;
        }

        public async Task<bool> ExistsMainDiamondAsync(int mainDiamondId)
        {
            return await _context.Diamonds.Where(s => s.Status).AnyAsync(d => d.DiamondId == mainDiamondId);
        }

        public async Task<bool> ExistsProCodeAsync(string proCode)
        {
            return await _context.Products
                .Where(p => p.Status)
                .AnyAsync(p => p.ProductCode == proCode);
        }

        public async Task<(List<Product>, int)> GetAllAsync(ProductQuery query)
        {
            var cacheKey = $"{CacheKey}_{query.PageNumber}_{query.PageSize}_{query.Name}";

            if (_memoryCache.TryGetValue(cacheKey, out (List<Product>, int) cachedProducts))
            {
                _logger.LogInformation("Products from cache");
                return cachedProducts;
            }
            else
            {
                try
                {
                    await semaphore.WaitAsync();
                    if (_memoryCache.TryGetValue(cacheKey, out cachedProducts))
                    {
                        _logger.LogInformation("Products from cache");
                        return cachedProducts;
                    }

                    IQueryable<Product> productsQuery = _context.Products
                       .Where(p => p.Status)
                       .Include(p => p.Category)
                       .Include(p => p.Shells);

                    if (!string.IsNullOrWhiteSpace(query.Name))
                    {
                        productsQuery = productsQuery.Where(p => EF.Functions.Like(p.Name, $"%{query.Name}%"));
                    }

                    var totalItems = await productsQuery.CountAsync();

                    var skipNumber = (query.PageNumber - 1) * query.PageSize;
                    var productList = await productsQuery
                        .Skip(skipNumber)
                        .Take(query.PageSize)
                        .ToListAsync();

                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetSlidingExpiration(TimeSpan.FromMinutes(5))
                        .SetAbsoluteExpiration(TimeSpan.FromMinutes(30))
                        .SetPriority(CacheItemPriority.Normal)
                        .SetSize(1);

                    var result = (productList, totalItems);
                    _memoryCache.Set(cacheKey, result, cacheEntryOptions);
                    _logger.LogInformation("Products from database");
                    return result;
                }
                finally
                {
                    semaphore.Release();
                }
            }
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            string cacheKey = $"ProductDetail_{id}";
            if (!_memoryCache.TryGetValue(cacheKey, out Product? cachedProduct))
            {
                var product = await _context.Products
                    .Where(p => p.Status && p.ProductId == id)
                    .Include(p => p.Category).Include(p => p.Shells)
                    .FirstOrDefaultAsync();

                if (product == null)
                {
                    throw new Exception($"Product with id {id} not found.");
                }

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(5))
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(30))
                    .SetPriority(CacheItemPriority.Normal).SetSize(1);

                _memoryCache.Set(cacheKey, product, cacheEntryOptions);
                _logger.LogInformation("Product from database");
                return product;
            }
            _logger.LogInformation("Product from cache");
            return cachedProduct;
        }


        public async Task<List<Product>> GetByNameAsync(string name)
        {
            var products = await _context.Products
                                  .Where(p => p.Status && p.Name.Contains(name))
                                  .Include(p => p.MainDiamondAtrribute) // Include the MainDiamond to get the shape
                                  .ToListAsync();
            return products;
        }


        public async Task<List<Product>> GetProductByCode(string code)
        {
            string cacheKey = $"ProductsByCode_{code}";
            if (!_memoryCache.TryGetValue(cacheKey, out List<Product>? cachedProducts))
            {
                var products = await _context.Products
                    .Where(p => p.ProductCode.Contains(code))
                    .ToListAsync();

                if (products == null || !products.Any())
                {
                    throw new KeyNotFoundException("Product does not exist");
                }

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(5))
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(30))
                    .SetPriority(CacheItemPriority.Normal).SetSize(1);

                _memoryCache.Set(cacheKey, products, cacheEntryOptions);
                _logger.LogInformation("Products from database");
                return products;
            }
            _logger.LogInformation("Products from cache");
            return cachedProducts;
        }


        public async Task<Product> GetDetailAsync(int id)
        {
            var product = await _context.Products
                                        .Include(p => p.MainDiamondAtrribute)
                                        .Include(p => p.Category).Include(p => p.Shells)
                                        .Where(p => p.Status && p.ProductId == id)
                                        .FirstOrDefaultAsync();

            if (product == null)
            {
                throw new KeyNotFoundException("Product does not exist");
            }
            return product;
        }

        public async Task<List<Product>> GetListAsync()  //not display shell amount available = 0
        {
            var productsQuery = _context.Products
                                     .Include(p => p.MainDiamondAtrribute)
                                     .Include(p => p.Category)
                                     .Include(p => p.Shells)
                                     .Where(p => p.Status);

            //// If you need to filter shells by AmountAvailable > 0, you should do it after the query execution since EF Core does not support filtering on Include directly.
            //var products = await productsQuery.ToListAsync();

            //// Filter shells for each product if necessary. This is done in-memory.
            //products.ForEach(p => p.Shells = p.Shells.Where(s => s.AmountAvailable > 0).ToList());

            return productsQuery.ToList();
        }


        public async Task<Product> UpdateProductAsync(Product product, int id)
        {
            var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (existingProduct != null)
            {
                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.ImageLinkList = product.ImageLinkList;
                existingProduct.CollectionId = product.CollectionId;
                existingProduct.CategoryId = product.CategoryId;
                await _context.SaveChangesAsync();

                // Invalidate cache for product detail
                _memoryCache.Remove($"ProductDetail_{id}");

                // Invalidate cache for all pagination keys
                CacheUtils.InvalidateAllPaginationKeys(_memoryCache, CacheKey);

                return existingProduct;
            }
            return null;
        }

        public async Task<IEnumerable<Product>> GetLast8ProductsAsync()
        {
            return await _context.Products
                                 .Include(p => p.MainDiamondAtrribute)
                                 .OrderByDescending(p => p.ProductId)
                                 .Take(8)
                                 .ToListAsync();
        }

        public async Task<ManageProductDetailDto> GetProductDetail(int productId)
        {
            var result = (from category in _context.Categories
                          join product in _context.Products on category.CategoryId equals product.CategoryId
                          join collection in _context.Collections on product.CollectionId equals collection.CollectionId
                          join shell in _context.Shells on product.ProductId equals shell.ProductId
                          join shellMaterial in _context.Shellmaterials on shell.ShellMaterialId equals shellMaterial.ShellMaterialId
                          where product.ProductId == productId
                          select new ManageProductDetailDto
                          {
                              CategoryName = category.Name,
                              CollectionName = collection.Name,
                              ProductID = product.ProductId,
                              ProductCode = product.ProductCode,
                              ProductName = product.Name,
                              Price = product.Price,
                              Description = product.Description,
                              MainDiamondAttributeId = product.MainDiamondAtrributeId,
                              SubDiamondAttributeId = product.SubDiamondAtrributeId,
                              LaborCost = product.LaborCost,
                              ImageLinkList = product.ImageLinkList,
                              SubDiamondAmount = product.SubDiamondAmount,
                              MainDiamondAmount = product.MainDiamondAmount,
                              AmountAvailable = shell.AmountAvailable,
                              MaterialName = shellMaterial.Name
                          }).FirstOrDefault();

            return result;
        }
        public async Task<bool> ExistsMainDiamondAttributeAsync(int mainDiamondAttributeId)
        {
            return await _context.Diamonds.AnyAsync(d => d.DiamondId == mainDiamondAttributeId);
        }

        public async Task<bool> ExistsSubDiamondAttributeAsync(int subDiamondAttributeId)
        {
            return await _context.Subdiamonds.AnyAsync(sd => sd.DiamondId == subDiamondAttributeId);
        }

        //public async Task<List<Product>> GetDiamondProduct() //only diamond (no shell, no subdiamond, main diamond amount = 1)
        //{
        //    var diamondProducts = await _context.Products
        //        .Where(p => p.Shells == null && p.SubDiamondAmount == 0 && p.MainDiamondAtrributeId != null && p.MainDiamondAmount == 1)
        //        .Include(p => p.MainDiamondAtrribute).Where(p => p.MainDiamondAtrribute.Diamonds.Status == true)
        //        .ToListAsync();
        //    return diamondProducts;
        //}
        public async Task<List<Product>> GetDiamondProduct()
        {
            var diamondProducts = await _context.Products
                .Where(p => !_context.Shells.Any(s => s.ProductId == p.ProductId) // No shells
                            && p.SubDiamondAtrributeId == null // No subdiamondattributeid
                            && p.SubDiamondAmount == null // No subdiamondamount
                            && p.MainDiamondAmount == 1 // Only one maindiamondamount
                            && _context.Diamonds.Any(d => d.MainDiamondAtrributeId == p.MainDiamondAtrributeId && d.Status)) // MainDiamondAtrributeID in table diamond must have status = true
                .Include(p => p.MainDiamondAtrribute) 
                .ToListAsync();

            return diamondProducts;
        }



        public async Task<List<Product>> SearchProductsAsync(ProductSearch searchCriteria)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(searchCriteria.Query))
            {
                string queryStr = searchCriteria.Query.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(queryStr) ||
                                         p.ProductCode.ToLower().Contains(queryStr) ||
                                         p.Description.ToLower().Contains(queryStr) ||
                                         p.Price.ToString().Contains(queryStr));
            }

            return await query.ToListAsync();
        }

        public async Task<bool> AreDiamondsSufficientForAllProducts(int diamondAttributeId)
        {
            // Sum the MainDiamondAmount for products where the MainDiamondAttributeId matches the given ID
            var totalMainDiamondAmountNeeded = await _context.Products
                .Where(p => p.MainDiamondAtrributeId == diamondAttributeId)
                .SumAsync(p => (int?)p.MainDiamondAmount) ?? 0;
            Console.WriteLine($"Total Main Diamond Amount Needed: {totalMainDiamondAmountNeeded}");


            // Count the available diamonds with the specified DiamondAttributeId and Status = true
            var availableDiamondCount = await _context.Diamonds
                .Where(d => d.MainDiamondAtrributeId == diamondAttributeId && d.Status == true)
                .CountAsync();
            Console.WriteLine($"Total Main Diamond Amount available: {totalMainDiamondAmountNeeded}");

            // Return true if the count of available diamonds is greater than or equal to the total MainDiamondAmount needed; otherwise, return false
            return availableDiamondCount >= totalMainDiamondAmountNeeded;
        }

        public async Task<bool> HasSufficientDiamondsForProduct(int productId)
        {
            var product = await GetByIdAsync(productId);
            var mainDiamondAmount = await _context.Products
                .Where(p => p.ProductId == productId && p.MainDiamondAtrributeId == product.MainDiamondAtrributeId)
                .Select(p => p.MainDiamondAmount)
                .FirstOrDefaultAsync();
            Console.WriteLine($"Main Diamond Amount: {mainDiamondAmount}");
            if (mainDiamondAmount == null)
            {
                return false;
            }
            var availableDiamondCount = await _context.Diamonds
                .Where(d => d.MainDiamondAtrributeId == product.MainDiamondAtrributeId && d.Status == true)
                .CountAsync();
            Console.WriteLine($"Available Diamond Count: {availableDiamondCount}");

            bool isMainDiamondSufficient = availableDiamondCount >= mainDiamondAmount;

            bool isSubDiamondSufficient = true; // Assume true if no subdiamonds are needed.
            if (product.SubDiamondAtrributeId.HasValue && product.SubDiamondAmount.HasValue && product.SubDiamondAmount > 0)
            {
                var subdiamond = await _context.Subdiamonds.FirstOrDefaultAsync(sd => sd.DiamondAtrributeId == product.SubDiamondAtrributeId && sd.Status == true);
                int subAmount = subdiamond.AmountAvailable;
                Console.WriteLine($"Available Sub Diamond Count: {subAmount}");
                Console.WriteLine($"Sub Diamond Amount: {product.SubDiamondAmount}");
                isSubDiamondSufficient = subAmount >= product.SubDiamondAmount;
            }
            return isMainDiamondSufficient && isSubDiamondSufficient;
        }
    }
}
