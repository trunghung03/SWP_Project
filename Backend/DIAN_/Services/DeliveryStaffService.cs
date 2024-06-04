using DIAN_.DTOs.AccountDTO;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Services
{
    public class DeliveryStaffService : IDeliveryStaffService
    {
        private readonly IPurchaseOrderRepository _orderRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICustomerRepository _customerRepository;
        public DeliveryStaffService(IPurchaseOrderRepository orderRepository, IEmployeeRepository employeeRepository,
            ICustomerRepository customerRepository)
        {
            _orderRepository = orderRepository;
            _employeeRepository = employeeRepository;
            _customerRepository = customerRepository;
        }

        public async Task<Purchaseorder> UpdateDeliveryStatus(string status, int orderId)
        {
            var order = await _orderRepository.GetPurchasrOrderById(orderId);
            if (order == null)
            {
                throw new Exception("Order not found");
            }

            order.OrderStatus = status;
            if (order != null && order.OrderStatus == "Completed")
            {
                var points = (int)(order.TotalPrice * (decimal)0.03);
                var updateCustomerPointDto = new UpdateCustomerPointDto { Point = points };
                await _customerRepository.UpdateCustomerPoint(order.UserId, updateCustomerPointDto);
            }
            var result = await _orderRepository.UpdatePurchaseOrderStatusAsync(orderId, status);
            return result;
        }

        public async Task<List<PurchaseOrderDetailDto>> ViewListDeliveryOrders(Purchaseorder purchaseOrderDTO)
        {
            if (purchaseOrderDTO.DeliveryStaff == null)
            {
                throw new ArgumentNullException(nameof(purchaseOrderDTO.DeliveryStaff));
            }

            var orders = await _orderRepository.GetAllPurchaseOrderAsync();
            var deliveryStaff = await _employeeRepository.GetByIdAsync(purchaseOrderDTO.DeliveryStaff.Value);

            if (deliveryStaff == null)
            {
                throw new Exception("Delivery staff not found");
            }

            var displayOrders = orders.Where(o => o.DeliveryStaff == purchaseOrderDTO.DeliveryStaff).ToList();

            var displayOrderDtos = displayOrders.Select(order => order.ToPurchaseOrderDetail()).ToList();

            return displayOrderDtos;

        }
    }
}
