
using DIAN_.DTOs.CollectionDTO;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ICollectionRepository
    {
        Task<List<Collection>> GetAllAsync(string role);
        Task<Collection?> GetByIdAsync(int id);
        Task<Collection?> CreateAsync(Collection collection);
        Task<Collection?> UpdateAsync(int id, Collection collection);
        Task<Collection?> DeleteAsync(int id);
        Task<bool> UpdateCollectionStatus(int id);

        Task<Collection?> GetNewestCollectionAsync();

        Task<List<Collection>> SearchCollectionAsync(CollectionSearch search);
    }
}
