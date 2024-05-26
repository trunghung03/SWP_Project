using DIAN_.Helper;
using DIAN_.Interfaces;
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

        public async Task<Diamond?> DeleteDiamondAsync(int id, Diamond diamondModel)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.Status = false;
                await _context.SaveChangesAsync();
                return existingDiamond;
            }
            return null;
        }

        public async Task<List<Diamond>> GetAllDiamondsAsync(DiamondQuery diamondQuery)
        {

            var diamond = _context.Diamonds.AsQueryable();

            if (!string.IsNullOrWhiteSpace(diamondQuery.Name))
            {
                diamond = diamond.Where(x => x.Name.Contains(diamondQuery.Name));
            }

            if (diamondQuery.Cost.HasValue)
            {
                diamond = diamond.Where(x => x.Cost == diamondQuery.Cost.Value);
            }
            switch (diamondQuery.SortBy)
            {
                case "Name":
                    diamond = diamondQuery.Ascending ? diamond.OrderBy(x => x.Name) : diamond.OrderByDescending(x => x.Name);
                    break;
                case "Cost":
                    diamond = diamondQuery.Ascending ? diamond.OrderBy(x => x.Cost) : diamond.OrderByDescending(x => x.Cost);
                    break;
            }
            return await diamond.ToListAsync();


        }

        public async Task<Diamond?> GetDiamondByIdAsync(int id)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond == null)
            {
                return null;
            }
            return existingDiamond;
        }

        public async Task<Diamond?> UpdateDiamondAsync(int id, Diamond diamondModel)
        {
            var existingDiamond = await _context.Diamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingDiamond != null)
            {
                existingDiamond.Name = diamondModel.Name;
                //existingDiamond.Color = diamondModel.Color;
                //existingDiamond.Clarity = diamondModel.Clarity;
                //existingDiamond.Cut = diamondModel.Cut;
                //existingDiamond.Carat = diamondModel.Carat;
                existingDiamond.Cost = diamondModel.Cost;
                //existingDiamond.CertificateScan = diamondModel.CertificateScan;
                existingDiamond.DiamondSize = diamondModel.DiamondSize;
                existingDiamond.AmountAvailable = diamondModel.AmountAvailable;
                existingDiamond.Status = diamondModel.Status;
                await _context.SaveChangesAsync();
                return existingDiamond;
            }
            return null;
        }
    }
}
