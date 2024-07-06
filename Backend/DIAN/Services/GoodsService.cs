﻿using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.Interfaces;
using DIAN_.Models;

namespace DIAN_.Services
{
    public class GoodsService : IGoodsService
    {
        private readonly IDiamondRepository _diamondRepository;
        private readonly IProductRepository _productRepository;
        private readonly IShellRepository _shellRepository;

        public GoodsService(IDiamondRepository diamondRepository, IProductRepository productRepository, IShellRepository shellRepository)
        {
            _diamondRepository = diamondRepository;
            _productRepository = productRepository;
            _shellRepository = shellRepository;
        }
        public async Task<List<Diamond>> GetDiamondWithSame4c(int diamondId)
        {

            var diamond = await _diamondRepository.GetDiamondByIdAsync(diamondId);
            if (diamond == null)
            {
                throw new Exception($"Diamond with ID {diamondId} not found.");
            }
            var matchingDiamonds = await _diamondRepository.GetDiamondsBy4cAsync(diamond.Carat ?? 0, diamond.Cut, diamond.Color, diamond.Clarity);

            return matchingDiamonds;
        }


        public async Task<List<Diamond>> GetListDiamondByProductId(int productId)
        {
            var diamonds = await _diamondRepository.GetDiamondsByProductIdAsync(productId);
            if (diamonds == null || !diamonds.Any())
            {
                throw new Exception($"No diamonds found for product ID {productId}.");
            }
            return diamonds;
        }

        public async Task<List<Diamond>> GetMainDiamondList()
        {
            return await _diamondRepository.GetDiamondsByCaratAsync(1, decimal.MaxValue);
        }

        public async Task<List<Diamond>> GetSubDiamondList()
        {
            return await _diamondRepository.GetDiamondsByCaratAsync(0, 1);
        }
        public async Task<bool> IsMainDiamond(int diamondId)
        {
            var diamond = await _diamondRepository.GetDiamondByIdAsync(diamondId);
            if (diamond == null)
            {
                throw new Exception($"Diamond with ID {diamondId} not found.");
            }
            return diamond.Carat > 1;
        }
        public async Task AddMultipleProductsAsync(List<AddProductDto> products, int quantity)
        {
            for (int i = 0; i < quantity; i++)
            {
                foreach (var productDto in products)
                {
                    var product = new Product
                    {
                        Status = true
                    };
                    await _productRepository.CreateAsync(product);

                    var updateShellDto = new UpdateProductIdForShellDto
                    {
                        ProductId = product.ProductId
                    };
                    var shellId = productDto.Shell.ShellId;
                    await _shellRepository.UpdateProductId(updateShellDto, shellId);

                    var updateDiamondDto = new UpdateProductIdForDiamondDto
                    {
                        ProductId = product.ProductId
                    };
                    var subDiamondId = productDto.SubDiamond.SubDiamondId;
                    await _diamondRepository.UpdateProductId(updateDiamondDto, subDiamondId);

                    foreach (var mainDiamondDto in productDto.RequiredMainDiamonds)
                    {
                        foreach (var diamondId in mainDiamondDto.RequiredDiamondIds)
                        {
                            var updateProductIdOfMainDiamond = new UpdateProductIdForDiamondDto
                            {
                                ProductId = product.ProductId
                            };
                            var MainDiamondId = productDto.SubDiamond.SubDiamondId;
                            await _diamondRepository.UpdateProductId(updateProductIdOfMainDiamond, subDiamondId);
                        }
                    }
                }
            }
        }
        public async Task<ProductDetailDTO> GetProductWithDetailsAsync(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null)
            {
                throw new Exception($"Product with ID {productId} not found.");
            }

            var shell = await _shellRepository.GetShellByIdAsync(productId); //it should be get by productid
            var subDiamond = await _diamondRepository.GetDiamondsByProductIdAsync(productId);
            var mainDiamonds = await _diamondRepository.GetDiamondsByProductIdAsync(productId);

            // Ensure the number of main diamonds matches the MainDiamondAmount
            var mainDiamondAmount = product.MainDiamondAmount ?? 0;
            var limitedMainDiamonds = mainDiamonds.Take(mainDiamondAmount).ToList();

            return new ProductDetailWithSpecificDiamondDto
            {
                Product = product,
                Shell = shell,
                SubDiamond = subDiamond,
                MainDiamonds = limitedMainDiamonds
            };
        }

    }
}
