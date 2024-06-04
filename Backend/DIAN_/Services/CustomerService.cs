using DIAN_.DTOs.AccountDTO;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Models;

namespace DIAN_.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;

        public CustomerService(ICustomerRepository customerRepository, IOrderDetailRepository orderDetailRepository,
            IPurchaseOrderRepository purchaseOrderRepository)
        {
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
        }

        public async Task<PurchaseOrderDTO> ViewHistoryOrdersList(PurchaseOrderDTO purchaseOrderDTO)
        {
            var orders = await _customerRepository.GetByIdAsync(purchaseOrderDTO.UserId);
            // Map orders to PurchaseOrderDTO...

            return purchaseOrderDTO;
        }

        public async Task<Orderdetail> ViewOrderDetails(int orderId)
        {
            var orderDetails = await _orderDetailRepository.GetByIdAsync(orderId);
            return orderDetails;
        }

        public async Task<UpdateCustomerPointDto> AccumualatePoint(string status, int orderId)
        {
            // Implement logic to accumulate points based on order status and id...
            throw new NotImplementedException();
        }
    }
}
