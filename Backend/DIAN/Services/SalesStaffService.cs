using Castle.Core.Resource;
using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;

namespace DIAN_.Services
{
    public class SalesStaffService : ISalesStaffService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IWarrantyRepository _warrantyRepository;
        private readonly IDiamondRepository _diamondRepository;
        private readonly IShellRepository _shellRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IHubContext<NotificationsHub> _hubContext;
        private readonly ILogger<SalesStaffService> _logger;
        public SalesStaffService(IPurchaseOrderRepository purchaseOrderRepository, IOrderDetailRepository orderDetailRepository,
            IWarrantyRepository warrantyRepository, IDiamondRepository diamondRepository, IEmployeeRepository employeeRepository,
            IHubContext<NotificationsHub> hubContext, ILogger<SalesStaffService> logger, IShellRepository shellRepository, IProductRepository productRepository)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _orderDetailRepository = orderDetailRepository;
            _warrantyRepository = warrantyRepository;
            _diamondRepository = diamondRepository;
            _employeeRepository = employeeRepository;
            _hubContext = hubContext;
            _logger = logger;
            _shellRepository = shellRepository;
            _productRepository = productRepository;
        }
        public async Task<bool> UpdateQuantitiesForOrder(string status, int orderId)
        {
            if (status.Equals("Delivering", StringComparison.OrdinalIgnoreCase))
            {
                var orderDetails = await _orderDetailRepository.GetByOrderIdAsync(orderId);
                if (orderDetails == null || !orderDetails.Any())
                {
                    return false;
                }

                foreach (var orderDetail in orderDetails)
                {
                    var product = await _productRepository.GetByIdAsync(orderDetail.ProductId);
                    if (product == null)
                    {
                        return false;
                    }
                    var shell = await _shellRepository.GetShellByIdAsync(orderDetail.ProductId);
                    if (shell != null)
                    {
                        var updateShellStockDto = new UpdateShellStock
                        {
                            Quantity = shell.AmountAvailable - 1
                        };
                        var updatedShell = updateShellStockDto.ToShellFromUpdateStockDto(shell.ShellId);
                        await _shellRepository.UpdateShellStockAsync(updatedShell, shell.ShellId);
                    }

                    if (product.MainDiamondId != null || product.SubDiamondId != null)
                    {
                        var mainDiamondAmount = product.MainDiamondAmount ?? 0;
                        var subDiamondAmount = product.SubDiamondAmount ?? 0;
                        var totalDiamondAmount = mainDiamondAmount + subDiamondAmount;

                        var diamond = await _diamondRepository.GetDiamondByIdAsync(orderDetail.ProductId);
                        if (diamond != null)
                        {
                            var updateDiamondStockDto = new UpdateDiamondStockDto
                            {
                                AmountAvailable = diamond.AmountAvailable - totalDiamondAmount
                            };
                            var updatedDiamond = updateDiamondStockDto.ToDiamondFromUpdateAmountAvailable(diamond.DiamondId);
                            await _diamondRepository.UpdateAmountAvailable(updatedDiamond, diamond.DiamondId);
                        }
                    }
                }
                return true;
            }
            return false;
        }

        public async Task<Purchaseorder> UpdateOrderStatus(string status, int orderId)
        {
            var order = await _purchaseOrderRepository.GetPurchasrOrderById(orderId);
            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            var updatedOrder = await _purchaseOrderRepository.UpdatePurchaseOrderStatusAsync(orderId, status);

            var orderDto = updatedOrder.ToPurchaseOrderDTO();
            return updatedOrder;
        }


        public async Task<List<PurchaseOrderDetailDto>> ViewListOrdersAssign(int salesStaffId)
        {
            var orders = await _purchaseOrderRepository.GetListSalesOrderAssign(salesStaffId);
            if (orders == null)
            {
                throw new Exception("You completed all orders");
            }
            var displayOrderDtos = orders.Select(order => PurchaseOrderMapper.ToPurchaseOrderDetail(order)).ToList();

            return displayOrderDtos;
        }

        public async Task<List<PurchaseOrderDetailDto>> ViewListOrdersByStatus(string status, int id)
        {
            var orders = await _purchaseOrderRepository.GetPurchaseOrderStatusAsync(status, id);
            if (orders == null)
            {
                throw new Exception("No orders found with the given status.");
            }
            return orders.Select(orders => PurchaseOrderMapper.ToPurchaseOrderDetail(orders)).ToList();
        }
        public async Task DeleteUnpaidOrdersOlderThan3Days()
        {
            var cutoffDate = DateTime.Now.AddDays(-3);
            var unpaidOrders = await _purchaseOrderRepository.GetUnpaidOrdersOlderThan(cutoffDate);
            foreach (var order in unpaidOrders)
            {
                await _purchaseOrderRepository.DeleteOrder(order.OrderId);
            }
        }

    }
}
