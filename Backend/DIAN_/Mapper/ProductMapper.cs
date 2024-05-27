using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ProductMapper
    {
        public static Product ToProductFromUpdateDTO(this UpdateProductRequestDTO updateDTO)
        {
            return new Product
            {
                Name = updateDTO.Name,
                Description = updateDTO.Description,
                Price = updateDTO.Price,
                LaborPrice = updateDTO.LaborPrice,
                ImageLinkList = updateDTO.ImageLinkList,
                ChargeUp = updateDTO.ChargeUp,
                MainDiamondId = updateDTO.MainDiamondId,
                SubDiamondAmount = updateDTO.SubDiamondAmount,
                ProductCode = updateDTO.ProductCode,
                MainDiamondAmount = updateDTO.MainDiamondAmount,
                ShellAmount = updateDTO.ShellAmount,
                CollectionId = updateDTO.CollectionId,
            };
            

            
        }
        public static ProductDTO ToProductDTO(this Product product)
        {
            return new ProductDTO
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
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
                CollectionId = product.CollectionId,
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
                ProductCode = product.ProductCode,
                Description = product.Description,
                Carat = diamond?.Carat ?? 0,
                SubDiamondColors = subDiamondColors,

            };
        }
        public static Product ToProductFromCreateDTO (this CreateProductRequestDTO productRequestDTO)
        {
            return new Product
            {
                Name = productRequestDTO.Name,
                Price = productRequestDTO.Price,
                ProductCode = productRequestDTO.ProductCode,
                LaborPrice = productRequestDTO.LaborPrice,
                Description = productRequestDTO.Description,
                ImageLinkList = productRequestDTO.ImageLinkList,
                ChargeUp = productRequestDTO.ChargeUp,
                MainDiamondId = productRequestDTO.MainDiamondId,
                SubDiamondAmount = productRequestDTO.SubDiamondAmount,
                MainDiamondAmount= productRequestDTO.SubDiamondAmount,
                ShellAmount = productRequestDTO.ShellAmount,
                CollectionId = productRequestDTO.CollectionId,
            };
        }


    }
}
