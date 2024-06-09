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
                LaborCost = updateDTO.LaborPrice,
                ImageLinkList = updateDTO.ImageLinkList,
                MainDiamondId = updateDTO.MainDiamondId,
                SubDiamondAmount = updateDTO.SubDiamondAmount,
                ProductCode = updateDTO.ProductCode,
                MainDiamondAmount = updateDTO.MainDiamondAmount,
                ShellAmount = updateDTO.ShellAmount,
                CollectionId = updateDTO.CollectionId,
                CategoryId = updateDTO.CategoryId,
            };
            

            
        }
        public static ProductDTO ToProductDTO(this Product product)
        {
            var sizes = new List<decimal>();
            if (product.Category != null && product.Category.Size != null)
            {
                var minSize = product.Category.Size.MinSize ?? 0;
                var maxSize = product.Category.Size.MaxSize ?? 0;
                var step = product.Category.Size.Step ?? 1;

                for (var size = minSize; size <= maxSize; size += step)
                {
                    sizes.Add(size);
                }
            }
            return new ProductDTO
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
                Name = product.Name,
                Price = product.Price,
                LaborPrice = product.LaborCost ?? 0, // Handle nullable types
                Description = product.Description,
                MainDiamondId = product.MainDiamondId ?? 0,
                ImageLinkList = product.ImageLinkList,
                SubDiamondAmount = product.SubDiamondAmount ?? 0, 
                MainDiamondAmount= product.MainDiamondAmount ?? 0,
                ShellAmount= product.ShellAmount ?? 0,
                CollectionId = product.CollectionId,
                Sizes = sizes,
                CategoryId = product.CategoryId,
            };
        }

        public static ProductListDTO ToProductListDTO(this Product product, Diamond diamond)
        {
            var FirstImgLink = product.ImageLinkList?.Split(';').FirstOrDefault();
            return new ProductListDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                CategoryID = product.CategoryId,
                ImageLinkList = FirstImgLink,
                CollectionId = product.CollectionId ?? 0,
                Shape = diamond?.Shape ?? string.Empty,
            };
        }
        public static ProductDetailDTO ToProductDetailDTO(this Product product, Diamond diamond, List<string> subDiamondColors)
        {
            var sizes = new List<decimal>();
            if (product.Category != null && product.Category.Size != null)
            {
                var minSize = product.Category.Size.MinSize ?? 0;
                var maxSize = product.Category.Size.MaxSize ?? 0;
                var step = product.Category.Size.Step ?? 1;

                for (var size = minSize; size <= maxSize; size += step)
                {
                    sizes.Add(size);
                }
            }
            return new ProductDetailDTO
            {
                Name = product.Name,
                Price = product.Price,
                Image = product.ImageLinkList,
                ProductCode = product.ProductCode,
                Description = product.Description,
                Carat = diamond?.Carat ?? 0,
                SubDiamondColors = subDiamondColors,
                Sizes= sizes,
                CategoryId=product.CategoryId,
            };
        }
        public static Product ToProductFromCreateDTO (this CreateProductRequestDTO productRequestDTO, string imageLinkList)
        {
            return new Product
            {
                Name = productRequestDTO.Name,
                Price = productRequestDTO.Price,
                ProductCode = productRequestDTO.ProductCode,
                LaborCost = productRequestDTO.LaborPrice,
                Description = productRequestDTO.Description,
                ImageLinkList = imageLinkList,
                MainDiamondId = productRequestDTO.MainDiamondId,
                SubDiamondAmount = productRequestDTO.SubDiamondAmount,
                MainDiamondAmount = productRequestDTO.SubDiamondAmount,
                ShellAmount = productRequestDTO.ShellAmount,
                CollectionId = productRequestDTO.CollectionId,
                CategoryId = productRequestDTO.CategoryId,
                Status = true
            };
        }       
    }
}
