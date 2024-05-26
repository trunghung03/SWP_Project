using DIAN_.DTOs.CategoryDTO;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task<Category?> CreateAsync(CreateCategoryDTO categoryDTO);
        Task<Category?> UpdateAsync(int id, UpdateCategoryDTO categoryDTO);
        Task<Category?> DeleteAsync(int id);
    }
}
