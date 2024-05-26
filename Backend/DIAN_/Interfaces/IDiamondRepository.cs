using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IDiamondRepository
    {
        Task<Diamond> GetDiamondByIdAsync(int id);
        Task<List<Diamond>> GetAllDiamondsAsync(DiamondQuery diamondQuery);
        Task<Diamond> AddDiamondAsync(Diamond diamond);
        Task<Diamond> UpdateDiamondAsync(int id, Diamond diamondModel);
        Task<Diamond> DeleteDiamondAsync(int id, Diamond diamondModel);
    }
}
