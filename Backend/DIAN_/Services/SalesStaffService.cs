using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;

namespace DIAN_.Services
{
    public class SalesStaffService : ISalesStaffService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IWarrantyRepository _warrantyRepository;
        private readonly IDiamondRepository _diamondRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public SalesStaffService(IPurchaseOrderRepository purchaseOrderRepository, IOrderDetailRepository orderDetailRepository,
            IWarrantyRepository warrantyRepository, IDiamondRepository diamondRepository, IEmployeeRepository employeeRepository)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _orderDetailRepository = orderDetailRepository;
            _warrantyRepository = warrantyRepository;
            _diamondRepository = diamondRepository;
            _employeeRepository = employeeRepository;
        }

        public Task<string> GeneratePdfAsync(Diamond diamond)
        {
            throw new NotImplementedException();
        }

        public Task<bool> PrepareCertificate(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<Warranty> PrepareWarranty(int orderId)
        {
            throw new NotImplementedException();
        }

        public async Task<Purchaseorder> UpdateOrderStatus(string status, int orderId)
        {
            var order = await _purchaseOrderRepository.GetPurchasrOrderById(orderId);
            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            order.OrderStatus = status;

            var updatedOrder = await _purchaseOrderRepository.UpdatePurchaseOrderStatusAsync(orderId, status);
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

        public async Task<List<PurchaseOrderDTO>> ViewListOrdersByStatus(string status)
        {
            var orders = await _purchaseOrderRepository.GetPurchaseOrderStatusAsync(status);
            if (orders == null)
            {
                throw new Exception("No orders found with the given status.");
            }
            return orders.Select(orders => PurchaseOrderMapper.ToPurchaseOrderDTO(orders)).ToList();
        }
    }
}
