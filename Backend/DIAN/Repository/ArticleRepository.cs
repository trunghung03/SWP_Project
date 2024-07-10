using DIAN_.DTOs.ArticleDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace DIAN_.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IDistributedCache _distributedCache;
        private readonly string cacheKey = "ArticleList";

        public ArticleRepository(ApplicationDbContext context, IDistributedCache distributedCache)
        {
            _context = context;
            _distributedCache = distributedCache;
        }

        public async Task<Article> CreateArticleAsync(Article articleModel)
        {
            if (articleModel?.Employee == null)
            {
                throw new ArgumentNullException(nameof(articleModel.Employee), "EmployeeId cannot be null.");
            }

            await _context.Articles.AddAsync(articleModel);
            await _context.SaveChangesAsync();
            await _distributedCache.RemoveAsync(cacheKey); // Invalidate the cache after successful save
            return articleModel;
        }

        public async Task<List<Article>> GetArticleByTitleAsync(string title)
        {
            return await _context.Articles
                .Where(a => a.Title.Contains(title) && a.Status)
                .ToListAsync();
        }

        public async Task<Article?> DeleteArticleAsync(int id)
        {
            var existingArticle = await _context.Articles
                .FirstOrDefaultAsync(x => x.ContentId == id);

            if (existingArticle != null)
            {
                existingArticle.Status = false;
                await _context.SaveChangesAsync();
                string individualArticleCacheKey = $"Article_{existingArticle.ContentId}";
                await _distributedCache.RemoveAsync(individualArticleCacheKey); // Invalidate individual article cache
                await _distributedCache.RemoveAsync(cacheKey); // Invalidate article list cache
            }

            return existingArticle;
        }

        public async Task<List<ArticleList>> GetAllAsync()
        {
            string? cacheData = await _distributedCache.GetStringAsync(cacheKey);
            List<ArticleList>? articles;

            if (string.IsNullOrEmpty(cacheData))
            {
                articles = await _context.Articles
                    .Where(w => w.Status)
                    .Include(a => a.EmployeeNavigation)
                    .Select(w => w.ToArticleList())
                    .ToListAsync();

                string serializedArticles = JsonSerializer.Serialize(articles);
                await _distributedCache.SetStringAsync(cacheKey, serializedArticles, new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
            }
            else
            {
                articles = JsonSerializer.Deserialize<List<ArticleList>>(cacheData) ?? new List<ArticleList>();
            }

            return articles;
        }

        public async Task<Article?> GetArticleByIdAsync(int id)
        {
            string individualArticleCacheKey = $"Article_{id}";
            string? cacheData = await _distributedCache.GetStringAsync(individualArticleCacheKey);

            if (!string.IsNullOrEmpty(cacheData))
            {
                return JsonSerializer.Deserialize<Article>(cacheData);
            }

            var article = await _context.Articles
                .Where(a => a.Status)
                .FirstOrDefaultAsync(c => c.ContentId == id);

            if (article != null)
            {
                string serializedArticle = JsonSerializer.Serialize(article);
                await _distributedCache.SetStringAsync(individualArticleCacheKey, serializedArticle, new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
            }

            return article;
        }

        public async Task<Article?> UpdateArticleAsync(int id, Article articleModel)
        {
            var existingArticle = await _context.Articles.FirstOrDefaultAsync(x => x.ContentId == id);

            if (existingArticle == null) return null;

            existingArticle.Title = articleModel.Title;
            existingArticle.Content = articleModel.Content;
            existingArticle.Image = string.IsNullOrEmpty(articleModel.Image) ? existingArticle.Image : articleModel.Image;
            existingArticle.Tag = articleModel.Tag;

            await _context.SaveChangesAsync();

            string individualArticleCacheKey = $"Article_{existingArticle.ContentId}";
            await _distributedCache.RemoveAsync(individualArticleCacheKey); 
            await _distributedCache.RemoveAsync(cacheKey); 

            return existingArticle;
        }
        public async Task<string?> GetEmployeeNameByArticleIdAsync(int id) 
        {
            var article = await _context.Articles
                .Where(a => a.Status)
                .Include(a => a.EmployeeNavigation)
                .FirstOrDefaultAsync(c => c.ContentId == id);

            return article != null ? $"{article.EmployeeNavigation.FirstName} {article.EmployeeNavigation.LastName}" : null;
        }
    }
}
