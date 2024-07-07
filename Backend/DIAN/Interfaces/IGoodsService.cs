using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IGoodsService
    {
        Task<List<Diamond>> GetMainDiamondList();

        Task<List<Diamond>> GetSubDiamondList();

        Task<List<Diamond>> GetDiamondWithSame4c(int diamondId);

        Task<List<Diamond>> GetListDiamondByProductId(int productId);

        Task<bool> IsMainDiamond(int diamondId);

        Task AddMultipleProductsAsync(UpdateProductRequestDTO productRequestDTO, List<AddProductDto> products, int quantity);
    }
}
