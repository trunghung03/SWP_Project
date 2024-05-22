using DIAN_.DTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ProductMapper
    {
        public static ProductDTO ToProductDTO (this Product productDTO)
        {
            return new ProductDTO
            {
                ProCode = productDTO.ProCode,
                Name = productDTO.Name, 
                Price = productDTO.Price,
                LaborPrice = productDTO.LaborPrice,
                ChargeUp = productDTO.ChargeUp,
                Description = productDTO.Description,
                MainDiamondId = productDTO.MainDiamondId,
                ImageLinkList = productDTO.ImageLinkList,
                SubDiamondAmount = productDTO.SubDiamondAmount,

            };
        }
        public static ProductListDTO ToProductListDTO(this Product product)
        {
            return new ProductListDTO
            {
                Name = product.Name,
                Price = product.Price,
                ImageLinkList = product.ImageLinkList,
            };
        }
        public static ProductDetailDTO ToProductDetailDTO(this Product product, Diamond diamond, List<string> subDiamondColors)
        {
            return new ProductDetailDTO
            {
                Name = product.Name,
                Price = product.Price,
                Image = product.ImageLinkList,
                ProCode = product.ProCode,
                Description = product.Description,
                Carat = diamond.Carat,
                SubDiamond = subDiamondColors,
            };
        }
        public static Product ToProductFromCreateDTO (this CreateProductRequestDTO productRequestDTO)
        {
            return new Product
            {
                Name = productRequestDTO.Name,
                Price = productRequestDTO.Price,
                ProCode = productRequestDTO.ProCode,
                LaborPrice = productRequestDTO.LaborPrice,
                Description = productRequestDTO.Description,
                ImageLinkList = productRequestDTO.ImageLinkList,
                ChargeUp = productRequestDTO.ChargeUp,
                MainDiamondId = productRequestDTO.MainDiamondId,
                SubDiamondAmount = productRequestDTO.SubDiamondAmount,
            };
        }


    }
}
