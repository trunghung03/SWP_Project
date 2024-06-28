using DIAN_.DTOs.ShellDTOs;
using DIAN_.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IShellMaterialRepository
    {
        Task<Shellmaterial> CreateAsync(Shellmaterial shell);
        Task<Shellmaterial?> DeleteAsync(int id);
        Task<Shellmaterial?> GetByIdAsync(int id);
        Task<List<Shellmaterial>?> GetAllAsync();
        Task<Shellmaterial?> UpdateAsync(Shellmaterial shellDTO, int id);
        Task<List<string>> GetListNamesAsync();

        Task<List<Shellmaterial>> GetShellByName(string name);
    }
}
