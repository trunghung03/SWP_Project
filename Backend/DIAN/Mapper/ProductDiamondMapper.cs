using DIAN_.DTOs.ProductDiamondDto;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ProductDiamondMapper
    {
        public static ProductDiamondDto ToProductDiamondDto(this ProductDiamond productDiamond)
        {
            return new ProductDiamondDto
            {
                ProductId = productDiamond.ProductId,
                DiamondId = productDiamond.DiamondId,
                Status = productDiamond.Status
            };
        }

        public static ProductDiamond ToProductDiamondFromCreate(this CreateProductDiamondRequestDto createProductDiamondRequestDto)
        {
            return new ProductDiamond
            {
                ProductId = createProductDiamondRequestDto.ProductId,
                DiamondId = createProductDiamondRequestDto.DiamondId,
                Status = createProductDiamondRequestDto.Status
            };
        }

        public static ProductDiamond ToProductDiamondFromUpdate(this UpdateProductDiamondRequestDto updateProductDiamondRequestDto, int productId)
        {
            return new ProductDiamond
            {
                ProductId = updateProductDiamondRequestDto.ProductId,
                DiamondId = updateProductDiamondRequestDto.DiamondId,
                Status = updateProductDiamondRequestDto.Status
            };
        }
    }
}
