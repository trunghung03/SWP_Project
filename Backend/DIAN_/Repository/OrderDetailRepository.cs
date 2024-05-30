using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly ApplicationDbContext _context;
        public OrderDetailRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Orderdetail?> CreateAsync(Orderdetail orderdetail)
        {
            if (!await _context.Purchaseorders.AnyAsync(o => o.OrderId == orderdetail.OrderId)) { return null; }
            if (!await _context.Shellmaterials.AnyAsync(s => s.ShellMaterialId == orderdetail.ShellMaterialId)) { return null; }
            if (!await _context.Diamonds.AnyAsync(s => s.DiamondId == orderdetail.SubDiamondId)) { return null; }
            await _context.AddAsync(orderdetail);
            await _context.SaveChangesAsync();
            return orderdetail;
        }

        public async Task<Orderdetail?> DeleteAsync(int id)
        {
            var detail = await _context.Orderdetails.FirstOrDefaultAsync(d => d.OrderDetailId == id);
            if (detail == null) { return null; }

            _context.Orderdetails.Remove(detail);
            await _context.SaveChangesAsync();

            return detail;
        }

        public async Task<List<Orderdetail>> GetAllAsync()
        {
            return await _context.Orderdetails.ToListAsync();
        }

        public async Task<Orderdetail?> GetByIdAsync(int id)
        {
            var detail = await _context.Orderdetails.FirstOrDefaultAsync(d => d.OrderDetailId == id);
            if (detail == null) { return null; }
            return detail;
        }
        public async Task<List<Orderdetail>?> GetByOrderIdAsync(int id)
        {
            var order = await _context.Orderdetails.Where(d => d.OrderId == id).ToListAsync();
            if (order == null) { return null; }

            return order;
        }

        public async Task<Orderdetail?> UpdateAsync(Orderdetail orderdetail, int id)
        {
            var updateDetail = await _context.Orderdetails.FirstOrDefaultAsync(o => o.OrderDetailId == id);
            if (updateDetail == null) { return null; }
            if (!await _context.Purchaseorders.AnyAsync(o => o.OrderId == orderdetail.OrderId)) { return null; }
            if (!await _context.Shellmaterials.AnyAsync(s => s.ShellMaterialId == orderdetail.ShellMaterialId)) { return null; }
            if (!await _context.Diamonds.AnyAsync(s => s.DiamondId == orderdetail.SubDiamondId)) { return null; }

            // Assuming updateDetail and orderdetail are instances of the same class
            updateDetail.OrderId = orderdetail.OrderId;
            updateDetail.LineTotal = orderdetail.LineTotal;
            updateDetail.ProductId = orderdetail.ProductId;

            // Copying nullable properties
            updateDetail.ShellMaterialId = orderdetail.ShellMaterialId ?? null;
            updateDetail.SubDiamondId = orderdetail.SubDiamondId ?? null;
            updateDetail.Size = orderdetail.Size ?? null;

            // Copying non-nullable property
            updateDetail.Status = orderdetail.Status;

            await _context.SaveChangesAsync();
            return updateDetail;
        }
    }
}
