using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class WarrantyRepository : IWarrantyRepository
    {

        private readonly ApplicationDbContext _context;
        public WarrantyRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<Warranty> CreateWarrantyAsync(Warranty warrantyModel)
        {
            await _context.Warranties.AddAsync(warrantyModel);
            await _context.SaveChangesAsync();
            return warrantyModel;
        }

        public async Task<Warranty?> DeleteWarrantyAsync(int id)
        {
            var existingWarranty = await _context.Warranties.FirstOrDefaultAsync(x => x.OrderDetailId == id);
            if (existingWarranty != null)
            {
                existingWarranty.Status = "Inactive";
                await _context.SaveChangesAsync();
                return existingWarranty;
            }
            return null;
        }

        public async Task<List<WarrantyDetailDto>> GetAllWarrantyAsync()
        {
            var warranties = await _context.Warranties
                .Where(w => w.Status == "Active" || w.Status == "Invalid")
           .Include(w => w.OrderDetail)
           .ThenInclude(od => od.Order)
           .ThenInclude(o => o.User)
           .Select(w => new WarrantyDetailDto
           {
               OrderDetailId = w.OrderDetailId,
               StartDate = w.StartDate,
               EndDate = w.EndDate,
               Status = w.Status,
               CustomerName = w.OrderDetail.Order.User.FirstName + " " + w.OrderDetail.Order.User.LastName
           })
           .ToListAsync();

            return warranties;
        }

        public async Task<string?> GetCustomerNameOfWarranty(Warranty warranty)
        {
            var orderDetail = await _context.Orderdetails
                .Include(od => od.Order)
                .ThenInclude(o => o.User)
                .FirstOrDefaultAsync(od => od.OrderDetailId == warranty.OrderDetailId);

            if (orderDetail == null || orderDetail.Order == null || orderDetail.Order.User == null)
            {
                return null;
            }

            var customerName = $"{orderDetail.Order.User.FirstName} {orderDetail.Order.User.LastName}";
            return customerName;
        }


        public async Task<Warranty?> GetWarrantyByIdAsync(int id)
        {
            var warranty = await _context.Warranties
                .FindAsync(id);

            if (warranty == null) { return null; }

            return warranty;
        }

        public async Task<Warranty?> UpdateWarrantyAsync(int id, Warranty warranty)
        {
            var existingWarranty = await _context.Warranties.FirstOrDefaultAsync(x => x.OrderDetailId == id);
            if (existingWarranty != null)
            {
                existingWarranty.Status = warranty.Status;
                await _context.SaveChangesAsync();
                return existingWarranty;
            }
            return null;
        }
    }
}