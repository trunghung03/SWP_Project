using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ProductMapper
    {
        public static ProductDTO ToProductDTO(this Product product)
        {
            return new ProductDTO
            {
                ProCode = product.ProCode,
                Name = product.Name,
                Price = product.Price,
                LaborPrice = product.LaborPrice ?? 0, // Handle nullable types
                ChargeUp = product.ChargeUp ?? 0,
                Description = product.Description,
                MainDiamondId = product.MainDiamondId,
                ImageLinkList = product.ImageLinkList,
                SubDiamondAmount = product.SubDiamondAmount ?? 0, 
                MainDiamondAmount= product.MainDiamondAmount ?? 0,
                ShellAmount= product.ShellAmount ?? 0,
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
                Carat = diamond.Carat ?? 0,
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
