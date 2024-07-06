using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class ProductMapper
    {
        public static Product ToProductFromUpdateDTO(this UpdateProductRequestDTO updateDTO, int id)
        {
            return new Product
            {
                ProductId = id,
                Name = updateDTO.Name,
                Description = updateDTO.Description,
                ImageLinkList = updateDTO.ImageLinkList,
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
                ImageLinkList = product.ImageLinkList,
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
                Carat = diamond?.Carat ?? 0,
                Color = diamond?.Color ?? string.Empty,
                Clarity = diamond?.Clarity ?? string.Empty,
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
                Sizes = sizes,
                CategoryId = product.CategoryId,
            };
        }

        public static Product ToProductFromCreateDTO(this CreateProductRequestDTO productRequestDTO)
        {
            return new Product
            {
                Name = productRequestDTO.Name,
                Price = productRequestDTO.Price,
                ProductCode = productRequestDTO.ProductCode,
                LaborCost = productRequestDTO.LaborPrice,
                Description = productRequestDTO.Description,
                ImageLinkList = productRequestDTO.imageLinkList,
                CollectionId = productRequestDTO.CollectionId,
                CategoryId = productRequestDTO.CategoryId,
                Status = true
            };
        }
        public static SubDiamondDto ToSubDiamond(this SubDiamondDto dto)
        {
            return new SubDiamondDto
            {
                SubDiamondId = dto.SubDiamondId,
                Quantity = dto.Quantity
            };
        }

        public static MainDiamondDto ToMainDiamond(this MainDiamondDto dto)
        {
            return new MainDiamondDto
            {
                RequiredDiamondIds = dto.RequiredDiamondIds
            };
        }

        public static AddProductDto ToProduct(this AddProductDto dto)
        {
            return new AddProductDto
            {
                Shell = dto.Shell,
                SubDiamond = dto.SubDiamond.ToSubDiamond(),
                RequiredMainDiamonds = dto.RequiredMainDiamonds.Select(md => md.ToMainDiamond()).ToList()
            };
        }
    }
}
