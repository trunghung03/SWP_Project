using Microsoft.Extensions.Caching.Memory;

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
    }
}
