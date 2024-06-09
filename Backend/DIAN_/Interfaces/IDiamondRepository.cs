using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IDiamondRepository
    {
        Task<Diamond?> GetDiamondByIdAsync(int id);

        Task<List<Diamond>> GetDiamondByShapeAsync(string shape);
        Task<List<Diamond>> GetAllDiamondsAsync();
        Task<Diamond> AddDiamondAsync(Diamond diamond);
        Task<Diamond?> UpdateDiamondAsync(Diamond diamondModel, int id);
        Task<Diamond?> DeleteDiamondAsync(int id);
    }
}
