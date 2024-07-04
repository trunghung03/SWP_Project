using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.CodeAnalysis;

namespace DIAN_.Services
{
    public class GoodsService : IGoodsService
    {
        private readonly IShellRepository _shellRepository;
        private readonly IDiamondRepository _diamondRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductDiamondRepository _productDiamondRepository;
        public GoodsService(IShellRepository shellRepository, IDiamondRepository diamondRepository,
            IProductRepository productRepository, IProductDiamondRepository productDiamondRepository)
        {
            _shellRepository = shellRepository;
            _diamondRepository = diamondRepository;
            _productRepository = productRepository;
            _productDiamondRepository = productDiamondRepository;
        }
        public async Task<DiamondDto> CreateNewDiamond(CreateDiamondRequestDto diamond)
        {
            var diamondModel = diamond.ToDiamondFromCreateDTO();
            if (diamondModel.DiamondType == "Main Diamond")
            {
                diamondModel.Quantity = 1;
                if (string.IsNullOrWhiteSpace(diamondModel.CertificateScan))
                {
                    throw new ArgumentException("Certificate scan is required for main diamonds.");
                }
            }
            else if (diamondModel.DiamondType == "Sub Diamond")
            {
                if (diamondModel.Quantity < 1)
                {
                    throw new ArgumentException("Quantity must be greater than 0 for sub diamonds.");
                }
                diamondModel.CertificateScan = null;
            }
            else
            {
                throw new ArgumentException("Invalid diamond type.");
            }
            Diamond createdDiamond = await _diamondRepository.AddDiamondAsync(diamondModel);
            return createdDiamond.ToDiamondDTO();
        }
        public async Task<bool> IsDiamondStockAvailable(int diamondId, int desiredQuantity)
        {
            var diamond = await _diamondRepository.GetDiamondByIdAsync(diamondId);
            if (diamond == null)
            {
                throw new ArgumentException($"Diamond with ID {diamondId} does not exist.");
            }
            return diamond.Quantity >= desiredQuantity;
        }
        public async Task<bool> ProductDiamondExistsAsync(int productId, int diamondId)
        {
            var existingProductDiamond = await _productDiamondRepository.GetByProductIdAsync(productId);
            return existingProductDiamond != null && existingProductDiamond.DiamondId == diamondId;
        }

        public async Task<List<Diamond>> GetDiamondsWithSame4CsAsync(int diamondId)
        {
            var diamond = await _diamondRepository.GetDiamondByIdAsync(diamondId);
            if (diamond == null)
            {
                throw new ArgumentException($"DiamondId {diamondId} does not exist.");
            }

            var allDiamonds = await _diamondRepository.GetAllDiamondsAsync(new DiamondQuery());
            var same4CsDiamonds = allDiamonds.Item1.Where(d =>
                d.Carat == diamond.Carat &&
                d.Cut == diamond.Cut &&
                d.Clarity == diamond.Clarity &&
                d.Color == diamond.Color &&
                d.DiamondType == "Main Diamond").ToList();

            return same4CsDiamonds;
        }
        public bool CheckDiamondsHaveSame4Cs(Diamond firstDiamond, Diamond otherDiamond)
        {
            // Check if both diamonds have the same 4Cs
            return firstDiamond.Carat == otherDiamond.Carat &&
                   firstDiamond.Cut.Equals(otherDiamond.Cut, StringComparison.OrdinalIgnoreCase) &&
                   firstDiamond.Clarity.Equals(otherDiamond.Clarity, StringComparison.OrdinalIgnoreCase) &&
                   firstDiamond.Color.Equals(otherDiamond.Color, StringComparison.OrdinalIgnoreCase);
        }

        public async Task<bool> CreateCompletedProduct(CreateProductRequestDTO productDto, List<CreateProductDiamondRequestDto> productDiamondRequestDtos)
        {
            var productModel = productDto.ToProductFromCreateDTO();
            if (await _productRepository.ExistsProCodeAsync(productDto.ProductCode))
            {
                throw new ArgumentException("Product code already exists.");
            }

            Product product = await _productRepository.CreateAsync(productModel);

            List<ProductDiamond> productDiamonds = new List<ProductDiamond>();
            Diamond firstDiamond = null;

            foreach (var dto in productDiamondRequestDtos)
            {
                var diamond = await _diamondRepository.GetDiamondByIdAsync(dto.DiamondId);
                if (diamond == null)
                {
                    throw new ArgumentException($"Diamond with ID {dto.DiamondId} does not exist.");
                }

                if (firstDiamond == null)
                {
                    firstDiamond = diamond;
                }
                else
                {
                    if (!CheckDiamondsHaveSame4Cs(firstDiamond, diamond))
                    {
                        throw new ArgumentException($"Diamond with ID {dto.DiamondId} does not have the same 4Cs as the first diamond.");
                    }
                }

                bool exists = await ProductDiamondExistsAsync(dto.ProductId, dto.DiamondId);
                if (exists)
                {
                    throw new ArgumentException($"ProductDiamond association already exists for ProductId {dto.ProductId} and DiamondId {dto.DiamondId}.");
                }

                var productDiamondModel = dto.ToProductDiamondFromCreate();
                productDiamonds.Add(productDiamondModel);
            }

            await _productDiamondRepository.CreateRangeAsync(productDiamonds);

            return true;
        }

        public Shell CreateNewShell(CreateShellRequestDto shell)
        {
            throw new NotImplementedException();
        }
    }
}
