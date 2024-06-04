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

        public async Task<bool> CompleteOrderAsync(int orderId)
        {
            var order = await _purchaseOrderRepository.GetPurchasrOrderById(orderId);
            if (order == null)
            {
                throw new Exception($"Order with id {orderId} not found.");
            }

            order.OrderStatus = "Success";
            var updatedOrder = await _purchaseOrderRepository.UpdateAsync(order);

            if (updatedOrder != null && updatedOrder.OrderStatus == "Success")
            {
                var points = (int)(updatedOrder.TotalPrice * (decimal)0.03);
                var customer = await _customerRepository.GetByIdAsync(updatedOrder.UserId);
                if (customer != null)
                {
                    customer.Points += points;
                    var updateCustomerPointDto = new UpdateCustomerPointDto { Point = customer.Points };
                    var updatedCustomer = await _customerRepository.UpdateCustomerPoint(customer.CustomerId, updateCustomerPointDto);
                    if (updatedCustomer != null)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        public async Task<ActionResult<PurchaseOrderDTO>> CreatePurchaseOrderAsync(CreatePurchaseOrderDTO createOrderDto)
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

        public Task<Purchaseorder> UpdatePurchaseOrderAsync(Purchaseorder order, int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<Purchaseorder> UpdatePurchaseOrderStatusAsync(int orderId, Purchaseorder statusDto)
        {
            throw new NotImplementedException();
        }

        Task<Purchaseorder> IOrderService.CreatePurchaseOrderAsync(CreatePurchaseOrderDTO createOrderDto)
        {
            throw new NotImplementedException();
        }
        //public async Task<bool> AssignEmployeeToOrderAsync(int orderId)
        //{
        //    var order = await _purchaseOrderRepository.GetPurchasrOrderById(orderId);
        //    if (order == null)
        //    {
        //        throw new Exception($"Order with id {orderId} not found.");
        //    }

        //    var employees = await _employeeRepository.GetAllAsync();
        //    if (employees == null || !employees.Any())
        //    {
        //        throw new Exception("No employees found.");
        //    }

        //    var random = new Random();
        //    var randomEmployee = employees[random.Next(employees.Count)];

        //   // order.EmployeeId = randomEmployee.EmployeeId;
        //    var updatedOrder = await _purchaseOrderRepository.UpdateAsync(order);

        //    return updatedOrder != null;
        //}



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