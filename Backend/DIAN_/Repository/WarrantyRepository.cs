using DIAN_.DTOs.WarrantyDTOs;
using DIAN_.Interfaces;
using DIAN_.Models;
using DIAN_.Mapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.Repository
{
    public class WarrantyRepository : IWarrantyRepository
    {
        private readonly ApplicationDbContext _context;

        public WarrantyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WarrantyDTO>> GetAllAsync()
        {
            return await _context.Warranties
                .Select(w => w.ToWarrantyDTO())
                .ToListAsync();
        }

        public async Task<WarrantyDTO> GetByIdAsync(int id)
        {
            var warranty = await _context.Warranties.FindAsync(id);
            return warranty?.ToWarrantyDTO();
        }

        public async Task<WarrantyDTO> CreateAsync(Warranty warranty)
        {
            await _context.Warranties.AddAsync(warranty);
            await _context.SaveChangesAsync();
            return warranty.ToWarrantyDTO();
        }

        public async Task<WarrantyDTO> UpdateAsync(Warranty warranty)
        {
            _context.Warranties.Update(warranty);
            await _context.SaveChangesAsync();
            return warranty.ToWarrantyDTO();
        }

        public async Task DeleteAsync(int id)
        {
            var warranty = await _context.Warranties.FindAsync(id);
            if (warranty != null)
            {
                warranty.Status = false;
                await _context.SaveChangesAsync();
            }
        }
    }
}
