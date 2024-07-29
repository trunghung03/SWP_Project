using DIAN_.DTOs.ProductDTOs;
using DIAN_.Helper;

namespace DIAN_.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductListDTO>> GetListAsync();
        Task<List<ProductListDTO>> GetDiamondProductAsync();
        Task<(List<ProductDTO>, object)> GetPagedProductsAsync(ProductQuery query);
    }
}
