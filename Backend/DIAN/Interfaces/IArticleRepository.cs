using DIAN_.DTOs.ArticleDTO;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IArticleRepository
    {
        Task<List<ArticleList>> GetAllAsync();
        Task<Article?> GetArticleByIdAsync(int id);
        Task<Article> CreateArticleAsync(Article articleModel);
        Task<Article?> UpdateArticleAsync(int id, Article articleModel);
        Task<Article?> DeleteArticleAsync(int id);
        Task<List<Article>> GetArticleByTitleAsync(string title);
    }
}
