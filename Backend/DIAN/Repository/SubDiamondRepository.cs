﻿using DIAN_.DTOs.ShellDto;
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
            var existingSubDiamond = await _context.Subdiamonds.FirstOrDefaultAsync(x => x.SubdiamondId == id);
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
                 .ToListAsync();
            return subDiamond;
        }

        public async Task<Subdiamond?> GetByIdAsync(int id)
        {
            var subDiamond = await _context.Subdiamonds
              .Where(s => s.Status && s.SubdiamondId == id)
              .FirstOrDefaultAsync();
            if (subDiamond == null)
            {
                throw new KeyNotFoundException("Diamond does not exist");
            }
            return subDiamond;
        }

        public async Task<Subdiamond?> UpdateAsync(int id, Subdiamond subdiamond)
        {
            var subDiamond = await _context.Subdiamonds.FirstOrDefaultAsync(s => s.SubdiamondId == id);
            if (subDiamond == null)
            {
                return null;
            }

            subDiamond.Shape = subdiamond.Shape;
            subDiamond.Color = subdiamond.Color;
            subDiamond.Clarity = subdiamond.Clarity;
            subDiamond.Cut = subdiamond.Cut;
            subDiamond.Carat = subdiamond.Carat;
            subDiamond.Price = subdiamond.Price;
            subDiamond.AmountAvailable = subdiamond.AmountAvailable;


            _context.Subdiamonds.Update(subDiamond);
            await _context.SaveChangesAsync();

            return subDiamond;
        }

        public async Task<Subdiamond?> UpdateDiamondStock(int id, Subdiamond subdiamond)
        {
            var subDiamond = await _context.Subdiamonds.FirstOrDefaultAsync(s => s.SubdiamondId == id);
            if (subDiamond == null)
            {
                return null;
            }
            subDiamond.AmountAvailable = subdiamond.AmountAvailable;
            _context.Subdiamonds.Update(subDiamond);
            await _context.SaveChangesAsync();
            return subDiamond;
        }
    }
}