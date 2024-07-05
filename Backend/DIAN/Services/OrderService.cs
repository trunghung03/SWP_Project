using DIAN_.DTOs.AccountDTO;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;


namespace DIAN_.Services
{
    public class OrderService : IOrderService
    {
        private readonly IPromotionRepository _promotionRepository;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IVnPayService _vnPayService;

        public OrderService(IPromotionRepository promotionRepository, IPurchaseOrderRepository purchaseOrderRepository,
        ICustomerRepository customerRepository, IOrderDetailRepository orderDetailRepository, 
        IEmployeeRepository employeeRepository, IVnPayService vnPayService)
        {
            _promotionRepository = promotionRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
            _employeeRepository = employeeRepository;
            _vnPayService = vnPayService;
        }

        public PurchaseOrderDTO CreatePurchaseOrderAsync(CreatePurchaseOrderDTO orderDto, string promoCode)
        {
            var orderModel = orderDto.ToCreatePurchaseOrder();
            var promotion = _promotionRepository.GetPromotionByCodeAsync(promoCode).Result;
            if (promotion != null && promotion.Status)
            {
                orderModel.TotalPrice -= promotion.Amount * orderModel.TotalPrice;
                orderModel.PromotionId = promotion.PromotionId;
            }
            else { orderModel.PromotionId = null; }

            bool usedPoints = orderModel.PayWithPoint.HasValue ? orderModel.PayWithPoint.Value : false;

            if (usedPoints)
            {
                var customer = _customerRepository.GetByIdAsync(orderModel.UserId).Result;
                if (customer != null && customer.Points > 0)
                {
                    var pointsValue = customer.Points.HasValue ? (decimal)customer.Points.Value : 0;
                    decimal pointRemaining = 0;
                    if (pointsValue >= orderModel.TotalPrice)
                    {                   
                        pointRemaining = pointsValue - orderModel.TotalPrice;
                        orderModel.TotalPrice = 0;
                    }
                    else
                    {
                        orderModel.TotalPrice -= pointsValue;
                        pointRemaining = 0;
                    }

                    UpdateCustomerPointDto customerDto = new UpdateCustomerPointDto
                    {
                        Point = (int)pointRemaining
                    };

                    _customerRepository.UpdateCustomerPoint(customer.CustomerId, customerDto).Wait();
                }
            }
            var salesStaff = _employeeRepository.GetEmployeeByRole("SalesStaff").Result;
            var deliveryStaff = _employeeRepository.GetEmployeeByRole("DeliveryStaff").Result;

            var random = new Random();
            var randomSalesStaff = salesStaff[random.Next(salesStaff.Count)];
            var randomDeliveryStaff = deliveryStaff[random.Next(deliveryStaff.Count)];

            orderModel.SaleStaff = randomSalesStaff.EmployeeId;
            orderModel.DeliveryStaff = randomDeliveryStaff.EmployeeId;

            var orderToDto = _purchaseOrderRepository.CreatePurchaseOrderAsync(orderModel).Result;

            return orderToDto.ToPurchaseOrderDTO();
        }

    }
}