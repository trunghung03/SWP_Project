using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.SubDiamondDto;

namespace DIAN_.Interfaces
{
    public interface IGoodsService
    {
        int GetMainDiamondsCount();

        Task<ProductDTO> CreateProductAsync(CreateProductRequestDTO createProductRequestDTO);

        Task<SubDiamondDto> CreateSubDiamondAsync(CreateSubDiamondRequestDto requestDto);

        Task<DiamondDto> CreateMainDiamondAsync(CreateDiamondRequestDto requestDto);
    }
}
