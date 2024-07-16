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
            _memoryCache.Remove(CacheKey);
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }


        public async Task<Product?> DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product != null)
            {
                product.Status = false;
                await _context.SaveChangesAsync();
                _memoryCache.Remove(CacheKey);
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
                       .ThenInclude(c => c.Size);

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
                    .Include(p => p.Category).ThenInclude(c => c.Size)
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
                                        .Include(p => p.Category).ThenInclude(c => c.Size)
                                        .Where(p => p.Status && p.ProductId == id)
                                        .FirstOrDefaultAsync();

            if (product == null)
            {
                throw new KeyNotFoundException("Product does not exist");
            }
            return product;
        }

 public async Task<List<Product>> GetListAsync()
        {
            var products = await _context.Products
                                 .Include(p => p.MainDiamondAtrribute) // Include the MainDiamond to get the shape
                                 .ToListAsync();

            return products;
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
                _memoryCache.Remove(CacheKey);
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
    }
}
