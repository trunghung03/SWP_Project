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
        public async Task<DiamondDto> CreateMainDiamondAsync(CreateDiamondRequestDto requestDto) 
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

            //var stockAvailable = await CheckStockAvailable(createProductRequestDTO); //no need to check stock here, create product
            //here just mean create product design, not check stock
            //if (!stockAvailable)
            //{
            //    throw new ValidationException("Stock not available");
            //}

            var product = await _productRepository.CreateAsync(productModel);

            decimal productPrice = await CalculateProductPriceAsync(product.ProductId);

            var productDTO = product.ToProductDTO();
            productDTO.Price = productPrice;

            return productDTO;
        }

        public async Task<List<ShellDto>> CreateShells(CreateShellRequestDto createShellRequestDto)
        {
            var shells = new List<ShellDto>();

            foreach (var size in createShellRequestDto.Sizes)
            {
                var shellModel = createShellRequestDto.ToShellFromCreateDto(size);

                var shell = await _shellRepository.CreateShellAsync(shellModel);
                shells.Add(shell.ToShellDetail());
            }

            return shells;
        }

        public async Task<int> GetMainDiamondsCount(string shape, string color, string clarity, string cut, decimal carat)
        {
            int count = await _diamondRepository.CountDiamondsByAttributesAsync(shape, color, clarity, cut, carat);
            return count;
        }

        //fe to check stock available
        //shell not available ~ product not display ~ neednt check stock
        public async Task<bool> CheckStockAvailable(int productId)
        {
            // Retrieve the product using productId
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null)
            {
                throw new ArgumentException("Product not found", nameof(productId));
            }

            // Use the product's attributes to check stock availability
            var mainDiamondCount = await _diamondRepository.CountDiamondsByAttributesAsync(product.MainDiamondAtrributeId ?? 0);
            var subDiamond = await _subDiamondRepository.GetDiamondsByAttributeIdAsync(product.SubDiamondAtrributeId ?? 0);
            if (subDiamond == null)
            {
                return false;
            }

            var subDiamondCount = subDiamond.AmountAvailable;
            Console.WriteLine("Main diamond count: " + mainDiamondCount);
            Console.WriteLine("Sub diamond count: " + subDiamondCount);

            if (mainDiamondCount < (product.MainDiamondAmount ?? 0))
            {
                return false;
            }
            if (subDiamond.AmountAvailable < (product.SubDiamondAmount ?? 0))
            {
                return false;
            }

            return true;
        }

        public async Task<bool> UpdateQuantitiesForOrder(int orderId, bool increaseQuantities) //when checkout, not - quantity yet (for ensure customer not cancel order)
        {
            Console.WriteLine("Updating quantities for order");

            var orderDetails = await _orderDetailRepository.GetByOrderIdAsync(orderId);
            foreach (var orderDetail in orderDetails)
            {
                var updateSuccess = await UpdateProductQuantities(orderDetail, increaseQuantities);
                if (!updateSuccess)
                {
                    return false;
                }
            }

            return true;
        }


        private async Task<bool> UpdateProductQuantities(Orderdetail orderDetail, bool increaseQuantities)
        {
            var product = await _productRepository.GetByIdAsync(orderDetail.ProductId);
            if (product == null)
            {
                return false;
            }

            var shellUpdated = await UpdateShellStock(orderDetail.ProductId, increaseQuantities);
            if (!shellUpdated)
            {
                return false;
            }

            var diamondsUpdated = await UpdateDiamondsStock(product, orderDetail.OrderDetailId, increaseQuantities);
            if (!diamondsUpdated)
            {
                return false;
            }

            return true;
        }


        private async Task<bool> UpdateShellStock(int productId, bool increaseQuantities)
        {
            var shell = await _shellRepository.GetShellByIdAsync(productId);
            if (shell != null)
            {
                var updateShellStockDto = new UpdateShellStock
                {
                    Quantity = increaseQuantities ? shell.AmountAvailable + 1 : shell.AmountAvailable - 1
                };
                var updatedShell = updateShellStockDto.ToShellFromUpdateStockDto(shell.ShellId);
                await _shellRepository.UpdateShellStockAsync(updatedShell, shell.ShellId);
                Console.WriteLine("Shell stock updated");
                return true;
            }

            return false;
        }


        private async Task<bool> UpdateDiamondsStock(Product product, int orderDetailId, bool increaseQuantities)
        {
            if (product.MainDiamondAtrributeId != 0)
            {
                var mainDiamondUpdated = await UpdateMainDiamonds(product.MainDiamondAtrributeId.Value, product.MainDiamondAmount ?? 0, orderDetailId, increaseQuantities);
                if (!mainDiamondUpdated)
                {
                    return false;
                }
            }

            if (product.SubDiamondAtrributeId != 0)
            {
                var subDiamondUpdated = await UpdateSubDiamonds(product.SubDiamondAtrributeId.Value, product.SubDiamondAmount ?? 0, orderDetailId, increaseQuantities);
                if (!subDiamondUpdated)
                {
                    return false;
                }
            }

            return true;
        }


        private async Task<bool> UpdateMainDiamonds(int mainDiamondAttributeId, int mainDiamondAmount, int orderDetailId, bool increaseQuantities)
        {
            var diamonds = await _diamondRepository.GetDiamondsByAttributeIdAsync(mainDiamondAttributeId);
            if (diamonds != null && diamonds.Any())
            {
                var updatedCount = 0;
                foreach (var diamond in diamonds)
                {
                    if (updatedCount >= mainDiamondAmount) break;
                    var newOrderDetailId = increaseQuantities ? 0 : orderDetailId;
                    await _diamondRepository.UpdateMainDiamondOrderDetailId(newOrderDetailId, diamond.DiamondId);
                    updatedCount++;
                }
                return true;
            }
            return false;
        }


        private async Task<bool> UpdateSubDiamonds(int subDiamondAttributeId, int subDiamondAmount, int orderDetailId, bool increaseQuantities)
        {
            var diamond = await _subDiamondRepository.GetDiamondsByAttributeIdAsync(subDiamondAttributeId);
            if (diamond != null)
            {
                var updateDiamondStockDto = new UpdateSubDiamondStockDto
                {
                    AmountAvailable = increaseQuantities ? diamond.AmountAvailable + subDiamondAmount : diamond.AmountAvailable - subDiamondAmount
                };
                await _subDiamondRepository.UpdateDiamondStock(diamond.DiamondId, updateDiamondStockDto);
                return true;
            }
            return false;
        }


        public async Task<decimal> CalculateProductPriceAsync(int productId)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null) throw new ArgumentException("Product not found", nameof(productId));

            decimal mainDiamondPrice = 0;
            decimal subDiamondPrice = 0;
            //decimal shellPrice = 0;
            decimal laborPrice = product.LaborCost ?? 0;

            if (product.MainDiamondAtrributeId.HasValue && product.MainDiamondAtrributeId.Value != 0)
            {
                var mainDiamonds = await _diamondRepository.GetDiamondsByAttributeIdAsync(product.MainDiamondAtrributeId.Value);
                decimal totalMainDiamondPrice = mainDiamonds.Sum(d => d.Price * product.MainDiamondAmount ?? 0);
                mainDiamondPrice = totalMainDiamondPrice * (product.MainDiamondAmount ?? 1);
            }

            if (product.SubDiamondAtrributeId.HasValue && product.SubDiamondAtrributeId.Value != 0)
            {
                var mainDiamonds = await _subDiamondRepository.GetDiamondsByAttributeIdAsync(product.SubDiamondAtrributeId.Value);
                decimal totalMainDiamondPrice = mainDiamonds.Price * product.MainDiamondAmount ?? 0;
                mainDiamondPrice = totalMainDiamondPrice * (product.MainDiamondAmount ?? 1);
            }

            decimal totalProductPrice = mainDiamondPrice + subDiamondPrice + laborPrice + product.LaborCost ?? 0;
            return totalProductPrice;
        }

    }
}
