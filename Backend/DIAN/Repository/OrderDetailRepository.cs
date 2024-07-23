using DIAN_.DTOs.OrderDetailDto;
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
            if (!await _context.Shells.AnyAsync(s => s.ShellId == orderdetail.ShellId)) { return null; }
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
            if (!await _context.Shellmaterials.AnyAsync(s => s.ShellMaterialId == orderdetail.ShellId)) { return null; }

            updateDetail.OrderId = orderdetail.OrderId;
            updateDetail.LineTotal = orderdetail.LineTotal;
            updateDetail.ProductId = orderdetail.ProductId;

            updateDetail.ShellId = orderdetail.ShellId ?? null;
            updateDetail.Status = orderdetail.Status;

            await _context.SaveChangesAsync();
            return updateDetail;
        }

        public async Task<OrderBillDto?> ViewOrderBillAsync(int orderId)
        {
            var orderBill = await _context.Purchaseorders
                .Where(po => po.OrderId == orderId)
                .Include(po => po.User)
                .Include(po => po.Promotion)
                .Include(po => po.Orderdetails)
                    .ThenInclude(od => od.Product)
                .Include(po => po.Orderdetails)
                    .ThenInclude(od => od.Shell)
                .Include(po => po.Orderdetails)
                    .ThenInclude(od => od.Diamonds) 
                .Select(po => new OrderBillDto
                {
                    OrderId = po.OrderId,
                    UserId = po.UserId,
                    FirstName = po.User.FirstName,
                    LastName = po.User.LastName,
                    Email = po.User.Email,
                    PhoneNumber = po.PhoneNumber,
                    Address = po.ShippingAddress,
                    Note = po.Note,
                    PaymentMethod = po.PaymentMethod,
                    PayWithPoint = po.PayWithPoint,
                    TotalPrice = po.TotalPrice,
                    Date = po.Date,
                    OrderStatus = po.OrderStatus,
                    PromotionCode = po.Promotion != null ? po.Promotion.Code : null,
                    PromotionAmount = po.Promotion != null ? po.Promotion.Amount : null,
                    ProductDetails = po.Orderdetails.Select(od => new OrderBillProductDetailDto
                    {
                        MainDiamondId = od.Diamonds.Select(od => od.DiamondId).ToList(),
                        CertificateScans = od.Diamonds.Select(od => od.CertificateScan).ToList(),
                        ProductName = od.Product.Name,
                        ProductImageLink = od.Product.ImageLinkList,
                        ProductCode = od.Product.ProductCode,
                        ProductDescription = od.Product.Description,
                        Size = od.Shell != null ? od.Shell.Size ?? 0 : 0,
                        ShellMaterial = od.Shell != null ? od.Shell.ShellMaterial.Name : null,
                        LineTotal = od.LineTotal
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return orderBill;
        }

    }
}
