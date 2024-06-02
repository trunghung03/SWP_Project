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
using Microsoft.AspNetCore.Mvc;


namespace DIAN_.Services
{
    public class OrderService : IOrderService
    {
        private readonly IPromotionRepository _promotionRepository;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;

        public OrderService(IPromotionRepository promotionRepository, IPurchaseOrderRepository purchaseOrderRepository,
        ICustomerRepository customerRepository, IOrderDetailRepository orderDetailRepository)
        {
            _promotionRepository = promotionRepository;
            _purchaseOrderRepository = purchaseOrderRepository;
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
        }

        public async Task<ActionResult<PurchaseOrderDTO>> CreatePurchaseOrderInformation(CreatePurchaseOrderDTO createOrderDto)
        {
            var order = createOrderDto.ToCreatePurchaseOrder();

            Promotion promotion = null;
            if (order?.PromotionId != null)
            {
                promotion = await _promotionRepository.GetPromotionByIdAsync(order.PromotionId.Value);
            }
            if (promotion != null && promotion.Status)
            {
                createOrderDto.TotalPrice *= (1 - promotion.Amount);
            }

            if (order.PayWithPoint == true)
            {
                var customer = await _customerRepository.GetByIdAsync(createOrderDto.UserId);
                if (customer != null && customer.Points > 0)
                {
                    createOrderDto.TotalPrice -= customer.Points.HasValue ? (decimal)customer.Points.Value : 0;
                    customer.Points = 0;

                    UpdateCustomerPointDto customerDto = new UpdateCustomerPointDto
                    {
                        Point = 0
                    };

                    await _customerRepository.UpdateCustomerPoint(customer.CustomerId, customerDto);
                }
            }

            var createdOrder = await _purchaseOrderRepository.CreateAsync(order);

            if (createdOrder == null)
            {
                return new BadRequestObjectResult("The order could not be created.");
            }

            return createdOrder;
        }
        //public ActionResult<List<Orderdetail>> SubmitOrderDetails(int orderId)
        //{
        //    List<Orderdetail> createdOrderDetails = _orderDetailRepository.GetByOrderIdAsync(orderId).Result.ToList();
        //    foreach (var orderDetailDto in createdOrderDetails)
        //    {
        //        var orderDetail = new Orderdetail
        //        {
        //            OrderId = orderId,
        //            LineTotal = orderDetailDto.LineTotal,
        //            ProductId = orderDetailDto.ProductId,
        //            ShellMaterialId = orderDetailDto.ShellMaterialId,
        //            SubDiamondId = orderDetailDto.SubDiamondId,
        //            Size = orderDetailDto.Size
        //        };

        //        var createdOrderDetail = _orderDetailRepository.CreateAsync(orderDetail).Result;
        //        if (createdOrderDetail == null)
        //        {
        //            return new BadRequestObjectResult("The order detail could not be created.");
        //        }

        //        createdOrderDetails.Add(createdOrderDetail);
        //    }

        //    // Return the created order details
        //    return createdOrderDetails;
        //}

    }
}