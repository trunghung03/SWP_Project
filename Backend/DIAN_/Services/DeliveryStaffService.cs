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

            var customerId = order.UserId;
            Console.WriteLine("customer id: " + customerId);

            if (status.Equals("Completed", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("price: " + order.TotalPrice);
                Console.WriteLine("status: " + status);
                var pointsToAdd = (int)(order.TotalPrice * (decimal)0.03);

                // Retrieve the current points for the customer
                var customer = await _customerRepository.GetByIdAsync(customerId);

                // Add the new points to the existing points
                var newTotalPoints = customer.Points + pointsToAdd;

                var updateCustomerPointDto = new UpdateCustomerPointDto
                {
                    CustomerId = customerId,
                    Point = newTotalPoints // Set the total new points
                };

                Console.WriteLine("point: " + pointsToAdd);
                await _customerRepository.UpdateCustomerPoint(customerId, updateCustomerPointDto);
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
