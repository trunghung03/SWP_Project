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
                MainDiamondAttributeId = product.MainDiamondAtrributeId ?? 0,
                SubDiamondAttributeId = product.SubDiamondAtrributeId ?? 0,
                LaborPrice = product.LaborCost ?? 0,
                Description = product.Description,
                ImageLinkList = product.ImageLinkList,
                MainDiamondAmount = product.MainDiamondAmount ?? 0,
                SubDiamondAmount = product.SubDiamondAmount ?? 0,
                CollectionId = product.CollectionId,
                Sizes = sizes,
                CategoryId = product.CategoryId,
            };
        }

        public static ProductListDTO ToProductListDTO(this Product product)
        {
            var firstImgLink = product.ImageLinkList?.Split(';').FirstOrDefault();
            return new ProductListDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Price = product.Price,
                CategoryID = product.CategoryId,
                ImageLinkList = firstImgLink,
                CollectionId = product.CollectionId ?? 0,
                Shape = product.MainDiamondAtrribute?.Shape ?? "Not Available",
                Carat = product.MainDiamondAtrribute?.Carat ?? 0,
                Color = product.MainDiamondAtrribute?.Color ?? "Not Available",
                Clarity = product.MainDiamondAtrribute?.Clarity ?? "Not Available",
            };
        }



        public static ProductDetailDTO ToProductDetailDTO(this Product product, List<string> subDiamondColors)
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
                Carat = product.MainDiamondAtrribute?.Carat ?? 0,
                SubDiamondColors = subDiamondColors,
                Sizes = sizes,
                CategoryId = product.CategoryId,
            };
        }


        public static Product ToProductFromCreateDTO(this CreateProductRequestDTO productRequestDTO)
        {
            return new Product
            {
                ProductCode = productRequestDTO.ProductCode,
                Name = productRequestDTO.Name,
                Price = productRequestDTO.Price,
                Description = productRequestDTO.Description,
                MainDiamondAtrributeId = productRequestDTO.MainDiamondAttributeId,
                SubDiamondAtrributeId = productRequestDTO.SubDiamondAttributeId,
                LaborCost = productRequestDTO.LaborPrice,
                ImageLinkList = productRequestDTO.imageLinkList,
                MainDiamondAmount = productRequestDTO.MainDiamondAmount,
                SubDiamondAmount = productRequestDTO.SubDiamondAmount,
                CollectionId = productRequestDTO.CollectionId,
                CategoryId = productRequestDTO.CategoryId,
                Status = true
            };
        }
    }
}
