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
                existingPurchaseOrder.UserId = order.UserId;
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

        public async Task<Purchaseorder> UpdatePurchaseOrderStatusAsync(int orderId, Purchaseorder statusDto)
        {
            var order = await _context.Purchaseorders.FirstOrDefaultAsync(po => po.OrderId == orderId);
            if (order == null)
            {
                throw new Exception($"Order with id {orderId} not found.");
            }
            order.OrderStatus = statusDto.OrderStatus;
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<List<Purchaseorder>> GetPurchaseOrderStatusAsync(string status)
        {
            var orders = await _context.Purchaseorders.Where(po => po.OrderStatus == status).ToListAsync();
            return orders;
        }

        ////parameter is Purchaseorder or UpdateStaffDto?
        //public async Task<Purchaseorder> AssignStaff(int orderId, Purchaseorder order)
        //{
        //   var existingPurchaseOrder = await _context.Purchaseorders.FirstOrDefaultAsync(po => po.OrderId == orderId);
        //    if (existingPurchaseOrder == null)
        //    {
        //        throw new Exception($"Order with id {orderId} not found.");
        //    }
        //    existingPurchaseOrder.DeliveryStaff = order.DeliveryStaff;
        //    existingPurchaseOrder.SaleStaff = order.SaleStaff;
        //    await _context.SaveChangesAsync();
        //    return existingPurchaseOrder;
        //}
    }
}