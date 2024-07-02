using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IShellRepository
    {
        Task<Shell> CreateShellAsync(Shell shell);
        Task<Shell?> DeleteShellAsync(int id);
        Task<Shell?> GetShellByIdAsync(int id);
        Task<List<Shell>?> GetAllShellAsync();
        Task<Shell?> UpdateShellAsync(Shell shellDTO, int id);

        Task<Shell?> UpdateShellStockAsync(Shell shellDto, int id);
    }
}
