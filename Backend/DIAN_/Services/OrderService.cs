using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DIAN_.DTOs.Account;
using DIAN_.DTOs.AccountDTO;
using DIAN_.DTOs.OrderDetailDto;
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

        public async Task<PurchaseOrderDetailDto> CreatePurchaseOrderAsync(CreatePurchaseOrderDTO orderDto)
        {
            var order = orderDto.ToCreatePurchaseOrder();

            // 1. Check for promotion
            Promotion promotion = null;

            if (!string.IsNullOrEmpty(orderDto.promotion?.Code))
            {
                var promotionId = await _promotionRepository.GetPromotionIdByCodeAsync(orderDto.promotion.Code);

                if (promotionId != 0)
                {
                    promotion = await _promotionRepository.GetPromotionByIdAsync(promotionId);

                    if (promotion != null && promotion.Status)
                    {
                        order.TotalPrice -= order.TotalPrice * promotion.Amount;
                        order.PromotionId = promotionId; // Assign the promotionId to the order
                    }
                }
            }

            // 2. Check for usePoint
            if (order.PayWithPoint == true)
            {
                var customer = await _customerRepository.GetByIdAsync(order.UserId);
                if (customer != null && customer.Points > 0)
                {
                    order.TotalPrice -= customer.Points.HasValue ? (decimal)customer.Points.Value : 0;
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

            //if (!salesStaff.Any() || !deliveryStaff.Any())
            //{
            //    throw new Exception("No sales or delivery staff available.");
            //} one sales staff or delivery staff can receive many orders at the same time => dont need check?

            var random = new Random();
            var randomSalesStaff = salesStaff[random.Next(salesStaff.Count)];
            var randomDeliveryStaff = deliveryStaff[random.Next(deliveryStaff.Count)];

            order.SaleStaff = randomSalesStaff.EmployeeId;
            order.DeliveryStaff = randomDeliveryStaff.EmployeeId;

            // 4. Submit orderDetail
            //foreach (var orderDetailDto in orderDetails)
            //{
            //    var orderDetail = new Orderdetail
            //    {
            //        OrderId = order.OrderId,
            //        LineTotal = orderDetailDto.LineTotal,
            //        ProductId = orderDetailDto.ProductId,
            //        ShellMaterialId = orderDetailDto.ShellMaterialId,
            //        SubDiamondId = orderDetailDto.SubDiamondId,
            //        Size = orderDetailDto.Size
            //    };

            //    var createdOrderDetail = await _orderDetailRepository.CreateAsync(orderDetail);
            //    if (createdOrderDetail == null)
            //    {
            //        throw new Exception("The order detail could not be created.");
            //    }
            //}

            var createdOrder = await _purchaseOrderRepository.CreatePurchaseOrderAsync(order);

            if (createdOrder == null)
            {
                throw new Exception("The order could not be created.");
            }

            return createdOrder.ToPurchaseOrderDetail();
        }

    }
}