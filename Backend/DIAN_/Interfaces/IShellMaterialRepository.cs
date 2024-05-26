using DIAN_.DTOs.ShellDTOs;
using DIAN_.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IShellMaterialRepository
    {
        Task<ShellMaterialDTO> CreateAsync(Shellmaterial shell);
        Task DeleteAsync(int id);
        Task<ShellMaterialDTO> GetByIdAsync(int id);
        Task<List<ShellMaterialDTO>> GetAllAsync();
        Task<ShellMaterialDTO> UpdateAsync(ShellMaterialDTO shellDTO);
    }
}
