using DIAN_.DTOs.AccountDTO;
using DIAN_.Interfaces;

namespace DIAN_.Services
{
    public class PointAccumulateService : IPointAccumulateService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly ICustomerRepository _customerRepository;

        public PointAccumulateService(IPurchaseOrderRepository purchaseOrderRepository, ICustomerRepository customerRepository)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _customerRepository = customerRepository;
        }

        public async Task AccumulatePointsAsync(int orderId)
        {
            var order = await _purchaseOrderRepository.GetPurchasrOrderById(orderId);
            if (order != null && order.OrderStatus == "Success")
            {
                var points = (int)(order.TotalPrice * (decimal)0.03);
                var updateCustomerPointDto = new UpdateCustomerPointDto { Point = points };
                await _customerRepository.UpdateCustomerPoint(order.UserId, updateCustomerPointDto);
            }
        }
    }
}
