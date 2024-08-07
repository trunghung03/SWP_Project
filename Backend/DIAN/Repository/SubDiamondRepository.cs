﻿using DIAN_.DTOs.DiamondDto;
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

        public async Task<(List<Subdiamond>, int)> GetAllDiamondsAsync(DiamondQuery query)
        {
            IQueryable<Subdiamond> diamondQuery = _context.Subdiamonds
                                                          .Include(d => d.DiamondAtrribute);

            if (!string.IsNullOrEmpty(query.SearchTerm))
            {
                string lowerSearchTerm = query.SearchTerm.ToLower();
                diamondQuery = diamondQuery.Where(d =>
                    d.DiamondId.ToString().Contains(lowerSearchTerm) ||
                    d.DiamondAtrributeId.ToString().Contains(lowerSearchTerm) ||
                    d.Price.ToString().Contains(lowerSearchTerm) ||
                    d.Status.ToString().ToLower().Contains(lowerSearchTerm) ||
                    d.DiamondAtrribute.Shape.ToString().Contains(lowerSearchTerm) ||
                    d.DiamondAtrribute.Carat.ToString().Contains(lowerSearchTerm) ||
                    d.DiamondAtrribute.Clarity.ToLower().Contains(lowerSearchTerm) ||
                    d.DiamondAtrribute.Cut.ToLower().Contains(lowerSearchTerm));
            }

            if (!string.IsNullOrEmpty(query.Shape))
            {
                diamondQuery = diamondQuery.Where(d => d.DiamondAtrribute.Shape == query.Shape);
            }

            if (!string.IsNullOrEmpty(query.Color))
            {
                diamondQuery = diamondQuery.Where(d => d.DiamondAtrribute.Color == query.Color);
            }

            if (!string.IsNullOrEmpty(query.Clarity))
            {
                diamondQuery = diamondQuery.Where(d => d.DiamondAtrribute.Clarity == query.Clarity);
            }

            if (!string.IsNullOrEmpty(query.Cut))
            {
                diamondQuery = diamondQuery.Where(d => d.DiamondAtrribute.Cut == query.Cut);
            }

            if (query.Carat.HasValue)
            {
                diamondQuery = diamondQuery.Where(d => d.DiamondAtrribute.Carat == query.Carat.Value);
            }

            var totalItems = await diamondQuery.CountAsync();
            Console.WriteLine($"Total items after filtering: {totalItems}");

            if (query.PageNumber.HasValue && query.PageSize.HasValue)
            {
                int pageSize = query.PageSize.Value;
                int pageNumber = query.PageNumber.Value;

                diamondQuery = diamondQuery.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            }

            var diamondList = await diamondQuery.OrderByDescending(p => p.DiamondId).Reverse().ToListAsync();
            Console.WriteLine($"Items returned after pagination: {diamondList.Count}");

            return (diamondList, totalItems);
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