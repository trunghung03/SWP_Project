using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IGoodsService
    {
        Task<DiamondDto> CreateNewDiamond(CreateDiamondRequestDto diamond);
        Task<bool> IsDiamondStockAvailable(int diamondId, int desiredQuantity);
        Task<bool> ProductDiamondExistsAsync(int productId, int diamondId);

        Task<List<Diamond>> GetDiamondsWithSame4CsAsync(int diamondId);
        bool CheckDiamondsHaveSame4Cs(Diamond firstDiamond, Diamond otherDiamond);
        Task<bool> CreateCompletedProduct(CreateProductRequestDTO productDto, List<CreateProductDiamondRequestDto> productDiamondRequestDtos);
        Shell CreateNewShell(CreateShellRequestDto shell);

    }
}
