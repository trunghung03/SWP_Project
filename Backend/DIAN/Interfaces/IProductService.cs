using DIAN_.DTOs.ProductDTOs;

namespace DIAN_.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductListDTO>> GetListAsync();
        Task<List<ProductListDTO>> GetDiamondProductAsync();
    }
}
