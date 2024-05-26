using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ISizeRepository
    {
        //Task<List<Size>> GetAllSizeAsync();
        Task<Size?> GetSizeByIdAsync(int id);
        Task<Size> CreateSizeAsync(Size sizeModel);
        Task<Size?> UpdateSizeAsync(int id, Size size);
        Task<Size?> DeleteSizeAsync(int id);
    }
}
