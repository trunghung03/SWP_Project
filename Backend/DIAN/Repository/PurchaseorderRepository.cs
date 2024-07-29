using DIAN_.DTOs.PurchaseOrderDTOs;
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
            IQueryable<Purchaseorder> purchaseOrdersQuery = _context.Purchaseorders.AsQueryable();

            if (querry.Status != "default")
            {
                purchaseOrdersQuery = purchaseOrdersQuery.Where(po => po.OrderStatus == querry.Status);
            }
            if (!string.IsNullOrEmpty(querry.SearchTerm))
            {
                string lowerSearchTerm = querry.SearchTerm.ToLower();
                purchaseOrdersQuery = purchaseOrdersQuery.Where(d =>
                    d.OrderId.ToString().Equals(lowerSearchTerm) ||
                    d.Name.ToLower().Contains(lowerSearchTerm));
            }
            var totalItems = await purchaseOrdersQuery.CountAsync();

            // If neither PageNumber nor PageSize is provided, return all purchase orders without pagination
            if (!querry.PageNumber.HasValue && !querry.PageSize.HasValue)
            {
                var allOrders = await purchaseOrdersQuery.OrderBy(po => po.OrderId).ToListAsync();
                return (allOrders, allOrders.Count);
            }

            int pageSize = querry.PageSize ?? 6;
            int pageNumber = querry.PageNumber ?? 1;

            var skipNumber = (pageNumber - 1) * pageSize;
            var paginatedOrders = await purchaseOrdersQuery
                .Skip(skipNumber)
                .Take(pageSize)
                .ToListAsync();

            return (paginatedOrders, totalItems);
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

        public async Task<(List<Purchaseorder> Orders, int TotalCount)> GetListSalesOrderAssign(int staffId, PurchaseOrderQuerry query)
        {
            var ordersQuery = _context.Purchaseorders
                         .Where(po => po.SaleStaff == staffId);

            if (query.Status != "default")
            {
                ordersQuery = ordersQuery.Where(po => po.OrderStatus == query.Status);
            }

            var totalCount = await ordersQuery.CountAsync();

            int pageSize = query.PageSize ?? 6;
            int pageNumber = query.PageNumber ?? 1;

            var orders = await ordersQuery
                                .Skip((pageNumber - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();

            return (orders, totalCount);
        }

        public async Task<(List<Purchaseorder> Orders, int TotalCount)> GetListDeliOrderAssign(int staffId, PurchaseOrderQuerry query)
        {
            var ordersQuery = _context.Purchaseorders
                .Where(po => po.DeliveryStaff == staffId &&
                    (po.OrderStatus.ToLower() == "delivering"
                    || po.OrderStatus.ToLower() == "completed"));

            if (query.Status != "default")
            {
                ordersQuery = ordersQuery.Where(po => po.OrderStatus.ToLower() == query.Status.ToLower());
            }

            var totalCount = await ordersQuery.CountAsync();

            int pageSize = query.PageSize ?? 6;
            int pageNumber = query.PageNumber ?? 1;

            var orders = await ordersQuery
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
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
