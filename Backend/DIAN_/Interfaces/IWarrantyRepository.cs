using DIAN_.DTOs.WarrantyDTOs;
using DIAN_.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IWarrantyRepository
    {
        Task<IEnumerable<WarrantyDTO>> GetAllAsync();
        Task<WarrantyDTO> GetByIdAsync(int id);
        Task<WarrantyDTO> CreateAsync(Warranty warranty);
        Task<WarrantyDTO> UpdateAsync(Warranty warranty);
        Task DeleteAsync(int id);
    }
}
