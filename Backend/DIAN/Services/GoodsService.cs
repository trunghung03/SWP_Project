using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace DIAN_.Services
{
    public class GoodsService : IGoodsService
    {
        private readonly IDiamondRepository _diamondRepository;
        private readonly IProductRepository _productRepository;
        private readonly IShellRepository _shellRepository;
        private readonly ILogger<GoodsService> _logger;
        public GoodsService(IDiamondRepository diamondRepository, IProductRepository productRepository, IShellRepository shellRepository, ILogger<GoodsService> logger)
        {
            _diamondRepository = diamondRepository;
            _productRepository = productRepository;
            _shellRepository = shellRepository; 
            _logger = logger;

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
        public async Task AddMultipleProductsAsync(UpdateProductRequestDTO createProductRequest, List<AddProductDto> products, int quantity)
        {
            try
            {
                var product = new Product
                {
                    ProductCode = "",
                    Name = "",
                    Price = 0,
                    Status = true
                };
                _logger.LogInformation("Creating product...");
                await _productRepository.CreateAsync(product);
                for (int i = 0; i < quantity; i++)
                {
                    foreach (var productDto in products)
                    {
                        var updateShellDto = new UpdateProductIdForShellDto
                        {
                            ProductId = product.ProductId
                        };

                        var shellId = productDto.Shell.ShellId;
                        _logger.LogInformation($"Updating shell... {shellId}", shellId);
                        await _shellRepository.UpdateProductId(updateShellDto, shellId);
                        _logger.LogInformation("Shell updated.");

                        var updateDiamondDto = new UpdateProductIdForDiamondDto
                        {
                            ProductId = product.ProductId
                        };
                        var subDiamondId = productDto.SubDiamond.SubDiamondId;
                        _logger.LogInformation($"Updating sub diamond... {subDiamondId}", subDiamondId);
                        await _diamondRepository.UpdateProductId(updateDiamondDto, subDiamondId);
                        _logger.LogInformation("Sub diamond updated.");
                        foreach (var mainDiamondDto in productDto.RequiredMainDiamonds)
                        {
                            foreach (var diamondId in mainDiamondDto.RequiredDiamondIds)
                            {
                                var updateProductIdOfMainDiamond = new UpdateProductIdForDiamondDto
                                {
                                    ProductId = product.ProductId
                                };
                                _logger.LogInformation($"Updating main diamond... {diamondId}", diamondId);
                                await _diamondRepository.UpdateProductId(updateProductIdOfMainDiamond, diamondId);
                                _logger.LogInformation("Main diamond updated.");
                            }
                        }
                    }
                }
                 product = await _productRepository.UpdateProductAsync(createProductRequest.ToProductFromUpdateDTO(product.ProductId), product.ProductId);
            }
            catch (DbUpdateException ex)
            {
                // Log detailed error message
                var errorMessage = $"DbUpdateException: {ex.Message}";
                if (ex.InnerException != null)
                {
                    errorMessage += $" InnerException: {ex.InnerException.Message}";
                }
                // Add logging here (e.g., using a logging framework)
                Console.WriteLine(errorMessage);
                throw new Exception("An error occurred while saving the products. Please check the input data and try again.");
            }
            catch (Exception ex)
            {
                // Log detailed error message
                var errorMessage = $"Exception: {ex.Message}";
                if (ex.InnerException != null)
                {
                    errorMessage += $" InnerException: {ex.InnerException.Message}";
                }
                // Add logging here (e.g., using a logging framework)
                Console.WriteLine(errorMessage);
                throw;
            }
        }



        public async Task<ProductDetailWithSpecificDiamondDto> GetProductWithDetailsAsync(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null)
            {
                throw new Exception($"Product with ID {productId} not found.");
            }

            var shell = await _shellRepository.GetShellByProductId(productId);
            var subDiamond = await _diamondRepository.GetSingleDiamondByProductId(productId);
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
