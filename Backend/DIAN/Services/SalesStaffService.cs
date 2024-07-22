using Castle.Core.Resource;
using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.DTOs.ShellDto;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System;
using System.Reflection;

namespace DIAN_.Services
{
    public class SalesStaffService : ISalesStaffService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IWarrantyRepository _warrantyRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IConnectionService _connectionService;
        private readonly INotificationRepository _notificationRepository;
        private readonly IHubContext<NotificationsHub> _hubContext;
        private readonly ILogger<SalesStaffService> _logger;
        private readonly IEmailService _emailService;
        private readonly IGoodsService _goodService;
        public SalesStaffService(IPurchaseOrderRepository purchaseOrderRepository, IOrderDetailRepository orderDetailRepository,
            IWarrantyRepository warrantyRepository, IEmployeeRepository employeeRepository,
            IHubContext<NotificationsHub> hubContext, ILogger<SalesStaffService> logger, IGoodsService goodsService,
            INotificationRepository notificationRepository, IConnectionService connectionService, IEmailService emailService, ICustomerRepository customerRepository)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
            _orderDetailRepository = orderDetailRepository;
            _warrantyRepository = warrantyRepository;
            _employeeRepository = employeeRepository;
            _hubContext = hubContext;
            _logger = logger;
            _notificationRepository = notificationRepository;
            _connectionService = connectionService;
            _emailService = emailService;
            _goodService = goodsService;
            _customerRepository = customerRepository;
        }

        public async Task<Purchaseorder> UpdateOrderStatus(string status, int orderId)
        {
            var order = await _purchaseOrderRepository.GetPurchasrOrderById(orderId);
            var customerEmail = await _customerRepository.GetCustomerEmail(order.UserId);
            if (order == null) throw new Exception("Order not found.");

            var updatedOrder = await _purchaseOrderRepository.UpdatePurchaseOrderStatusAsync(orderId, status);
            var customerConnectionId = _connectionService.GetConnectionId(order.UserId);
            var deliConnectionId = _connectionService.GetConnectionId(order.DeliveryStaff ?? 0);

            _logger.LogInformation($"customer Connection IDs: {customerConnectionId}");
            _logger.LogInformation($"deli Connection IDs: {deliConnectionId}");


            _logger.LogInformation("deli id: " + order.DeliveryStaff);
            if (customerConnectionId != null && customerConnectionId.Any())
            {

                await _hubContext.Clients.Client(NotificationsHub.GetConnectionIdForCustomer(order.UserId)).SendAsync("ReceiveNotification", $"Order {orderId} status updated to {status}.");
                await _notificationRepository.AddNotification(new Notification
                {
                    RecipientRole = "Customer",
                    RecipientId = order.UserId,
                    Message = $"Order {orderId} status updated to {status}.",
                    IsDelivered = false,
                    CreatedAt = DateTime.Now,
                });

            }
            else
            {
                var notification = new Notification
                {
                    RecipientRole = "Customer",
                    RecipientId = order.UserId,
                    Message = $"Order {orderId} status updated to {status}.",
                    IsDelivered = false,
                    CreatedAt = DateTime.Now,
                };
                await _notificationRepository.AddNotification(notification);
            }
            if (deliConnectionId != null && deliConnectionId.Any())
            {
                await _hubContext.Clients.Client(NotificationsHub.GetConnectionIdForDeliveryStaff(order.DeliveryStaff ?? 0)).SendAsync("ReceiveNotification", $"Order {orderId} status updated to {status}.");
                await _notificationRepository.AddNotification(new Notification
                {
                    RecipientRole = "DeliveryStaff",
                    RecipientId = order.DeliveryStaff ?? 0,
                    Message = $"Order {orderId} status updated to {status}.",
                    IsDelivered = true,
                    CreatedAt = DateTime.Now,
                });
            }
            else
            {
                var notification = new Notification
                {
                    RecipientRole = "DeliveryStaff",
                    RecipientId = order.DeliveryStaff ?? 0,
                    Message = $"Order {orderId} status updated to {status}.",
                    IsDelivered = true,
                    CreatedAt = DateTime.Now,
                };
                await _notificationRepository.AddNotification(notification);
            }

            if (status.Equals("Paid", StringComparison.OrdinalIgnoreCase))
            {
                var emailBody = await _emailService.GetEmailConfirmBody(order, "purchaseOrderEmail.html");
                var mailRequest = new MailRequest
                {
                    ToEmail = customerEmail,
                    Subject = "Confirm your order",
                    Body = emailBody
                };
                Console.WriteLine("send mail");
                await _emailService.SendEmailAsync(mailRequest);
            }
            if (status.Equals("Cancel", StringComparison.OrdinalIgnoreCase))
            {
                await _goodService.UpdateQuantitiesForOrder(orderId, true);
            }

                return updatedOrder;
        }

        public async Task<(List<PurchaseOrderDetailDto> Orders, int TotalCount)> ViewListOrdersAssign(int salesStaffId, PurchaseOrderQuerry querry)
        {
            var (orders, totalCount) = await _purchaseOrderRepository.GetListSalesOrderAssign(salesStaffId, querry);

            if (orders == null)
            {
                throw new Exception("You completed all orders");
            }

            var displayOrderDtos = orders.Select(order => PurchaseOrderMapper.ToPurchaseOrderDetail(order)).ToList();

            return (displayOrderDtos, totalCount);
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
