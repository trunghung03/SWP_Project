using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.Repository
{
    public class DiamondRepository : IDiamondRepository
    {
        private readonly ApplicationDbContext _context;

        public DiamondRepository(ApplicationDbContext context)
        {
            _context = context;
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

        public async Task<(List<Diamond>, int)> GetAllDiamondsAsync(DiamondQuery query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var diamonds = await _context.Diamonds
                .Where(s => s.Status)
                .Skip(skipNumber)
                .Take(query.PageSize)
                .ToListAsync();

            var totalCount = await _context.Diamonds.CountAsync(s => s.Status);

            return (diamonds, totalCount);
        }


        public async Task<Diamond?> GetDiamondByIdAsync(int id)
        {
            var existingDiamond = await _context.Diamonds
                .Where(s => s.Status)
                .FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond == null)
            {
                throw new KeyNotFoundException("Diamond does not exist");
            }
            return existingDiamond;
        }

        public Task<List<Diamond>> GetDiamondByShapeAsync(string shape)
        {
            var diamonds = _context.Diamonds
                .Where(s => s.Status)
                .Where(x => x.Shape.Contains(shape)).ToListAsync();
            if (diamonds == null)
            {
                throw new KeyNotFoundException("Diamond does not exist");
            }
            return diamonds;
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
