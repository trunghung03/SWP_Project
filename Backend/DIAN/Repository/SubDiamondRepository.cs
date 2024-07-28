using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ShellDto;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class SubDiamondRepository : ISubDiamondRepository
    {
        private readonly ApplicationDbContext _context;
        public SubDiamondRepository(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task<Subdiamond?> CreateAsync(Subdiamond subdiamond)
        {
            await _context.Subdiamonds.AddAsync(subdiamond);
            await _context.SaveChangesAsync();
            return subdiamond;
        }

        public async Task<Subdiamond?> DeleteAsync(int id)
        {
            var existingSubDiamond = await _context.Subdiamonds.FirstOrDefaultAsync(x => x.DiamondId == id);
            if (existingSubDiamond != null)
            {
                existingSubDiamond.Status = false;
                await _context.SaveChangesAsync();
                return existingSubDiamond;
            }
            return null;
        }

        public async Task<List<Subdiamond>> GetAllAsync()
        {
            var subDiamond = await _context.Subdiamonds
                 .Where(s => s.Status)
                 .Include(p => p.DiamondAtrribute)
                 .ToListAsync();
            return subDiamond;
        }

        public async Task<(List<Subdiamond>, int)> GetAllSubDiamondsAsync(DiamondQuery query)
        {
            IQueryable<Subdiamond> subDiamondsQuery = _context.Subdiamonds
               .Include(p => p.DiamondAtrribute)
               .Where(s => s.Status);

            // If neither PageNumber nor PageSize is provided, return all sub-diamonds without pagination
            if (!query.PageNumber.HasValue && !query.PageSize.HasValue)
            {
                var allSubDiamonds = await subDiamondsQuery.OrderBy(p => p.DiamondId).ToListAsync();
                return (allSubDiamonds, allSubDiamonds.Count);
            }

            // Default PageSize to 7 if not provided
            int pageSize = query.PageSize ?? 7;
            int pageNumber = query.PageNumber ?? 1;

            var totalItems = await subDiamondsQuery.CountAsync();

            var skipNumber = (pageNumber - 1) * pageSize;
            var subDiamondList = await subDiamondsQuery
                .Skip(skipNumber)
                .Take(pageSize)
                .ToListAsync();

            return (subDiamondList, totalItems);
        }


        public async Task<Subdiamond?> GetByIdAsync(int id)
        {
            var subDiamond = await _context.Subdiamonds
              .Where(s => s.Status && s.DiamondId == id)
              .Include(p => p.DiamondAtrribute)
              .FirstOrDefaultAsync();
            if (subDiamond == null)
            {
                throw new KeyNotFoundException("Diamond does not exist");
            }
            return subDiamond;
        }

        public async Task<Subdiamond?> UpdateAsync(int id, Subdiamond subdiamond)
        {
            var subDiamond = await _context.Subdiamonds.FirstOrDefaultAsync(s => s.DiamondId == id);
            if (subDiamond == null)
            {
                return null;
            }
            subDiamond.Price = subdiamond.Price;
            subDiamond.AmountAvailable = subdiamond.AmountAvailable;


            _context.Subdiamonds.Update(subDiamond);
            await _context.SaveChangesAsync();

            return subDiamond;
        }

        public async Task<Subdiamond?> UpdateDiamondStock(int id, UpdateSubDiamondStockDto subdiamond)
        {
            var subDiamond = await _context.Subdiamonds.FirstOrDefaultAsync(s => s.DiamondId == id);
            if (subDiamond == null)
            {
                return null;
            }
            subDiamond.AmountAvailable = subdiamond.AmountAvailable;
            _context.Subdiamonds.Update(subDiamond);
            await _context.SaveChangesAsync();
            return subDiamond;
        }
        public async Task<Subdiamond?> GetDiamondsByAttributeIdAsync(int attributeId)
        {
            return await _context.Subdiamonds.FirstOrDefaultAsync(s => s.DiamondAtrributeId == attributeId && s.Status);
                
        }

        public async Task<List<Subdiamond>> SearchSubDiamondsAsync(SubDiamondSearch searchCriteria)
        {
            var query = _context.Subdiamonds.Include(d => d.DiamondAtrribute).Where(d => d.Status).AsQueryable();

            if (!string.IsNullOrEmpty(searchCriteria.Shape))
            {
                query = query.Where(d => d.DiamondAtrribute.Shape.ToLower().Contains(searchCriteria.Shape.ToLower()));
            }
            if (!string.IsNullOrEmpty(searchCriteria.Color))
            {
                query = query.Where(d => d.DiamondAtrribute.Color.ToLower().Contains(searchCriteria.Color.ToLower()));
            }
            if (!string.IsNullOrEmpty(searchCriteria.Clarity))
            {
                query = query.Where(d => d.DiamondAtrribute.Clarity.ToLower().Contains(searchCriteria.Clarity.ToLower()));
            }
            if (searchCriteria.Carat.HasValue)
            {
                query = query.Where(d => d.DiamondAtrribute.Carat == searchCriteria.Carat.Value);
            }
            if (!string.IsNullOrEmpty(searchCriteria.Cut))
            {
                query = query.Where(d => d.DiamondAtrribute.Cut.ToLower().Contains(searchCriteria.Cut.ToLower()));
            }

            return await query.ToListAsync();
        }
    }
}