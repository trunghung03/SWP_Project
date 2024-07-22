using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.DTOs.SubDiamondDto;

namespace DIAN_.Interfaces
{
    public interface IGoodsService
    {
        Task<int> GetMainDiamondsCount(string shape, string color, string clarity, string cut, decimal carat);

        Task<ProductDTO> CreateProductAsync(CreateProductRequestDTO createProductRequestDTO);

        Task<SubDiamondDto> CreateSubDiamondAsync(CreateSubDiamondRequestDto requestDto);

        Task<DiamondDto> CreateMainDiamondAsync(CreateDiamondRequestDto requestDto);

        Task<bool> UpdateQuantitiesForOrder(int orderId, bool isIncrease);

        Task<List<ShellDto>> CreateShells(CreateShellRequestDto createShellRequestDto);

        Task<decimal> CalculateProductPriceAsync(int productId);
        Task<bool> CheckStockAvailable(int productId);
    }
}
