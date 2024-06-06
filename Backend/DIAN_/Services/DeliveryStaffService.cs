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
            var customerId = order.UserId;
            if (order == null)
            {
                throw new Exception("Order not found");
            }

            order.OrderStatus = status;
            if (order != null && order.OrderStatus == "Completed")
            {
                var points = (int)(order.TotalPrice * (decimal)0.03);
                var updateCustomerPointDto = new UpdateCustomerPointDto { 
                    CustomerId = customerId,
                    Point = points
                };
                await _customerRepository.UpdateCustomerPoint(order.UserId, updateCustomerPointDto);
            }
            var result = await _orderRepository.UpdatePurchaseOrderStatusAsync(orderId, status);
            return result;
        }

        //View list of delivery orders (get list is assigned)
        public async Task<List<PurchaseOrderDetailDto>> ViewListDeliveryOrders(int deliStaffId)
        {
            var orders = await _orderRepository.GetListDeliOrderAssign(deliStaffId);
            if (orders == null)
            {
                throw new Exception("You completed all orders");
            }
            var displayOrderDtos = orders.Select(order => PurchaseOrderMapper.ToPurchaseOrderDetail(order)).ToList();

            return displayOrderDtos;
        }
    }
}
