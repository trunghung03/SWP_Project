using DIAN_.DTOs.ProductDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System.Text;

namespace DIAN_.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepo;
        private readonly IDistributedCache _distributedCache;

        public ProductService(IProductRepository productRepo, IDistributedCache distributedCache)
        {
            _productRepo = productRepo;
            _distributedCache = distributedCache;
        }

        public async Task<List<ProductListDTO>> GetListAsync()
        {
            var cacheKey = "product_list";
            var cachedData = await _distributedCache.GetAsync(cacheKey);

            if (cachedData != null)
            {
                var cachedProducts = Encoding.UTF8.GetString(cachedData);
                Console.WriteLine("Get product list from cache");
                return JsonConvert.DeserializeObject<List<ProductListDTO>>(cachedProducts);

            }

            var products = await _productRepo.GetListAsync();
            var filteredProducts = new List<Product>();

            foreach (var product in products)
            {
                if (await _productRepo.HasSufficientDiamondsForProduct(product.ProductId))
                {
                    product.Status = true;
                    filteredProducts.Add(product);
                    Console.WriteLine("Get product list from database");
                }
            }

            var productDTOs = filteredProducts.Select(p => p.ToProductListDTO()).ToList();

            var serializedData = JsonConvert.SerializeObject(productDTOs);
            var encodedData = Encoding.UTF8.GetBytes(serializedData);

            var cacheOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),
                SlidingExpiration = TimeSpan.FromMinutes(2)
            };

            await _distributedCache.SetAsync(cacheKey, encodedData, cacheOptions);

            return productDTOs;
        }

        public async Task<List<ProductListDTO>> GetDiamondProductAsync()
        {
            var cacheKey = "diamond_product_list";
            var cachedData = await _distributedCache.GetAsync(cacheKey);

            if (cachedData != null)
            {
                var cachedProducts = Encoding.UTF8.GetString(cachedData);
                Console.WriteLine("Get diamond product list from cache");
                return JsonConvert.DeserializeObject<List<ProductListDTO>>(cachedProducts);
            }

            var products = await _productRepo.GetDiamondProduct();
            var filteredProducts = new List<Product>();

            foreach (var product in products)
            {
                if (await _productRepo.HasSufficientDiamondsForProduct(product.ProductId))
                {
                    product.Status = true;
                    filteredProducts.Add(product);
                }
            }

            var productDTOs = filteredProducts.Select(p => p.ToProductListDTO()).ToList();

            var serializedData = JsonConvert.SerializeObject(productDTOs);
            var encodedData = Encoding.UTF8.GetBytes(serializedData);

            var cacheOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),
                SlidingExpiration = TimeSpan.FromMinutes(2)
            };
            Console.WriteLine("Get diamond product list from database");

            await _distributedCache.SetAsync(cacheKey, encodedData, cacheOptions);

            return productDTOs;
        }
    }
}
