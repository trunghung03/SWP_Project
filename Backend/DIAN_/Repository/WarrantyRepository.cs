﻿using DIAN_.Interfaces;
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

        public async Task<Warranty?> DeleteWarrantyAsync(int id, Warranty warranty)
        {
            var existingWarranty = await _context.Warranties.FirstOrDefaultAsync(x => x.OrderDetailId == id);
            if (existingWarranty != null)
            {
                existingWarranty.Status = false;
                await _context.SaveChangesAsync();
                return existingWarranty;
            }
            return null;
        }

        public async Task<List<Warranty>> GetAllWarrantyAsync()
        {
            var warranties = await _context.Warranties.ToListAsync();

            return warranties;
        }

        public async Task<Warranty?> GetWarrantyByIdAsync(int id)
        {
            var warranty = await _context.Warranties.FirstOrDefaultAsync(c => c.OrderDetailId == id);

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
