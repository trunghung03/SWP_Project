﻿using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DIAN_.Helper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Castle.Core.Resource;

namespace DIAN_.Repository
{
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public PurchaseOrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(List<Purchaseorder> Orders, int TotalCount)> GetAllPurchaseOrderAsync(PurchaseOrderQuerry querry)
        {
            var purchaseOrders = _context.Purchaseorders.AsQueryable();

            if (querry.Status != "default")
            {
                purchaseOrders = purchaseOrders.Where(po => po.OrderStatus == querry.Status);
            }

            var totalCount = await purchaseOrders.CountAsync();

            var paginatedOrders = await purchaseOrders
                .Skip((querry.PageNumber - 1) * querry.PageSize)
                .Take(querry.PageSize)
                .ToListAsync();

            return (paginatedOrders, totalCount);
        }

        public async Task<Purchaseorder> GetPurchaseOrderInfoAsync(int orderId)
        {
            var order = await _context.Purchaseorders
                .Include(po => po.User)
                .Include(po => po.Promotion)
                .FirstOrDefaultAsync(po => po.OrderId == orderId);

            if (order == null)
            {
                throw new Exception($"Order with id {orderId} not found.");
            }

            return order;
        }
        public async Task<Purchaseorder> CreatePurchaseOrderAsync(Purchaseorder order)
        {
            await _context.Purchaseorders.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        // update may not nescessary
        public async Task<Purchaseorder> UpdatePurchaseOrderAsync(Purchaseorder order, int orderId)
        {
            var existingPurchaseOrder = await _context.Purchaseorders.FirstOrDefaultAsync(po => po.OrderId == orderId);
            if (existingPurchaseOrder == null)
            {
                throw new Exception($"Order with id {orderId} not found.");
            }
            else
            {
                existingPurchaseOrder.Date = order.Date;
                existingPurchaseOrder.Name = order.Name;
                existingPurchaseOrder.PhoneNumber = order.PhoneNumber;
                existingPurchaseOrder.PaymentMethod = order.PaymentMethod;
                existingPurchaseOrder.ShippingAddress = order.ShippingAddress;
                existingPurchaseOrder.TotalPrice = order.TotalPrice;
                existingPurchaseOrder.OrderStatus = order.OrderStatus;
                existingPurchaseOrder.PromotionId = order.PromotionId;
                existingPurchaseOrder.PayWithPoint = order.PayWithPoint;
                existingPurchaseOrder.Note = order.Note;
                existingPurchaseOrder.SaleStaff = order.SaleStaff;
                existingPurchaseOrder.DeliveryStaff = order.DeliveryStaff;
                await _context.SaveChangesAsync();
                return existingPurchaseOrder;
            }
        }

        public async Task<Purchaseorder> GetPurchasrOrderById(int purchasrId)
        {
            var order = _context.Purchaseorders.FirstOrDefault(po => po.OrderId == purchasrId);
            if (order == null)
            {
                throw new Exception($"Order with id {purchasrId} not found.");
            }
            return order;
        }

        public async Task<List<Purchaseorder>> GetPurchaseOrderStatusAsync(string status, int employeeId)
        {
            var orders = await _context.Purchaseorders
                                       .Where(po => po.OrderStatus.ToLower() == status.ToLower() && po.SaleStaff == employeeId)
                                       .ToListAsync();
            return orders;
        }


        public async Task<Purchaseorder> UpdatePurchaseOrderStatusAsync(int orderId, string status)
        {
            var order = await _context.Purchaseorders.FirstOrDefaultAsync(po => po.OrderId == orderId);
            if (order == null)
            {
                throw new Exception($"Order with id {orderId} not found.");
            }
            order.OrderStatus = status;
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<(List<Purchaseorder> Orders, int TotalCount)> GetListSalesOrderAssign(int staffId, PurchaseOrderQuerry querry)
        {
            var query = _context.Purchaseorders
                         .Where(po => po.SaleStaff == staffId);

            if (querry.Status != "default")
            {
                query = query.Where(po => po.OrderStatus == querry.Status);
            }

            var totalCount = await query.CountAsync();

            var orders = await query
                                .Skip((querry.PageNumber - 1) * querry.PageSize)
                                .Take(querry.PageSize)
                                .ToListAsync();

            return (orders, totalCount);
        }

        public async Task<(List<Purchaseorder> Orders, int TotalCount)> GetListDeliOrderAssign(int staffId, PurchaseOrderQuerry querry)
        {
            var query = _context.Purchaseorders
                .Where(po => po.DeliveryStaff == staffId &&
                    (po.OrderStatus.ToLower() == "delivering"
                    || po.OrderStatus.ToLower() == "completed"
                    || po.OrderStatus.ToLower() == "preparing"
                    || po.OrderStatus.ToLower() == "cancelled"));

            if (querry.Status != "default")
            {
                query = query.Where(po => po.OrderStatus.ToLower() == querry.Status.ToLower());
            }

            var totalCount = await query.CountAsync();

            var orders = await query
                .Skip((querry.PageNumber - 1) * querry.PageSize)
                .Take(querry.PageSize)
                .ToListAsync();

            return (orders, totalCount);
        }

        public async Task<Purchaseorder?> CheckUsedPoint(bool payWithPoint, int userId)
        {
            if (payWithPoint)
            {
                return await _context.Purchaseorders
                    .Where(o => o.UserId == userId)
                    .FirstOrDefaultAsync();
            }
            return null;
        }

        public async Task<List<Purchaseorder>> DeliveryGetPurchaseOrderStatusAsync(string status, int id)
        {
            var orders = await _context.Purchaseorders
                                      .Where(po => po.OrderStatus.ToLower() == status.ToLower() && po.DeliveryStaff == id)
                                      .ToListAsync();
            return orders;
        }

        public async Task<List<Purchaseorder>> GetUnpaidOrdersOlderThan(DateTime cutoffDate)
        {
            return await _context.Purchaseorders
                .Where(po => po.Date < cutoffDate && po.OrderStatus == "Unpaid")
                .ToListAsync();
        }
        public async Task<Purchaseorder?> DeleteOrder(int orderid)
        {
            var order = await _context.Purchaseorders.FirstOrDefaultAsync(po => po.OrderId == orderid);
            if (order == null)
            {
                throw new Exception($"Order with id {orderid} not found.");
            }
            _context.Purchaseorders.Remove(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<IEnumerable<Purchaseorder>> GetOrdersForCusAsync(int customerId)
        {
            return await _context.Purchaseorders
                                 .Include(o => o.User) // Include related entities if needed
                                 .Include(o => o.Promotion)
                                 .Where(o => o.UserId == customerId)
                                 .ToListAsync();
        }

        public async Task<List<Purchaseorder>> SearchOrderAsync(PurchaseOrderSearch search)
        {
            var query = _context.Purchaseorders.Include(po => po.Promotion).AsQueryable();
            if (!string.IsNullOrEmpty(search.Query))
            {
                string queryStr = search.Query.ToLower();
                query = query.Where(po => po.OrderId.ToString().Equals(queryStr) ||
                                          po.Name.ToLower().Contains(queryStr) ||
                                          po.Promotion.Name.ToLower().Contains(queryStr) ||
                                          po.OrderStatus.ToLower().Contains(queryStr));

            }
            return await query.ToListAsync();
        }
    }
}
