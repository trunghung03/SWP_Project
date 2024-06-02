using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class DiamondRepository : IDiamondRepository
    {
        private readonly ApplicationDbContext _context;
        public DiamondRepository(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task<Diamond> AddDiamondAsync(Diamond diamond)
        {
            await _context.Diamonds.AddAsync(diamond);
            await _context.SaveChangesAsync();
            return diamond;
        }

        public async Task<Diamond?> DeleteDiamondAsync(int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.Status = false;
                await _context.SaveChangesAsync();
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }

        public async Task<List<Diamond>> GetAllDiamondsAsync()
        {
            return await _context.Diamonds
               .Where(s => s.Status)
               .ToListAsync();
        }

        public async Task<Diamond?> GetDiamondByIdAsync(int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond == null)
            {
                throw new KeyNotFoundException("Diamond does not exist");
            }
            return existingDiamond;
        }

        public async Task<Diamond?> UpdateDiamondAsync(Diamond diamondModel, int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.Color = diamondModel.Color;
                existingDiamond.Clarity = diamondModel.Clarity;
                existingDiamond.Cut = diamondModel.Cut;
                existingDiamond.Carat = diamondModel.Carat;
                existingDiamond.Cost = diamondModel.Cost;
                existingDiamond.CertificateScan = diamondModel.CertificateScan;
                existingDiamond.AmountAvailable = diamondModel.AmountAvailable;
                existingDiamond.Status = diamondModel.Status;
                await _context.SaveChangesAsync();
                return existingDiamond;
            }
            throw new KeyNotFoundException("Diamond does not exist");
        }
    }
}
