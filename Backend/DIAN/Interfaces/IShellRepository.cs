using DIAN_.DTOs.ShellDto;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IShellRepository
    {
        Task<Shell> CreateShellAsync(Shell shell);
        Task<Shell?> DeleteShellAsync(int id);
        Task<Shell?> GetShellByIdAsync(int id);

        Task<Shell?> GetShellByProductId(int productId);
        Task<List<Shell>?> GetAllShellAsync();
        Task<Shell?> UpdateShellAsync(Shell shellDTO, int id);

        Task<Shell?> UpdateShellStockAsync(Shell shellDto, int id);

        Task<Shell?> UpdateProductId(UpdateProductIdForShellDto updateProductIdForShellDto, int id);
    }
}
