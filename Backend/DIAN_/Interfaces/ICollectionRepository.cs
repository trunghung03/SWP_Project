using DIAN_.DTOs.CategoryDTO;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ICollectionRepository
    {
        Task<List<Collection>> GetAllAsync();
        Task<Collection?> GetByIdAsync(int id);
        Task<Collection?> CreateAsync(Collection collection);
        Task<Collection?> UpdateAsync(int id, Collection collection);
        Task<Collection?> DeleteAsync(int id);
    }
}
