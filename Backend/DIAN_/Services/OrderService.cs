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

        public async Task<PurchaseOrderDTO> CreatePurchaseOrderAsync(CreatePurchaseOrderDTO orderDto)
        {
            var order = orderDto.ToCreatePurchaseOrder();
            // Apply coupon again (for final submit?)
            if (!string.IsNullOrEmpty(orderDto.promotion?.Code))
            {
                order.TotalPrice = await ApplyCoupon(orderDto.promotion.Code, order.TotalPrice);
                var promotionId = await _promotionRepository.GetPromotionIdByCodeAsync(orderDto.promotion.Code);
                order.PromotionId = promotionId;
                // Update the promotion amount
                var promotion = await _promotionRepository.GetPromotionByIdAsync(promotionId);
                if(promotion != null && promotion.Amount > 0)
                {
                    var updatePromotionAmountDto = new UpdatePromotionAmountDto
                    {
                        Amount = promotion.Amount - 1
                    };
                    await _promotionRepository.UpdatePromotionAmount(promotionId, updatePromotionAmountDto);
                }
            }
            // 2. Check for usedPoint
            bool usedPoints = order.PayWithPoint.HasValue ? order.PayWithPoint.Value : false;

            if (usedPoints)
            {
                var customer = await _customerRepository.GetByIdAsync(order.UserId);
                if (customer != null && customer.Points > 0)
                {
                    order.TotalPrice = await CheckUsedPoints(order.UserId, order.TotalPrice, usedPoints);
                    customer.Points = 0;

                    UpdateCustomerPointDto customerDto = new UpdateCustomerPointDto
                    {
                        Point = 0
                    };

                    await _customerRepository.UpdateCustomerPoint(customer.CustomerId, customerDto);
                }
            }
            // 3. Assign staff
            var salesStaff = await _employeeRepository.GetEmployeeByRole("SalesStaff");
            var deliveryStaff = await _employeeRepository.GetEmployeeByRole("DeliveryStaff");

            var random = new Random();
            var randomSalesStaff = salesStaff[random.Next(salesStaff.Count)];
            var randomDeliveryStaff = deliveryStaff[random.Next(deliveryStaff.Count)];

            order.SaleStaff = randomSalesStaff.EmployeeId;
            order.DeliveryStaff = randomDeliveryStaff.EmployeeId;

            //convert to dto
            var createdOrder = await _purchaseOrderRepository.CreatePurchaseOrderAsync(order);

            if (createdOrder == null)
            {
                throw new Exception("The order could not be created.");
            }

            return createdOrder.ToPurchaseOrderDTO();
        }
        public async Task<decimal> ApplyCoupon(string couponCode, decimal totalPrice)
        {
            var promotionId = await _promotionRepository.GetPromotionIdByCodeAsync(couponCode);
            if (promotionId != 0)
            {
                var promotion = await _promotionRepository.GetPromotionByIdAsync(promotionId);
                if (promotion != null && promotion.Status)
                {
                    totalPrice -= totalPrice * promotion.Amount;
                }
            }
            return totalPrice;
        }

        public async Task<decimal> CheckUsedPoints(int userId, decimal totalPrice, bool usePoints)
        {
            if (usePoints)
            {
                var customer = await _customerRepository.GetByIdAsync(userId);
                if (customer != null && customer.Points > 0)
                {
                    totalPrice -= customer.Points.HasValue ? (decimal)customer.Points.Value : 0;
                }
            }
            return totalPrice;
        }
    }
}
