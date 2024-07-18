using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IShellRepository
    {
        Task<Shell> CreateShellAsync(Shell shell);
        Task<Shell?> DeleteShellAsync(int id);
        Task<Shell?> GetShellByIdAsync(int id);
        Task<(List<Shell>?, int)> GetAllShellAsync(ShellQuerry query);
        Task<Shell?> UpdateShellAsync(Shell shellDTO, int id);

        Task<Shell?> UpdateShellStockAsync(Shell shellDto, int id);

        Task<Shell?> GetShellByProductIdAsync(int productId);
    }
}
