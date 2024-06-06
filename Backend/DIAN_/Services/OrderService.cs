    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DIAN_.DTOs.Account;
using DIAN_.DTOs.AccountDTO;
using DIAN_.DTOs.OrderDetailDto;
using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DIAN_.Services
{
    public class OrderService : IOrderService
    {
        private readonly IPromotionRepository _promotionRepository;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public OrderService(IPromotionRepository promotionRepository, IPurchaseOrderRepository purchaseOrderRepository,
        ICustomerRepository customerRepository, IOrderDetailRepository orderDetailRepository, IEmployeeRepository employeeRepository)
        {
            _promotionRepository = promotionRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
            _employeeRepository = employeeRepository;
        }

        public PurchaseOrderDTO CreatePurchaseOrderAsync(CreatePurchaseOrderDTO orderDto, string promoCode)
        {
            var orderModel = orderDto.ToCreatePurchaseOrder();
            var promotion = _promotionRepository.GetPromotionByCodeAsync(promoCode).Result;
            if (promotion != null)
            {
                orderModel.TotalPrice -= promotion.Amount*orderModel.TotalPrice;
                orderModel.PromotionId = promotion.PromotionId;
                promotion.Amount -= 1;
                var updatePromotionAmountDto = new UpdatePromotionAmountDto
                {
                    Amount = promotion.Amount
                };
                _promotionRepository.UpdatePromotionAmount(promotion.PromotionId, updatePromotionAmountDto).Wait();
            }

            // 2. Check for usedPoint
            bool usedPoints = orderModel.PayWithPoint.HasValue ? orderModel.PayWithPoint.Value : false;

            if (usedPoints)
            {
                var customer = _customerRepository.GetByIdAsync(orderModel.UserId).Result;
                if (customer != null && customer.Points > 0)
                {
                    orderModel.TotalPrice -= customer.Points.HasValue ? (decimal)customer.Points.Value : 0;
                    UpdateCustomerPointDto customerDto = new UpdateCustomerPointDto
                    {
                        Point = 0
                    };

                    _customerRepository.UpdateCustomerPoint(customer.CustomerId, customerDto).Wait();
                }
            }
            // 3. Assign staff
            var salesStaff = _employeeRepository.GetEmployeeByRole("SalesStaff").Result;
            var deliveryStaff = _employeeRepository.GetEmployeeByRole("DeliveryStaff").Result;

            var random = new Random();
            var randomSalesStaff = salesStaff[random.Next(salesStaff.Count)];
            var randomDeliveryStaff = deliveryStaff[random.Next(deliveryStaff.Count)];

            orderModel.SaleStaff = randomSalesStaff.EmployeeId;
            orderModel.DeliveryStaff = randomDeliveryStaff.EmployeeId;

            var orderToDto = _purchaseOrderRepository.CreatePurchaseOrderAsync(orderModel).Result;

            //convert to dto
            return orderToDto.ToPurchaseOrderDTO();
        }

        public async Task<decimal> ApplyCoupon(string couponCode) //not checkout yet, getPromoCodeAmount
        {
            var promotion = await _promotionRepository.GetPromotionByCodeAsync(couponCode);
            if (promotion == null)
            {
                return 0;
            }
            else
            {
                if (promotion.Status)
                {
                    return promotion.Amount;
                }
            }
            return 0;
        }
        public async Task<decimal> CheckUsedPoints(int userId, decimal totalPrice, bool usePoints)
        {
            if (usePoints)
            {
                var customer = await _customerRepository.GetByIdAsync(userId);
                if (customer != null && customer.Points > 0)
                {
                    totalPrice -= customer.Points.HasValue ? (decimal)customer.Points.Value : 0;
                    UpdateCustomerPointDto customerDto = new UpdateCustomerPointDto
                    {
                        Point = 0
                    };

                    _customerRepository.UpdateCustomerPoint(customer.CustomerId, customerDto).Wait();
                }
            }
            return totalPrice;
        }

        public Task<decimal> ApplyCoupon(string couponCode, decimal totalPrice)
        {
            throw new NotImplementedException();
        }
    }
}
