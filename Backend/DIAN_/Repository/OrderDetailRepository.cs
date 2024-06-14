using DIAN_.DTOs.OrderDetailDto;
using DIAN_.DTOs.ProductDTOs;
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
        public async Task<List<OrderBillDto>> ViewOrderBillAsync(int orderId)
        {
            var orderBills = await _context.Purchaseorders
                .Where(po => po.OrderId == orderId)
                .SelectMany(po => po.Orderdetails, (po, od) => new { po, od })
                .SelectMany(
                    combined => _context.Products.Where(p => p.ProductId == combined.od.ProductId),
                    (combined, p) => new { combined.po, combined.od, p })
                .SelectMany(
                    combined => _context.Diamonds.Where(d => d.DiamondId == combined.p.MainDiamondId).DefaultIfEmpty(),
                    (combined, d) => new { combined.po, combined.od, combined.p, d })
                .GroupBy(x => x.po.OrderId)
                .Select(g => new OrderBillDto
                {
                    OrderId = orderId,
                    UserId = g.First().po.UserId,
                    FirstName = g.First().po.User.FirstName,
                    LastName = g.First().po.User.LastName,
                    PhoneNumber = g.First().po.User.PhoneNumber,
                    Address = g.First().po.User.Address,
                    Note = g.First().po.Note,
                    PaymentMethod = g.First().po.PaymentMethod,
                    PayWithPoint = g.First().po.PayWithPoint,
                    TotalPrice = g.First().po.TotalPrice,
                    Date = g.First().po.Date,
                    OrderStatus = g.First().po.OrderStatus,
                    PromotionCode = g.First().po.Promotion.Code,
                    PromotionAmount = g.First().po.Promotion.Amount,
                    ProductDetails = g.Select(x => new OrderBillProductDetailDto
                    {
                        ProductName = x.p.Name,
                        ProductImageLink = x.p.ImageLinkList,
                        ProductCode = x.p.ProductCode,
                        ProductDescription = x.p.Description,
                        Size = x.od.Size ?? 0m,
                        LineTotal = x.od.LineTotal,
                        CertificateScan = x.d.CertificateScan,
                        WarrantyStartDate = x.od.Warranty.StartDate,
                        WarrantyEndDate = x.od.Warranty.EndDate,
                    }).ToList()
                }).ToListAsync();

            return orderBills; // This should now correctly indicate a non-nullable return type
        }



    }
}
