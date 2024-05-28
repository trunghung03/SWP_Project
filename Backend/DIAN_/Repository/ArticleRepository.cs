using DIAN_.DTOs.ArticleDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly ApplicationDbContext _context;
        public ArticleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Article> CreateArticleAsync(Article articleModel)
        {
            // Khởi tạo EmployeeNavigation dựa trên EmployeeID
            articleModel.EmployeeNavigation = await _context.Employees.FindAsync(articleModel.Employee);
            await _context.Articles.AddAsync(articleModel);
            await _context.SaveChangesAsync();
            return articleModel;
        }
        public async Task<List<Article>> GetArticleByTitleAsync(string title)
        {
            return await _context.Articles
        .Where(a => a.Title.Contains(title))
        .Include(a => a.EmployeeNavigation)
        .ToListAsync();
        }

        public async Task<Article?> DeleteArticleAsync(int id)
        {
            var existingArticle = await _context.Articles.FirstOrDefaultAsync(x => x.ContentId == id);
            if (existingArticle != null)
            {
                existingArticle.Status = false;
                await _context.SaveChangesAsync();
                return existingArticle;
            }
            return null;
        }

        public async Task<List<ArticleList>> GetAllAsync()
        {
            var articles = await _context.Articles
                .Where(w => w.Status)
                .Include(a => a.EmployeeNavigation)
                .Select(w => w.ToArticleList())
                .ToListAsync();

            return articles;
        }

        public async Task<Article?> GetArticleByIdAsync(int id)
        {
            return await _context.Articles.Include(a => a.EmployeeNavigation).FirstOrDefaultAsync(c => c.ContentId == id);
        }

        public async Task<Article?> UpdateArticleAsync(int id, Article articleModel)
        {
            var existingArticle = await _context.Articles.FindAsync(id);

            if (existingArticle == null)
            {
                return null;
            }

            existingArticle.Title = articleModel.Title;
            existingArticle.Content = articleModel.Content;
            existingArticle.Image = articleModel.Image;
            existingArticle.Tag = articleModel.Tag;
            existingArticle.Status = articleModel.Status;

            await _context.SaveChangesAsync();

            return existingArticle;
        }
    }
}