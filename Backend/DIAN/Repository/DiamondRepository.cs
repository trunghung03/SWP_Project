using DIAN_.DTOs.ShellDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace DIAN_.Repository
{
    public class DiamondRepository : IDiamondRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IDistributedCache _distributedCache;
        private readonly ILogger<DiamondRepository> _logger;

        public DiamondRepository(ApplicationDbContext context, IDistributedCache distributedCache, ILogger<DiamondRepository> logger)
        {
            _context = context;
            _logger = logger;
            _distributedCache = distributedCache;
        }

        public async Task<Diamond> AddDiamondAsync(Diamond diamond)
        {
            await _context.Diamonds.AddAsync(diamond);
            await _context.SaveChangesAsync();
            string cacheKey = "Diamonds";
            await _distributedCache.RemoveAsync(cacheKey);
            return diamond;
        }

        public async Task<Diamond?> DeleteDiamondAsync(int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.Status = false;
                await _context.SaveChangesAsync();
                string individualCacheKey = $"Diamond_{id}";
                //await _distributedCache.RemoveAsync(individualCacheKey);
                //await _distributedCache.RemoveAsync("Diamonds");
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }

        public async Task<List<Diamond>> GetAllDiamond()
        {
            var diamonds = await _context.Diamonds
                .Include(p => p.MainDiamondAtrribute)
                .Where(d => d.Status)
                .ToListAsync();
            //string cacheKey = "AllDiamonds";
            //string? cachedData = await _distributedCache.GetStringAsync(cacheKey);
            //List<Diamond> diamonds;

            //if (string.IsNullOrEmpty(cachedData))
            //{
            //    diamonds = await _context.Diamonds
            //        .Include(p => p.MainDiamondAtrribute)
            //        .Where(d => d.Status)
            //        .ToListAsync();

            //    if (diamonds != null && diamonds.Count > 0)
            //    {
            //        string serializedData = JsonSerializer.Serialize(diamonds);
            //        await _distributedCache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
            //        {
            //            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            //        });
            //    }
            //}
            //else
            //{
            //    diamonds = JsonSerializer.Deserialize<List<Diamond>>(cachedData);
            //}

            return diamonds;
        }


        public async Task<(List<Diamond>, int)> GetAllDiamondsAsync(DiamondQuery query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var diamonds = await _context.Diamonds
                   .Where(s => s.Status)
                   .Include(p => p.MainDiamondAtrribute)
                   .Skip(skipNumber)
                   .Take(query.PageSize)
                   .ToListAsync();
            var totalCount = await _context.Diamonds.CountAsync(s => s.Status);
            return (diamonds, totalCount);
            //string cacheKey = $"Diamonds_{query.PageNumber}_{query.PageSize}";
            //string? cachedData = await _distributedCache.GetStringAsync(cacheKey);

            //if (string.IsNullOrEmpty(cachedData))
            //{
            //    var skipNumber = (query.PageNumber - 1) * query.PageSize;
            //    var diamonds = await _context.Diamonds
            //        .Where(s => s.Status)
            //        .Include(p => p.MainDiamondAtrribute)
            //        .Skip(skipNumber)
            //        .Take(query.PageSize)
            //        .ToListAsync();

            //    var totalCount = await _context.Diamonds.CountAsync(s => s.Status);

            //    var cacheEntry = new { Diamonds = diamonds, TotalCount = totalCount };
            //    string serializedData = JsonSerializer.Serialize(cacheEntry);

            //    await _distributedCache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
            //    {
            //        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            //    });
            //    _logger.LogInformation("Diamonds from database");
            //    return (diamonds, totalCount);
            //}
            //else
            //{
            //    using (JsonDocument doc = JsonDocument.Parse(cachedData))
            //    {
            //        JsonElement root = doc.RootElement;
            //        var diamonds = JsonSerializer.Deserialize<List<Diamond>>(root.GetProperty("Diamonds").GetRawText());
            //        int totalCount = root.GetProperty("TotalCount").GetInt32();
            //        _logger.LogInformation("Diamonds from cache");
            //        return (diamonds, totalCount);
            //    }
            //}
        }

        public async Task<Diamond?> GetDiamondByIdAsync(int id)
        {
            var existingDiamond = await _context.Diamonds
                    .Include(d => d.MainDiamondAtrribute)
                    .FirstOrDefaultAsync(x => x.DiamondId == id && x.Status);
            return existingDiamond;
            //string cacheKey = $"Diamond_{id}";
            //string? cachedData = await _distributedCache.GetStringAsync(cacheKey);
            //Diamond? existingDiamond = null;

            //if (string.IsNullOrEmpty(cachedData))
            //{
            //    existingDiamond = await _context.Diamonds
            //        .Include(d => d.MainDiamondAtrribute)
            //        .FirstOrDefaultAsync(x => x.DiamondId == id && x.Status);

            //    if (existingDiamond != null)
            //    {
            //        string serializedData = JsonSerializer.Serialize(existingDiamond);
            //        await _distributedCache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
            //        {
            //            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            //        });
            //    }
            //}
            //else
            //{
            //    existingDiamond = JsonSerializer.Deserialize<Diamond>(cachedData);
            //}

            //if (existingDiamond == null)
            //{
            //    throw new KeyNotFoundException("Diamond does not exist");
            //}

            //return existingDiamond;
        }


        public async Task<List<Diamond>> GetDiamondByShapeAsync(string shape)
        {
            var diamonds = await _context.Diamonds
                    .Include(p => p.MainDiamondAtrribute)
                    .Where(s => s.Status && s.MainDiamondAtrribute.Shape.Contains(shape))
                    .ToListAsync();
            return diamonds;
            //string cacheKey = $"Diamonds_Shape_{shape}";
            //string? cachedData = await _distributedCache.GetStringAsync(cacheKey);
            //List<Diamond> diamonds;

            //if (string.IsNullOrEmpty(cachedData))
            //{
            //    diamonds = await _context.Diamonds
            //        .Include(p => p.MainDiamondAtrribute)
            //        .Where(s => s.Status && s.MainDiamondAtrribute.Shape.Contains(shape))
            //        .ToListAsync();

            //    if (diamonds != null && diamonds.Count > 0)
            //    {
            //        string serializedData = JsonSerializer.Serialize(diamonds);
            //        await _distributedCache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
            //        {
            //            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            //        });
            //    }
            //}
            //else
            //{
            //    diamonds = JsonSerializer.Deserialize<List<Diamond>>(cachedData) ?? new List<Diamond>();
            //}

            //if (diamonds == null || diamonds.Count == 0)
            //{
            //    throw new KeyNotFoundException("Diamond does not exist");
            //}

            //return diamonds;
        }

        public async Task<Diamond?> UpdateDiamondAsync(Diamond diamondModel, int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.OrderDetailId = diamondModel.OrderDetailId;
                existingDiamond.Price = diamondModel.Price;
                existingDiamond.Status = diamondModel.Status;
                await _context.SaveChangesAsync();
                string individualCacheKey = $"Diamond_{id}";
                //await _distributedCache.RemoveAsync(individualCacheKey);
                //await _distributedCache.RemoveAsync("Diamonds");
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }

        public async Task<Diamond?> UpdateDiamondCertificate(Diamond diamondModel, int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.CertificateScan = diamondModel.CertificateScan;
                await _context.SaveChangesAsync();
                //string individualCacheKey = $"Diamond_{id}";
                //await _distributedCache.RemoveAsync(individualCacheKey);
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }

        public async Task<Diamondattribute> GetDiamondAttributeByIdAsync(int diamondAttributeId)
        {
            return await _context.Diamondattributes
                                 .FirstOrDefaultAsync(da => da.DiamondAtrributeId == diamondAttributeId);
        }
    }
}
