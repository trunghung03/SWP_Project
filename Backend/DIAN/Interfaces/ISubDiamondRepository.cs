using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ISubDiamondRepository
    {
        Task<List<Subdiamond>> GetAllAsync();
        Task<Subdiamond?> GetByIdAsync(int id);
        Task<Subdiamond?> CreateAsync(Subdiamond subdiamond);
        Task<Subdiamond?> UpdateAsync(int id, Subdiamond subdiamond);
        Task<Subdiamond?> DeleteAsync(int id);
        Task<Subdiamond?> UpdateDiamondStock(int id, Subdiamond subdiamond);
    }
}
