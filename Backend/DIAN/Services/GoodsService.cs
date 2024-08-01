using DIAN_.DTOs.DiamondAttributeDto;
using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.Extensions.Caching.Distributed;
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
        private readonly IDistributedCache _distributedCache;

        public GoodsService(IDiamondAttributeRepository diamondAttributeRepository, IProductRepository productRepository,
            ISubDiamondRepository subDiamondRepository, IDiamondRepository diamondRepository, IPurchaseOrderRepository purchaseOrderRepository,
            IOrderDetailRepository orderDetailRepository, IShellRepository shellRepository, IDistributedCache distributedCache)
        {
            _diamondAttributeRepository = diamondAttributeRepository;
            _productRepository = productRepository;
            _subDiamondRepository = subDiamondRepository;
            _diamondRepository = diamondRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
            _orderDetailRepository = orderDetailRepository;
            _shellRepository = shellRepository;
            _distributedCache = distributedCache;
        }

        //create diammond attribue, diamond at the same time (if diamond attribute does not exist => create diamond attribute)
        public async Task<DiamondDto> CreateMainDiamondAsync(CreateDiamondRequestDto requestDto)
        {
            var diamondModel = requestDto.ToDiamondFromCreateDTO();

            // Check if the diamond attribute already exists
            var attributeExists = await FindDiamondAttributeAsync(requestDto);

            Diamondattribute diamondAttribute;

            if (attributeExists == null)
            {
                // If the attribute does not exist, create a new one
                var newAttribute = new CreateDiamondAttributeDto
                {
                    Shape = requestDto.Shape,
                    Color = requestDto.Color,
                    Clarity = requestDto.Clarity,
                    Cut = requestDto.Cut,
                    Carat = requestDto.Carat
                };
                var newAttributeModel = newAttribute.FromCreateDtoToDiamondAttribute();
                diamondAttribute = await _diamondAttributeRepository.CreateDiamondAttributeAsync(newAttributeModel);

            }
            else
            {
                diamondAttribute = attributeExists;
            }
            var newDiamond = new Diamond
            {
                MainDiamondAtrributeId = diamondAttribute.DiamondAtrributeId,
                Price = requestDto.Price,
                Status = requestDto.Status,
                CertificateScan = requestDto.CertificateScan
                // Order detail is null for now
            };

            var diamondDto = await _diamondRepository.AddDiamondAsync(newDiamond);
            await CacheUtils.InvalidateProductCaches(_distributedCache);

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
            await CacheUtils.InvalidateProductCaches(_distributedCache);
            return diamondDto.ToSubDiamondDTO();
        }

        private async Task<Diamondattribute> FindDiamondAttributeAsync(CreateDiamondRequestDto requestDto)
        {
            var allAttributes = await _diamondAttributeRepository.GetDiamondAttributesAsync();
            var foundAttribute = allAttributes.FirstOrDefault(attr =>
                attr.Shape == requestDto.Shape &&
                attr.Color == requestDto.Color &&
                attr.Clarity == requestDto.Clarity &&
                attr.Cut == requestDto.Cut &&
                attr.Carat == requestDto.Carat);

            return foundAttribute;
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

            decimal productPrice = await CalculateProductPriceAsync(createProductRequestDTO);
            productModel.Price = productPrice;
            var product = await _productRepository.CreateAsync(productModel);
            var stock = await CheckStockAvailable(product.ProductId);
            if (stock.MaxProductAvailable <= 0)
            {
                product.Status = false;
                await _productRepository.UpdateProductAsync(product, product.ProductId);
            }
            await CacheUtils.InvalidateProductCaches(_distributedCache);

            return product.ToProductDTO();
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
            await CacheUtils.InvalidateProductCaches(_distributedCache);
            return shells;
        }

        public async Task<int> GetMainDiamondsCount(string shape, string color, string clarity, string cut, decimal carat)
        {
            int count = await _diamondRepository.CountDiamondsByAttributesAsync(shape, color, clarity, cut, carat);
            return count;
        }

        //fe to check stock available
        //shell not available ~ product not display ~ neednt check stock
        public async Task<StockDto> CheckStockAvailable(int productId)
        {
            // Retrieve the product using productId
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null)
            {
                throw new ArgumentException("Product not found", nameof(productId));
            }

            var stockDto = new StockDto();

            if (product.CategoryId == 10)
            {
                var availableDiamonds = await _diamondRepository.FindAvailableDiamond(product.MainDiamondAtrributeId ?? 0);
                Console.WriteLine("Available diamonds: " + availableDiamonds.Count);
                stockDto.MainDiamondCount = availableDiamonds.Count;
                stockDto.SubDiamondCount = 0; // No sub-diamonds for this category
                stockDto.MaxProductAvailable = (product.MainDiamondAmount ?? 1) != 0 ? availableDiamonds.Count / (product.MainDiamondAmount ?? 1) : 0;
            }
            else
            {
                var mainDiamondCount = await _diamondRepository.CountDiamondsByAttributesAsync(product.MainDiamondAtrributeId ?? 0);
                var subDiamond = await _subDiamondRepository.GetDiamondsByAttributeIdAsync(product.SubDiamondAtrributeId ?? 0);
                var mainDiamond = await _diamondRepository.GetDiamondByIdAsync(product.MainDiamondAtrributeId ?? 0);
                if (subDiamond == null)
                {
                    stockDto.MainDiamondCount = mainDiamondCount;
                    stockDto.SubDiamondCount = 0;
                    stockDto.MaxProductAvailable = (product.MainDiamondAmount ?? 1) != 0 ? mainDiamondCount / (product.MainDiamondAmount ?? 1) : 0;
                }
                else if (mainDiamond == null)
                {
                    stockDto.MainDiamondCount = 0;
                    stockDto.SubDiamondCount = subDiamond.AmountAvailable;
                    stockDto.MaxProductAvailable = (product.SubDiamondAmount ?? 1) != 0 ? subDiamond.AmountAvailable / (product.SubDiamondAmount ?? 1) : 0;
                }
                else
                {
                    var subDiamondCount = subDiamond.AmountAvailable;
                    Console.WriteLine("Main diamond count: " + mainDiamondCount);
                    Console.WriteLine("Sub diamond count: " + subDiamondCount);

                    stockDto.MainDiamondCount = mainDiamondCount;
                    stockDto.SubDiamondCount = subDiamondCount;

                    int mainDiamondAmount = product.MainDiamondAmount ?? 1;
                    int subDiamondAmount = product.SubDiamondAmount ?? 1;

                    int maxProductsFromMainDiamonds = mainDiamondAmount != 0 ? mainDiamondCount / mainDiamondAmount : 0;
                    int maxProductsFromSubDiamonds = subDiamondAmount != 0 ? subDiamondCount / subDiamondAmount : 0;

                    stockDto.MaxProductAvailable = Math.Min(maxProductsFromMainDiamonds, maxProductsFromSubDiamonds);
                }
            }
            stockDto.Message = stockDto.MaxProductAvailable > 0 ? "Available" : "Not enough stock";

            return stockDto;
        }


        public async Task<bool> UpdateQuantitiesForOrder(int orderId, bool increaseQuantities) //when checkout, not - quantity yet (for ensure customer not cancel order)
        {
            Console.WriteLine("Updating quantities for order");

            var orderDetails = await _orderDetailRepository.GetByOrderIdAsync(orderId);
            foreach (var orderDetail in orderDetails)
            {
                Console.WriteLine("Updating quantities for order detail: " + orderDetail.OrderDetailId);
                var updateSuccess = await UpdateProductQuantities(orderDetail, increaseQuantities);
                if (!updateSuccess)
                {
                    return false;
                }
            }
            await CacheUtils.InvalidateProductCaches(_distributedCache);
            return true;
        }


        private async Task<bool> UpdateProductQuantities(Orderdetail orderDetail, bool increaseQuantities)
        {
            var product = await _productRepository.GetByIdAsync(orderDetail.ProductId);
            if (product == null)
            {
                return false;
            }

            if (product.CategoryId == 10)
            {
                var diamondsUpdated = await UpdateDiamondsStock(product, orderDetail.OrderDetailId, increaseQuantities);
                if (!diamondsUpdated)
                {
                    return false;
                }
            }
            else
            {
                var shellUpdated = await UpdateShellStock(orderDetail.ShellId ?? 0, increaseQuantities);
                if (!shellUpdated)
                {
                    return false;
                }

                var diamondsUpdated = await UpdateDiamondsStock(product, orderDetail.OrderDetailId, increaseQuantities);
                if (!diamondsUpdated)
                {
                    return false;
                }
            }

            return true;
        }


        private async Task<bool> UpdateShellStock(int orderDetailId, bool increaseQuantities)
        {
            var shell = await _shellRepository.GetShellByIdAsync(orderDetailId);
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
           if (product.CategoryId == 10)
            {
                    var mainDiamondUpdated = await UpdateMainDiamonds(product.MainDiamondAtrributeId.Value, 1, orderDetailId, increaseQuantities);
                    if (!mainDiamondUpdated)
                    {
                        return false;
                    }
            }
            else
            {
                if (product.MainDiamondAtrributeId != 0 && product.MainDiamondAtrributeId != null)
                {
                    var mainDiamondUpdated = await UpdateMainDiamonds(product.MainDiamondAtrributeId.Value, product.MainDiamondAmount ?? 0, orderDetailId, increaseQuantities);
                    if (!mainDiamondUpdated)
                    {
                        return false;
                    }
                }

                if (product.SubDiamondAtrributeId != 0 && product.SubDiamondAtrributeId != null)
                {
                    var subDiamondUpdated = await UpdateSubDiamonds(product.SubDiamondAtrributeId.Value, product.SubDiamondAmount ?? 0, orderDetailId, increaseQuantities);
                    if (!subDiamondUpdated)
                    {
                        return false;
                    }
                }
            }

            return true;
        }


        private async Task<bool> UpdateMainDiamonds(int mainDiamondAttributeId, int mainDiamondAmount, int orderDetailId, bool increaseQuantities)
        {
            var diamonds = await _diamondRepository.GetDiamondsByAttributeIdAsync(mainDiamondAttributeId);
            var cancelOrderDiamondList = await _diamondRepository.GetDiamondsByAttributeIdForCancelAsync(mainDiamondAttributeId);

            if ((diamonds != null && diamonds.Any()) || (cancelOrderDiamondList != null && cancelOrderDiamondList.Any())) 
            {
                var updatedCount = 0;
                var diamondListToUpdate = increaseQuantities ? cancelOrderDiamondList : diamonds;

                foreach (var diamond in diamondListToUpdate)
                {
                    if (updatedCount >= mainDiamondAmount) break;
                    int? newOrderDetailId = increaseQuantities ? null : orderDetailId;

                    if (!increaseQuantities)
                    {
                        await _diamondRepository.UpdateMainDiamondOrderDetailId(newOrderDetailId, diamond.MainDiamondAtrributeId ?? 0);
                    }
                    else
                    {
                        await _diamondRepository.UpdateMainDiamondOrderDetailIdForCancel(orderDetailId, newOrderDetailId, diamond.MainDiamondAtrributeId ?? 0);
                    }
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


        public async Task<decimal> CalculateProductPriceAsync(CreateProductRequestDTO product)
        {
            //var product = await _productRepository.GetByIdAsync(productId);
            //if (product == null) throw new ArgumentException("Product not found", nameof(productId));

            decimal mainDiamondPrice = 0;
            decimal subDiamondPrice = 0;
            if (product.CategoryId == 10)
            {
                var mainDiamonds = await _diamondRepository.GetDiamondsByAttributeIdAsync(product.MainDiamondAttributeId.Value);
                var singleDiamond = mainDiamonds.FirstOrDefault(); //?
                if (singleDiamond != null)
                {
                    decimal totalMainDiamondPrice = singleDiamond.Price * (product.MainDiamondAmount);
                    mainDiamondPrice = totalMainDiamondPrice;
                }
                return mainDiamondPrice;
            }

            else
            {
                if (product.MainDiamondAttributeId.HasValue && product.MainDiamondAttributeId.Value != 0)
                {
                    var mainDiamonds = await _diamondRepository.GetDiamondsByAttributeIdAsync(product.MainDiamondAttributeId.Value);
                    var singleMainDiamond = mainDiamonds.FirstOrDefault();
                    if (singleMainDiamond != null)
                    {
                        decimal totalMainDiamondPrice = singleMainDiamond.Price * (product.MainDiamondAmount);
                        mainDiamondPrice = totalMainDiamondPrice;
                    }
                }

                if (product.SubDiamondAttributeId.HasValue && product.SubDiamondAttributeId.Value != 0)
                {
                    var subdiamond = await _subDiamondRepository.GetDiamondsByAttributeIdAsync(product.SubDiamondAttributeId.Value);
                    if (subdiamond != null)
                    {
                        decimal totalSubDiamondPrice = subdiamond.Price * (product.SubDiamondAmount);
                        subDiamondPrice = totalSubDiamondPrice;
                    }
                }

                decimal totalProductPrice = mainDiamondPrice + subDiamondPrice + product.LaborPrice;
                return totalProductPrice;
            }
        }

    }
}
