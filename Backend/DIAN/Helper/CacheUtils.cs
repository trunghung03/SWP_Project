using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;

namespace DIAN_.Helper
{
    public static class CacheUtils
    {
        public static void InvalidateAllPaginationKeys(IMemoryCache memoryCache, string cacheKeyBase)
        {
            for (int pageNumber = 1; pageNumber <= 100; pageNumber++)
            {
                for (int pageSize = 1; pageSize <= 100; pageSize++)
                {
                    string baseKey = $"{cacheKeyBase}_{pageNumber}_{pageSize}";
                    memoryCache.Remove($"{baseKey}_");
                    foreach (var query in new[] { "", "name" })
                    {
                        memoryCache.Remove($"{baseKey}_{query}");
                    }
                }
            }
        }

        public static async Task InvalidateProductCaches(IDistributedCache distributedCache)
        {
            await distributedCache.RemoveAsync("product_list");
            await distributedCache.RemoveAsync("diamond_product_list");
        }
    }
}
