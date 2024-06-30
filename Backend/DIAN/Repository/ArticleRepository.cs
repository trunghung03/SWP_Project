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
        private readonly IDistributedCache distributedCache;
        public ArticleRepository(ApplicationDbContext context, IDistributedCache distributed)
        {
            _context = context;
            distributedCache = distributed;
        }

        public async Task<Article> CreateArticleAsync(Article articleModel)
        {
            if (articleModel?.Employee == null)
            {
                throw new ArgumentNullException(nameof(articleModel.Employee), "EmployeeId cannot be null.");
            }

            await _context.Articles.AddAsync(articleModel);
            await _context.SaveChangesAsync();
            string cacheKey = "ArticleList";
            await distributedCache.RemoveAsync(cacheKey);
            return articleModel;
        }

        public async Task<List<Article>> GetArticleByTitleAsync(string title, CancellationToken cancellationToken = default)
        {
            string? cacheTitle = await distributedCache.GetStringAsync(title, cancellationToken);
            if(string.IsNullOrEmpty(cacheTitle))
            {
                var articles = await _context.Articles
                    .Where(a => a.Title.Contains(title) && a.Status)
                    .Include(a => a.EmployeeNavigation)
                    .ToListAsync(cancellationToken);
                await distributedCache.SetStringAsync(title, JsonSerializer.Serialize(articles), new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                }, cancellationToken);
                return articles;
            }
            var listTitle = JsonSerializer.Deserialize<List<Article>>(cacheTitle);
            if (listTitle is not null)
            {
                foreach (var article in listTitle)
                {
                    _context.Set<Article>().Attach(article);
                }
            }

            return listTitle;
        }

        public async Task<Article?> DeleteArticleAsync(int id)
        {
            var existingArticle = await _context.Articles
                .Include(a => a.EmployeeNavigation)
                .FirstOrDefaultAsync(x => x.ContentId == id);
            if (existingArticle != null)
            {
                existingArticle.Status = false;
                await _context.SaveChangesAsync();
                string individualArticleCacheKey = $"Article_{existingArticle.ContentId}";
                await distributedCache.RemoveAsync(individualArticleCacheKey);
            }
            return existingArticle;
        }


        public async Task<List<ArticleList>> GetAllAsync()
        {
            string? cacheData = await distributedCache.GetStringAsync("ArticleList");
            List<ArticleList>? articles;

            if (string.IsNullOrEmpty(cacheData))
            {
                articles = await _context.Articles
                    .Where(w => w.Status)
                    .Include(a => a.EmployeeNavigation)
                    .Select(w => w.ToArticleList())
                    .ToListAsync();

                string serializedArticles = JsonSerializer.Serialize(articles);
                await distributedCache.SetStringAsync("ArticleList", serializedArticles, new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
                });
            }
            else
            {
                articles = JsonSerializer.Deserialize<List<ArticleList>>(cacheData);
            }

            return articles ?? new List<ArticleList>();
        }


        public async Task<Article?> GetArticleByIdAsync(int id)
        {
            return await _context.Articles.Include(a => a.EmployeeNavigation)
                .Where(a => a.Status)
                .FirstOrDefaultAsync(c => c.ContentId == id);
        }

        public async Task<Article?> UpdateArticleAsync(int id, Article articleModel)
        {
            var existingArticle = await _context.Articles
                .Where(a => a.Status)
                .FirstOrDefaultAsync(a => a.ContentId == id);
            if (existingArticle == null) return null;

            // Only update the fields that are allowed to change
            existingArticle.Title = articleModel.Title;
            existingArticle.Content = articleModel.Content;
            existingArticle.Image = string.IsNullOrEmpty(articleModel.Image) ? existingArticle.Image : articleModel.Image;
            existingArticle.Tag = articleModel.Tag;

            await _context.SaveChangesAsync();
            string individualArticleCacheKey = $"Article_{existingArticle.ContentId}";
            await distributedCache.RemoveAsync(individualArticleCacheKey);
            return existingArticle;
        }


    }
}