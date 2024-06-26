﻿using Castle.Core.Resource;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;

namespace DIAN_.Services
{
    public class SalesStaffService : ISalesStaffService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IWarrantyRepository _warrantyRepository;
        private readonly IDiamondRepository _diamondRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IHubContext<NotificationsHub> _hubContext;
        private readonly ILogger<SalesStaffService> _logger;
        public SalesStaffService(IPurchaseOrderRepository purchaseOrderRepository, IOrderDetailRepository orderDetailRepository,
            IWarrantyRepository warrantyRepository, IDiamondRepository diamondRepository, IEmployeeRepository employeeRepository,
            IHubContext<NotificationsHub> hubContext, ILogger<SalesStaffService> logger)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _orderDetailRepository = orderDetailRepository;
            _warrantyRepository = warrantyRepository;
            _diamondRepository = diamondRepository;
            _employeeRepository = employeeRepository;
            _hubContext = hubContext;
            _logger = logger;
        }

        public async Task<Purchaseorder> UpdateOrderStatus(string status, int orderId)
        {
            var order = await _purchaseOrderRepository.GetPurchasrOrderById(orderId);
            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            //order.OrderStatus = status;

            var updatedOrder = await _purchaseOrderRepository.UpdatePurchaseOrderStatusAsync(orderId, status);
            var connectionId = NotificationsHub.GetConnectionIdForCustomer(order.UserId);
            if (connectionId != null)
            {
                _logger.LogInformation("start notify customer");
                _logger.LogInformation("Excuting {SaleStaffService} {orderId}", nameof(SalesStaffService), status);
                _logger.LogInformation("end notify customer");
                await _hubContext.Clients.Client(connectionId).SendAsync("ReceiveNotification", $"Order {orderId} status updated to {status}.");
                
            }
            return updatedOrder;
        }

        public async Task<List<PurchaseOrderDetailDto>> ViewListOrdersAssign(int salesStaffId)
        {
            var orders = await _purchaseOrderRepository.GetListSalesOrderAssign(salesStaffId);
            if (orders == null)
            {
                throw new Exception("You completed all orders");
            }
            var displayOrderDtos = orders.Select(order => PurchaseOrderMapper.ToPurchaseOrderDetail(order)).ToList();

            return displayOrderDtos;
        }

        public async Task<List<PurchaseOrderDetailDto>> ViewListOrdersByStatus(string status, int id)
        {
            var orders = await _purchaseOrderRepository.GetPurchaseOrderStatusAsync(status, id);
            if (orders == null)
            {
                throw new Exception("No orders found with the given status.");
            }
            return orders.Select(orders => PurchaseOrderMapper.ToPurchaseOrderDetail(orders)).ToList();
        }
        public async Task DeleteUnpaidOrdersOlderThan3Days()
        {
            var cutoffDate = DateTime.Now.AddDays(-3);
            var unpaidOrders = await _purchaseOrderRepository.GetUnpaidOrdersOlderThan(cutoffDate);
            foreach (var order in unpaidOrders)
            {
                await _purchaseOrderRepository.DeleteOrder(order.OrderId);
            }
        }


    }
}
