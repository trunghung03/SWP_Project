using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.Repository
{
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public PurchaseOrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Purchaseorder>> GetAllPurchaseOrderAsync()
        {
            var purchaseOrder = await _context.Purchaseorders.ToListAsync();
            return purchaseOrder;
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

        public async Task<List<Purchaseorder>> GetListSalesOrderAssign(int staffId)
        {
           var order = await _context.Purchaseorders.Where(po => po.SaleStaff == staffId).ToListAsync();
            return order;
        }

        public async Task<List<Purchaseorder>> GetListDeliOrderAssign(int staffId)
        {
            var order = await _context.Purchaseorders.Where(po => po.DeliveryStaff == staffId).ToListAsync();
            return order;
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
    }
}
