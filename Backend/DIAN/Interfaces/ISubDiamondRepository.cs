using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ISubDiamondRepository
    {
        Task<List<Subdiamond>> GetAllAsync();
        Task<Subdiamond?> GetByIdAsync(int id);
        Task<Subdiamond> CreateAsync(Subdiamond subdiamond);
        Task<Subdiamond?> UpdateAsync(int id, Subdiamond subdiamond);
        Task<Subdiamond?> DeleteAsync(int id);
        Task<Subdiamond?> UpdateDiamondStock(int id, UpdateSubDiamondStockDto subdiamond);
        Task<Subdiamond?> GetDiamondsByAttributeIdAsync(int attributeId);
        Task<(List<Subdiamond>, int)> GetAllDiamondsAsync(DiamondQuery query);

    }
}
