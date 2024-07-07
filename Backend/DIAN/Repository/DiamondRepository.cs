using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

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
                await _distributedCache.RemoveAsync(individualCacheKey);
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }

        public async Task<(List<Diamond>, int)> GetAllDiamondsAsync(DiamondQuery query)
        {
            string cacheKey = $"Diamonds_{query.PageNumber}_{query.PageSize}";
            string? cachedData = await _distributedCache.GetStringAsync(cacheKey);

            if (string.IsNullOrEmpty(cachedData))
            {
                var skipNumber = (query.PageNumber - 1) * query.PageSize;
                var diamonds = await _context.Diamonds
                    .Where(s => s.Status)
                    .Skip(skipNumber)
                    .Take(query.PageSize)
                    .ToListAsync();

                var totalCount = await _context.Diamonds.CountAsync(s => s.Status);

                var cacheEntry = new { Diamonds = diamonds, TotalCount = totalCount };
                string serializedData = JsonSerializer.Serialize(cacheEntry);

                await _distributedCache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
                _logger.LogInformation("Diamonds from database");
                return (diamonds, totalCount);
            }
            else
            {
                using (JsonDocument doc = JsonDocument.Parse(cachedData))
                {
                    JsonElement root = doc.RootElement;
                    var diamonds = JsonSerializer.Deserialize<List<Diamond>>(root.GetProperty("Diamonds").GetRawText());
                    int totalCount = root.GetProperty("TotalCount").GetInt32();
                    _logger.LogInformation("Diamonds from cache");
                    return (diamonds, totalCount);
                }
            }
        }

        public async Task<Diamond?> GetDiamondByIdAsync(int id)
        {
            string cacheKey = $"Diamond_{id}";
            string? cachedData = await _distributedCache.GetStringAsync(cacheKey);
            Diamond? existingDiamond = null;

            if (string.IsNullOrEmpty(cachedData))
            {
                existingDiamond = await _context.Diamonds
                    .Where(s => s.Status)
                    .FirstOrDefaultAsync(x => x.DiamondId == id);

                if (existingDiamond != null)
                {
                    string serializedData = JsonSerializer.Serialize(existingDiamond);
                    await _distributedCache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                }
            }
            else
            {
                existingDiamond = JsonSerializer.Deserialize<Diamond>(cachedData);
            }

            if (existingDiamond == null)
            {
                throw new KeyNotFoundException("Diamond does not exist");
            }

            return existingDiamond;
        }


        public async Task<List<Diamond>> GetDiamondByShapeAsync(string shape)
        {
            string cacheKey = $"Diamonds_Shape_{shape}";
            string? cachedData = await _distributedCache.GetStringAsync(cacheKey);
            List<Diamond> diamonds;

            if (string.IsNullOrEmpty(cachedData))
            {
                diamonds = await _context.Diamonds
                    .Where(s => s.Status && s.Shape.Contains(shape))
                    .ToListAsync();

                if (diamonds != null && diamonds.Count > 0)
                {
                    string serializedData = JsonSerializer.Serialize(diamonds);
                    await _distributedCache.SetStringAsync(cacheKey, serializedData, new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                }
            }
            else
            {
                diamonds = JsonSerializer.Deserialize<List<Diamond>>(cachedData);
            }

            if (diamonds == null || diamonds.Count == 0)
            {
                throw new KeyNotFoundException("Diamond does not exist");
            }

            return diamonds;
        }


        public async Task<Diamond?> UpdateDiamondAsync(Diamond diamondModel, int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.Color = diamondModel.Color;
                existingDiamond.Clarity = diamondModel.Clarity;
                existingDiamond.Cut = diamondModel.Cut;
                existingDiamond.Carat = diamondModel.Carat;
                existingDiamond.CertificateScan = diamondModel.CertificateScan;
                existingDiamond.Status = diamondModel.Status;
                await _context.SaveChangesAsync();
                string individualCacheKey = $"Diamond_{id}";
                await _distributedCache.RemoveAsync(individualCacheKey);
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }
        public async Task<Diamond?> UpdateAmountAvailable(Diamond diamondModel, int id)
        {
            var diamond = await _context.Diamonds.FirstOrDefaultAsync(d => d.DiamondId == id);
            if (diamond != null)
            {
                diamond.Quantity = diamondModel.Quantity;
                await _context.SaveChangesAsync();
                return diamond;
            }
            return null;
        }
        public async Task<Diamond?> UpdateDiamondCertificate(Diamond diamondModel, int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.CertificateScan = diamondModel.CertificateScan;
                await _context.SaveChangesAsync();
                string individualCacheKey = $"Diamond_{id}";
                await _distributedCache.RemoveAsync(individualCacheKey);
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }
        public async Task<List<Diamond>> GetDiamondsBy4cAsync(decimal carat, string cut, string color, string clarity)
        {
            return await _context.Set<Diamond>()
                .Where(d => d.Carat == carat && d.Cut == cut && d.Color == color && d.Clarity == clarity)
                .ToListAsync();
        }
        public async Task<List<Diamond>> GetDiamondsByProductIdAsync(int productId)
        {
            return await _context.Set<Diamond>()
                .Where(d => d.ProductId == productId)
                .ToListAsync();
        }

        public async Task<List<Diamond>> GetAll()
        {
            var diamonds = await _context.Diamonds
                    .Where(c => c.Status == true)
                    .ToListAsync();
            return diamonds;
        }
        public async Task<List<Diamond>> GetDiamondsByCaratAsync(decimal minCarat, decimal maxCarat)
        {
            return await _context.Set<Diamond>()
                .Where(d => d.Carat >= minCarat && d.Carat < maxCarat)
                .ToListAsync();
        }

        public async Task<Diamond?> UpdateProductId(UpdateProductIdForDiamondDto updateProductIdForDiamondDto, int id)
        {
            var diamond = await _context.Diamonds.FirstOrDefaultAsync(d => d.DiamondId == id);
            if (diamond == null)
            {
                return null;
            }
            diamond.ProductId = updateProductIdForDiamondDto.ProductId;
            await _context.SaveChangesAsync();
            return diamond;
        }

        public async Task<Diamond> GetSingleDiamondByProductId(int productId)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(d => d.DiamondId == productId);
            if (existingDiamond == null) {
                throw new KeyNotFoundException("Diamond does not exist");
            }
            return existingDiamond;
        }
    }
}
