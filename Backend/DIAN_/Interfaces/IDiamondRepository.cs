using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IDiamondRepository
    {
        Task<Diamond?> GetDiamondByIdAsync(int id);
        Task<List<Diamond>> GetDiamondByShapeAsync(string shape);
        Task<(List<Diamond>, int)> GetAllDiamondsAsync(DiamondQuery query);
        Task<Diamond> AddDiamondAsync(Diamond diamond);
        Task<Diamond?> UpdateDiamondAsync(Diamond diamondModel, int id);
        Task<Diamond?> DeleteDiamondAsync(int id);

        Task<Diamond?> UpdateDiamondCertificate(Diamond diamondModel, int id);
    }
}
