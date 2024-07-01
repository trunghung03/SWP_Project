using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace DIAN_.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IDistributedCache _distributedCache;
        public CategoryRepository(ApplicationDbContext context, IDistributedCache distributedCache)
        {
            _context = context;
            _distributedCache = distributedCache;
        }

        public async Task<Category?> CreateAsync(Category category)
        {
            if (await _context.Categories.AnyAsync(c => c.Name == category.Name)) { return null; }

            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            string cacheKey = "CategoryList";
            await _distributedCache.RemoveAsync(cacheKey);
            return category;
        }

        public async Task<Category?> DeleteAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category == null) { return null; }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            string individualCategoryCacheKey = $"Category_ {category.CategoryId}";
                await _distributedCache.RemoveAsync(individualCategoryCacheKey);
            return category;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            string? cacheCategory = await _distributedCache.GetStringAsync("CategoryList");
            List<Category> categories = new List<Category>();
            if(string.IsNullOrEmpty(cacheCategory))
            {
                categories = await _context.Categories
                    .Where(c => c.Status == true)
                    .ToListAsync();
                string serializedCategories = JsonSerializer.Serialize(categories);
                await _distributedCache.SetStringAsync("CategoryList", serializedCategories, new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
            }
            else
            {
                categories = JsonSerializer.Deserialize<List<Category>>(cacheCategory);
            }
            return categories;
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            string cacheKey = $"Category_{id}";
            string? cachedCategory = await _distributedCache.GetStringAsync(cacheKey);
            Category? category = null;

            if (string.IsNullOrEmpty(cachedCategory))
            {
                category = await _context.Categories
                    .Where(c => c.Status == true && c.CategoryId == id)
                    .FirstOrDefaultAsync();

                if (category != null)
                {
                    string serializedCategory = JsonSerializer.Serialize(category);
                    await _distributedCache.SetStringAsync(cacheKey, serializedCategory, new DistributedCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                    });
                }
            }
            else
            {
                category = JsonSerializer.Deserialize<Category>(cachedCategory);
            }

            return category;
        }


        public async Task<Category?> UpdateAsync(int id, Category category)
        {
            // Check for duplicates
            if (await _context.Categories.AnyAsync(c => c.Name == category.Name)) { return null; }
            var updateCategory = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == id);
            if (updateCategory == null) return null;

            updateCategory.Name = category.Name;
            updateCategory.Status = category.Status;

            await _context.SaveChangesAsync();
            string individualCategoryCacheKey = $"Category_{updateCategory.CategoryId}";
            await _distributedCache.RemoveAsync(individualCategoryCacheKey);
            return category;
        }
    }
}
