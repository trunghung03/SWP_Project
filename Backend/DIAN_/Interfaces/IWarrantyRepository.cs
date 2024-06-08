using DIAN_.DTOs.WarrantyDTO;

using DIAN_.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IWarrantyRepository
    {
 

        Task<List<WarrantyDetailDto>> GetAllWarrantyAsync();
        Task<Warranty?> GetWarrantyByIdAsync(int id);
        Task<Warranty> CreateWarrantyAsync(Warranty warrantyModel);
        Task<Warranty?> UpdateWarrantyAsync(int id, Warranty warranty);
        Task<Warranty?> DeleteWarrantyAsync(int id, Warranty warranty);
    }
}
