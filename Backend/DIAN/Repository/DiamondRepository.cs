using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ShellDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
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
                .OrderBy(d => d.DiamondId)
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
            IQueryable<Diamond> diamondQuery = _context.Diamonds
                                                       .Include(d => d.MainDiamondAtrribute);
            if (!string.IsNullOrEmpty(query.SearchTerm))
            {
                string lowerSearchTerm = query.SearchTerm.ToLower();
                diamondQuery = diamondQuery.Where(d =>
                    d.DiamondId.ToString().Contains(lowerSearchTerm) ||
                    d.MainDiamondAtrributeId.ToString().Contains(lowerSearchTerm) ||
                    d.CertificateScan.ToLower().Contains(lowerSearchTerm) ||
                    d.OrderDetailId.ToString().Contains(lowerSearchTerm) ||
                    d.Price.ToString().Contains(lowerSearchTerm) ||
                    d.Status.ToString().ToLower().Contains(lowerSearchTerm) ||
                    d.MainDiamondAtrribute.Shape.ToString().Contains(lowerSearchTerm) ||
                    d.MainDiamondAtrribute.Carat.ToString().Contains(lowerSearchTerm) ||
                    d.MainDiamondAtrribute.Color.ToLower().Contains(lowerSearchTerm) ||
                    d.MainDiamondAtrribute.Clarity.ToLower().Contains(lowerSearchTerm) ||
                    d.MainDiamondAtrribute.Cut.ToLower().Contains(lowerSearchTerm));
            }

            var totalItems = await diamondQuery.CountAsync();
            Console.WriteLine($"Total items after filtering: {totalItems}");

            if (query.PageNumber.HasValue && query.PageSize.HasValue)
            {
                int pageSize = query.PageSize.Value;
                int pageNumber = query.PageNumber.Value;

                diamondQuery = diamondQuery.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            }

            var diamondList = await diamondQuery.OrderByDescending(p => p.DiamondId).Reverse().ToListAsync();
            Console.WriteLine($"Items returned after pagination: {diamondList.Count}");

            return (diamondList, totalItems);
        }


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
        // In DiamondRepository class
        public async Task<int> CountDiamondsByAttributesAsync(int mainDiamondAttributeId)
        {
            return await _context.Diamonds
                .Where(d => d.MainDiamondAtrributeId == mainDiamondAttributeId && d.Status == true) 
                .CountAsync();
        }

        public async Task<Diamond?> GetDiamondByIdAsync(int id)
        {
            var existingDiamond = await _context.Diamonds
                    .Include(d => d.MainDiamondAtrribute)
                    .FirstOrDefaultAsync(x => x.DiamondId == id );
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

        //public async Task<Diamond?> UpdateDiamondStatus(int diamondId)
        //{
        //    var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == diamondId);
        //    if(existingDiamond is not null)
        //    {

        //        existingDiamond.Status = false;
        //        await _context.SaveChangesAsync();
        //        return existingDiamond;
        //    }
        //    throw new KeyNotFoundException("Diamond does not exist");
        //}
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

        public async Task<Diamondattribute> GetDiamondAttributeByIdAsync(int diamondAttributeId)
        {
            return await _context.Diamondattributes
                                 .FirstOrDefaultAsync(da => da.DiamondAtrributeId == diamondAttributeId);
        }

        public async Task<Diamond> UpdateMainDiamondOrderDetailId(int? orderDetailId, int diamondId)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.MainDiamondAtrributeId == diamondId && x.Status);
            if (existingDiamond != null)
            {
                existingDiamond.Status = false;
                existingDiamond.OrderDetailId = orderDetailId;
                await _context.SaveChangesAsync();
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }

        public async Task<Diamond> UpdateMainDiamondOrderDetailIdForCancel(int oldOrderDetailId,int? orderDetailId, int diamondId)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.OrderDetailId == oldOrderDetailId);
            if (existingDiamond != null)
            {
                existingDiamond.Status = true;
                existingDiamond.OrderDetailId = orderDetailId;
                await _context.SaveChangesAsync();
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }
        // In DiamondRepository
        public async Task<int> CountDiamondsByAttributesAsync(string shape, string color, string clarity, string cut, decimal carat)
        {
            return await _context.Diamonds
                .Include(d => d.MainDiamondAtrribute)
                .CountAsync(d => d.MainDiamondAtrribute.Shape == shape &&
                                 d.MainDiamondAtrribute.Color == color &&
                                 d.MainDiamondAtrribute.Clarity == clarity &&
                                 d.MainDiamondAtrribute.Cut == cut &&
                                 d.MainDiamondAtrribute.Carat == carat);
        }

        public async Task<List<Diamond>> GetDiamondsByAttributeIdAsync(int attributeId)
        {
            return await _context.Diamonds.Where(p => p.MainDiamondAtrributeId == attributeId && p.Status).ToListAsync();   
        }

        public async Task<List<Diamond>> GetDiamondsByAttributeIdForCancelAsync(int attributeId)
        {
            return await _context.Diamonds.Where(p => p.MainDiamondAtrributeId == attributeId).ToListAsync();
        }

        public Task<List<Diamond>> FindAvailableDiamond(int mainDiamondAttributeId)
        {
            return _context.Diamonds
                .Where(d => d.MainDiamondAtrributeId == mainDiamondAttributeId && d.Status == true)
                .ToListAsync();
        }
        public async Task<List<Diamond>> SearchDiamondsAsync(DiamondSearchCriteria searchCriteria)
        {
            var query = _context.Diamonds.Include(d => d.MainDiamondAtrribute).Where(d => d.Status).AsQueryable();

            if (!string.IsNullOrEmpty(searchCriteria.Query))
            {
                string queryStr = searchCriteria.Query.ToLower();
                query = query.Where(d => d.MainDiamondAtrribute.Shape.ToLower().Contains(queryStr) ||
                                         d.MainDiamondAtrribute.Color.ToLower().Contains(queryStr) ||
                                         d.MainDiamondAtrribute.Clarity.ToLower().Contains(queryStr) ||
                                         d.MainDiamondAtrribute.Cut.ToLower().Contains(queryStr) ||
                                         d.MainDiamondAtrribute.Carat.ToString().Contains(queryStr));
            }

            return await query.ToListAsync();
        }

        public async Task<List<Diamond>> SearchMainDIamondAsync(DiamondSearch search)
        {
            var query = _context.Diamonds.Include(d => d.MainDiamondAtrribute).Where(d => d.Status).AsQueryable();

            if (!string.IsNullOrEmpty(search.Shape))
            {
                query = query.Where(d => d.MainDiamondAtrribute.Shape.ToLower().Contains(search.Shape.ToLower()));
            }
            if (!string.IsNullOrEmpty(search.Color))
            {
                query = query.Where(d => d.MainDiamondAtrribute.Color.ToLower().Contains(search.Color.ToLower()));
            }
            if (!string.IsNullOrEmpty(search.Clarity))
            {
                query = query.Where(d => d.MainDiamondAtrribute.Clarity.ToLower().Contains(search.Clarity.ToLower()));
            }
            if (search.Carat.HasValue)
            {
                query = query.Where(d => d.MainDiamondAtrribute.Carat == search.Carat.Value);
            }
            if (!string.IsNullOrEmpty(search.Cut))
            {
                query = query.Where(d => d.MainDiamondAtrribute.Cut.ToLower().Contains(search.Cut.ToLower()));
            }

            return await query.ToListAsync();
        }
    }
}
