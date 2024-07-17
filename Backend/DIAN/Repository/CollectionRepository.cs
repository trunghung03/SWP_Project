using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace DIAN_.Repository
{
    public class CollectionRepository : ICollectionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IDistributedCache _distributedCache;
        private readonly ILogger<CollectionRepository> _logger;
        private string cacheKey = "Collections";
        public CollectionRepository(ApplicationDbContext context, IDistributedCache distributedCache, ILogger<CollectionRepository> logger)
        {
            _context = context;
            _distributedCache = distributedCache;
            _logger = logger;
        }

        public async Task<Collection?> CreateAsync(Collection collection)
        {
            // Check for duplicates
            if (await _context.Collections.AnyAsync(c => c.Name == collection.Name && c.CollectionId==collection.CollectionId)) { return null; }

            await _context.Collections.AddAsync(collection);
            await _context.SaveChangesAsync();
            await _distributedCache.RemoveAsync(cacheKey);
            return collection;
        }

        public async Task<Collection?> DeleteAsync(int id)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);

            if (collection == null) { return null; }

            _context.Collections.Remove(collection);
            await _context.SaveChangesAsync();
            string individualCacheKey = $"Collection_{id}";
            await _distributedCache.RemoveAsync(individualCacheKey);
            await _distributedCache.RemoveAsync(cacheKey);
            return collection;
        }

        public async Task<List<Collection>> GetAllAsync()
        {
            string? cachedCollections = await _distributedCache.GetStringAsync(cacheKey);
            List<Collection> collections;

            if (string.IsNullOrEmpty(cachedCollections))
            {
                collections = await _context.Collections.ToListAsync();

                if (collections != null && collections.Count > 0)
                {
                    string serializedCollections = JsonSerializer.Serialize(collections);
                    await _distributedCache.SetStringAsync(cacheKey, serializedCollections, new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(10)
                    });
                }
                _logger.LogInformation("Collections from database");
                return collections;
            }
            else
            {
                collections = JsonSerializer.Deserialize<List<Collection>>(cachedCollections);
                _logger.LogInformation("Collections from cache");
                return collections;
            }  
        }
        public async Task<Collection?> GetByIdAsync(int id)
        {
            string cacheKey = $"Collection_{id}";
            string? cachedCollection = await _distributedCache.GetStringAsync(cacheKey);
            Collection? collection = null;

            if (string.IsNullOrEmpty(cachedCollection))
            {
                collection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);

                if (collection != null)
                {
                    string serializedCollection = JsonSerializer.Serialize(collection);
                    await _distributedCache.SetStringAsync(cacheKey, serializedCollection, new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                }
            }
            else
            {
                collection = JsonSerializer.Deserialize<Collection>(cachedCollection);
            }

            return collection;
        }


        public async Task<Collection?> UpdateAsync(int id, Collection collection)
        {
            if (await _context.Collections.AnyAsync(c => c.Name == collection.Name)) { return null; }
            var updateCollection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);
            if (updateCollection == null) return null;

            updateCollection.Name = collection.Name;
            updateCollection.Description = collection.Description;
            updateCollection.Status = collection.Status;

            await _context.SaveChangesAsync();
            string individualCacheKey = $"Collection_{id}";
            await _distributedCache.RemoveAsync(cacheKey);
            await _distributedCache.RemoveAsync(individualCacheKey);
            return updateCollection;
        }

        public async Task<bool> UpdateCollectionStatus(int id)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);
            if (collection == null) return false;
            collection.Status = !collection.Status; 
            await _context.SaveChangesAsync();
            string individualCacheKey = $"Collection_{id}";
            await _distributedCache.RemoveAsync(individualCacheKey);
            await _distributedCache.RemoveAsync(cacheKey);
            return true;
        }
        public async Task<Collection?> GetNewestCollectionAsync()
        {
            return await _context.Collections
                                 .OrderByDescending(p => p.CollectionId) // Order by CollectionID to get the latest products                               
                                 .FirstOrDefaultAsync();
        }
    }
}
