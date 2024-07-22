using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;
using System.Linq;


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
            var sizes = new HashSet<decimal>(); 

            if (product.Shells != null && product.Shells.Any())
            {
                foreach (var shell in product.Shells)
                {
                    if (shell.Size.HasValue)
                    {
                        sizes.Add(shell.Size.Value);
                    }
                }
            }
            int stock = product.Shells?.Sum(shell => shell.AmountAvailable) ?? 0;

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
                Sizes = sizes.ToList(),
                CategoryId = product.CategoryId,
                Stock = stock
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
                Cut = product.MainDiamondAtrribute?.Cut ?? "Not Available", 
                Shape = product.MainDiamondAtrribute?.Shape ?? "Not Available",
                Carat = product.MainDiamondAtrribute?.Carat ?? 0,
                Color = product.MainDiamondAtrribute?.Color ?? "Not Available",
                Clarity = product.MainDiamondAtrribute?.Clarity ?? "Not Available",
                MainDiamondAttributeId = product.MainDiamondAtrributeId ?? 0,
                SubDiamondAttributeId = product.SubDiamondAtrributeId ?? 0,
                ProductCode = product.ProductCode,
                //Stock = product.Shells?.Sum(shell => shell.AmountAvailable) ?? 0
                Stock = product.Shells?.FirstOrDefault()?.AmountAvailable ?? 0


            };
        }



        public static ProductDetailDTO ToProductDetailDTO(this Product product, List<string> subDiamondColors)
        {
            var sizes = new HashSet<decimal>(); 

            if (product.Shells != null && product.Shells.Any())
            {
                foreach (var shell in product.Shells)
                {
                    if (shell.Size.HasValue)
                    {
                        sizes.Add(shell.Size.Value);
                    }
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
                Sizes = sizes.ToList(), 
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
