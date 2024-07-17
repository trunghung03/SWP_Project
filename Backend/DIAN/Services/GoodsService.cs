using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.Services
{
    public class GoodsService : IGoodsService
    {
        private readonly IDiamondAttributeRepository _diamondAttributeRepository;
        private readonly IProductRepository _productRepository;
        private readonly ISubDiamondRepository _subDiamondRepository;
        private readonly IDiamondRepository _diamondRepository;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IShellRepository _shellRepository;

        public GoodsService(IDiamondAttributeRepository diamondAttributeRepository, IProductRepository productRepository,
            ISubDiamondRepository subDiamondRepository, IDiamondRepository diamondRepository, IPurchaseOrderRepository purchaseOrderRepository,
            IOrderDetailRepository orderDetailRepository, IShellRepository shellRepository)
        {
            _diamondAttributeRepository = diamondAttributeRepository;
            _productRepository = productRepository;
            _subDiamondRepository = subDiamondRepository;
            _diamondRepository = diamondRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
            _orderDetailRepository = orderDetailRepository;
            _shellRepository = shellRepository;
        }

        //create diammond attribue, diamond at the same time (if diamond attribute does not exist => create diamond attribute)
        public async Task<DiamondDto> CreateMainDiamondAsync(CreateDiamondRequestDto requestDto) //convert to dto later
        {
            var diamondModel = requestDto.ToDiamondFromCreateDTO();

            var attributeExists = await FindDiamondAttributeAsync(requestDto);

            Diamondattribute existingAttribute;
            if (!attributeExists)
            {
                var newAttribute = new Diamondattribute
                {
                    Shape = requestDto.Shape,
                    Color = requestDto.Color,
                    Clarity = requestDto.Clarity,
                    Cut = requestDto.Cut,
                    Carat = requestDto.Carat
                };

                existingAttribute = await _diamondAttributeRepository.CreateDiamondAttributeAsync(newAttribute);
            }
            else
            {
                existingAttribute = await _diamondAttributeRepository.GetDiamondAttributeIdByDetailsAsync(
                    requestDto.Shape, requestDto.Color, requestDto.Clarity, requestDto.Cut, requestDto.Carat);
            }

            var newDiamond = new Diamond
            {
                MainDiamondAtrributeId = existingAttribute.DiamondAtrributeId,
                Price = requestDto.Price,
                Status = requestDto.Status,
                CertificateScan = requestDto.CertificateScan
                //order detail null for now
            };

            var diamondDto = await _diamondRepository.AddDiamondAsync(newDiamond);

            return diamondDto.ToDiamondDTO();
        }

        //create diammond attribue, diamond at the same time (if diamond attribute does not exist => create diamond attribute)
        public async Task<SubDiamondDto> CreateSubDiamondAsync(CreateSubDiamondRequestDto requestDto) //convert to dto later
        {

            var diamondModel = requestDto.ToSubDiamondFromCreateDTO();
            var attributeExists = await FindSubDiamondAttributeAsync(requestDto);

            Diamondattribute existingAttribute;
            if (!attributeExists)
            {
                var newAttribute = new Diamondattribute
                {
                    Shape = requestDto.Shape,
                    Color = requestDto.Color,
                    Clarity = requestDto.Clarity,
                    Cut = requestDto.Cut,
                    Carat = requestDto.Carat
                };

                existingAttribute = await _diamondAttributeRepository.CreateDiamondAttributeAsync(newAttribute);
            }
            else
            {
                existingAttribute = await _diamondAttributeRepository.GetDiamondAttributeIdByDetailsAsync(
                    requestDto.Shape, requestDto.Color, requestDto.Clarity, requestDto.Cut, requestDto.Carat);
            }

            var newDiamond = new Subdiamond
            {
                DiamondAtrributeId = existingAttribute.DiamondAtrributeId,
                Price = requestDto.Price,
                Status = requestDto.Status,
                AmountAvailable = requestDto.AmountAvailable
            };

            var diamondDto = await _subDiamondRepository.CreateAsync(newDiamond);

            return diamondDto.ToSubDiamondDTO();
        }



        private async Task<bool> FindDiamondAttributeAsync(CreateDiamondRequestDto requestDto)
        {
            var allAttributes = await _diamondAttributeRepository.GetDiamondAttributesAsync();
            return allAttributes.Any(attr =>
                attr.Shape == requestDto.Shape &&
                attr.Color == requestDto.Color &&
                attr.Clarity == requestDto.Clarity &&
                attr.Cut == requestDto.Cut &&
                attr.Carat == requestDto.Carat);
        }
        private async Task<bool> FindSubDiamondAttributeAsync(CreateSubDiamondRequestDto requestDto)
        {
            var allAttributes = await _diamondAttributeRepository.GetDiamondAttributesAsync();
            return allAttributes.Any(attr =>
                attr.Shape == requestDto.Shape &&
                attr.Color == requestDto.Color &&
                attr.Clarity == requestDto.Clarity &&
                attr.Cut == requestDto.Cut &&
                attr.Carat == requestDto.Carat);
        }

        //handle logic for creating product later
        public async Task<ProductDTO> CreateProductAsync(CreateProductRequestDTO createProductRequestDTO)
        {
            var productModel = createProductRequestDTO.ToProductFromCreateDTO();
            var mainDiamondExists = await _productRepository.ExistsMainDiamondAttributeAsync(createProductRequestDTO.MainDiamondAttributeId);
            var subDiamondExists = await _productRepository.ExistsSubDiamondAttributeAsync(createProductRequestDTO.SubDiamondAttributeId);

            if (!mainDiamondExists)
            {
                throw new ValidationException("This main diamond does not exist.");
            }

            if (!subDiamondExists)
            {
                throw new ValidationException("This sub diamond does not exist.");
            }

            //var availableMainDiamondsCount = await _diamondRepository.CountDiamondsByAttributesAsync(createProductRequestDTO.MainDiamondAttributeId);

            //if (availableMainDiamondsCount < createProductRequestDTO.MainDiamondAmount)
            //{
            //    throw new ValidationException($"Not enough main diamonds available. Required: {createProductRequestDTO.MainDiamondAmount}, Available: {availableMainDiamondsCount}.");
            //}

            var product = await _productRepository.CreateAsync(productModel);
            return product.ToProductDTO();
        }



        public async Task<int> GetMainDiamondsCount(string shape, string color, string clarity, string cut, decimal carat)
        {
            int count = await _diamondRepository.CountDiamondsByAttributesAsync(shape, color, clarity, cut, carat);
            return count;
        }

        public async Task<bool> UpdateQuantitiesForOrder(string status, int orderId)
        {
            Console.WriteLine("Updating quantities for order");

            if (!status.Equals("Paid", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var orderDetails = await _orderDetailRepository.GetByOrderIdAsync(orderId);
            foreach (var orderDetail in orderDetails)
            {
                var updateSuccess = await UpdateProductQuantities(orderDetail);
                if (!updateSuccess)
                {
                    return false;
                }
            }

            return true;
        }

        private async Task<bool> UpdateProductQuantities(Orderdetail orderDetail)
        {
            var product = await _productRepository.GetByIdAsync(orderDetail.ProductId);
            if (product == null)
            {
                return false;
            }

            var shellUpdated = await UpdateShellStock(orderDetail.ProductId);
            if (!shellUpdated)
            {
                return false;
            }

            var diamondsUpdated = await UpdateDiamondsStock(product);
            if (!diamondsUpdated)
            {
                return false;
            }

            return true;
        }

        private async Task<bool> UpdateShellStock(int productId)
        {
            var shell = await _shellRepository.GetShellByIdAsync(productId);
            if (shell != null)
            {
                var updateShellStockDto = new UpdateShellStock
                {
                    Quantity = shell.AmountAvailable - 1
                };
                var updatedShell = updateShellStockDto.ToShellFromUpdateStockDto(shell.ShellId);
                await _shellRepository.UpdateShellStockAsync(updatedShell, shell.ShellId);
                Console.WriteLine("Shell stock updated");
                return true;
            }

            return false;
        }

        private async Task<bool> UpdateDiamondsStock(Product product)
        {
            if (product.MainDiamondAtrributeId != 0)
            {
                var mainDiamondUpdated = await UpdateMainDiamonds(product.MainDiamondAtrributeId.Value, product.MainDiamondAmount ?? 0);
                if (!mainDiamondUpdated)
                {
                    return false;
                }
            }

            if (product.SubDiamondAtrributeId != 0)
            {
                var subDiamondUpdated = await UpdateSubDiamonds(product.SubDiamondAtrributeId.Value, product.SubDiamondAmount ?? 0);
                if (!subDiamondUpdated)
                {
                    return false;
                }
            }

            return true;
        }

        private async Task<bool> UpdateMainDiamonds(int mainDiamondAttributeId, int mainDiamondAmount)
        {
            var diamonds = await _diamondRepository.GetDiamondsByAttributeIdAsync(mainDiamondAttributeId);
            if (diamonds != null && diamonds.Any())
            {
                var updatedCount = 0;
                foreach (var diamond in diamonds)
                {
                    if (updatedCount >= mainDiamondAmount) break; // Stop updating once we reach the mainDiamondAmount

                    diamond.Status = false;
                    await _diamondRepository.UpdateDiamondStatus(mainDiamondAttributeId);
                    updatedCount++;
                }
                return true;
            }
            return false;
        }

        private async Task<bool> UpdateSubDiamonds(int subDiamondAttributeId, int subDiamondAmount)
        {
            var diamond = await _subDiamondRepository.GetDiamondsByAttributeIdAsync(subDiamondAttributeId);
            if (diamond != null)
            {
                var updateDiamondStockDto = new UpdateSubDiamondStockDto
                {
                    AmountAvailable = diamond.AmountAvailable - subDiamondAmount
                };
                await _subDiamondRepository.UpdateDiamondStock(diamond.DiamondId, diamond);
                return true;
            }
            return false;
        }


    }
}
