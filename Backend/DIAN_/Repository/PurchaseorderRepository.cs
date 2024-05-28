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

        public async Task<IEnumerable<PurchaseOrderDTO>> GetAllAsync()
        {
            return await _context.Purchaseorders               
                .Select(po => po.ToPurchaseOrderDTO())
                .ToListAsync();
        }

        public async Task<PurchaseOrderInfoDTO> GetInfoAsync(int orderId)
        {
            var order = await _context.Purchaseorders
                .Include(po => po.User)
                .Include(po => po.Promotion)
                .FirstOrDefaultAsync(po => po.OrderId == orderId);

            return order?.ToPurchaseOrderInfoDTO();
        }
        public async Task<PurchaseOrderDTO> CreateAsync(Purchaseorder order)
        {
            await _context.Purchaseorders.AddAsync(order);
            await _context.SaveChangesAsync();
            return order.ToPurchaseOrderDTO();
        }

        public async Task<PurchaseOrderDTO> UpdateAsync(Purchaseorder order)
        {
            _context.Purchaseorders.Update(order);
            await _context.SaveChangesAsync();
            return order.ToPurchaseOrderDTO();
        }
    }
}