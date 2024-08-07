﻿using DIAN_.Models;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using Microsoft.EntityFrameworkCore;
using DIAN_.Mapper;
using System.Linq;

namespace DIAN_.Repository
{
    public class PromotionRepository : IPromotionRepository
    {
        private readonly ApplicationDbContext _context;
        public PromotionRepository(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task<Promotion> CreatePromotionAsync(Promotion promotionModel)
        {

            if (await _context.Promotions.AnyAsync(p => p.Code == promotionModel.Code))
            { 
                throw new ArgumentException("Invalid promotion code");
            }               
            await _context.Promotions.AddAsync(promotionModel);
            await _context.SaveChangesAsync();
            return promotionModel;
        }

        public async Task<List<Promotion>> GetAllPromotionAsync()
        {

         var promotions = await _context.Promotions
                .ToListAsync();
            
            return promotions;

        }
        public async Task<Promotion?> DeletePromotionAsync(int id, Promotion promotion)
        {
            var existingPromotion = await _context.Promotions.FirstOrDefaultAsync(x => x.PromotionId == id);
            if (existingPromotion != null)
            {
                existingPromotion.Status = false;
                await _context.SaveChangesAsync();
                return existingPromotion;
            }
            return null;
        }

        public async Task<Promotion?> GetPromotionByCodeAsync(string proCode)
        {
            var existingPromotion = await _context.Promotions
                .FirstOrDefaultAsync(x => x.Code == proCode);
            if(existingPromotion == null)
            {
                return null;
            }
            return existingPromotion;
        }

        public async Task<int> GetPromotionIdByCodeAsync(string code)
        {
            var promotionId = await _context.Promotions
                .FromSqlRaw("SELECT PromotionId FROM Promotions WHERE PromotionCode = {0}", code)
                .Select(p => p.PromotionId)
                .FirstOrDefaultAsync();

            return promotionId;
        }


        public async Task<Promotion?> GetPromotionByIdAsync(int id)
        {
            var existingPromotion = await _context.Promotions
                .FirstOrDefaultAsync(x => x.PromotionId == id);
           if(existingPromotion == null)
           {
               return null;
           }
           return existingPromotion;
           
        }

        public async Task<List<Promotion?>> SearchPromotionsByNameAsync(string name)
        {
            var promotion = await _context.Promotions.Where(x => x.Name.Contains(name))
                .ToListAsync();
            if (promotion == null)
            {
                throw new KeyNotFoundException("Promotion does not exist");
            }
            return promotion.Cast<Promotion?>().ToList(); 
        }

        public async Task<Promotion?> UpdatePromotionAsync(int id, Promotion promotion)
        {
            var existingPromotion = await _context.Promotions.FirstOrDefaultAsync(x => x.PromotionId == id);
            if (existingPromotion != null)
            {
                existingPromotion.Name = promotion.Name;
                existingPromotion.Code = promotion.Code;
                existingPromotion.Description = promotion.Description;
                existingPromotion.ValidFrom = promotion.ValidFrom;
                existingPromotion.ValidTo = promotion.ValidTo;
                existingPromotion.Amount = promotion.Amount;
                existingPromotion.Status = promotion.Status;
                await _context.SaveChangesAsync();
                return existingPromotion;
            }
            return null;
        }


        public async Task<bool> CheckPromotion(string proCode)
        {
           var existingPromotion = await _context.Promotions.FirstOrDefaultAsync(x => x.Code == proCode);
            if(existingPromotion == null)
              {
                return false;
              }
            return true;
        }

        public async Task<decimal?> ApplyPromotion(string proCode)
        {
            var existingPromotion = await _context.Promotions.FirstOrDefaultAsync(x => x.Code == proCode);
            if(existingPromotion == null)
            {
                return 0;
            }
            return existingPromotion.Amount;
        }
        public async Task<bool> DeactivateAndActivatePromotion(int id)
        {
            var promotion = await _context.Promotions.FirstOrDefaultAsync(c => c.PromotionId == id);
            if (promotion == null) return false;
            if (promotion.Status == true) promotion.Status = false;
            else if (promotion.Status == false) promotion.Status = true;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<List<Promotion?>> GetPromotionByCodeForStaffAsync(string code)
        {
            var promotions = await _context.Promotions
                .Where(p => p.Code.Contains(code))
                .ToListAsync();

            if (promotions == null || promotions.Count == 0)
            {
                return new List<Promotion?>();
            }
            return promotions.Cast<Promotion?>().ToList();
        }

        public async Task<List<Promotion>> SearchPromotionsAsync(PromotionSearch searchCriteria)
        {
            var query = _context.Promotions.AsQueryable();
            if (!string.IsNullOrEmpty(searchCriteria.query))
            {
                string queryStr = searchCriteria.query.ToLower();
                query = query.Where(prm => prm.Name.ToLower().Contains(queryStr) ||
                                           prm.Code.ToLower().Contains(queryStr) ||
                                           prm.Description.ToLower().Contains(queryStr));
            }
            return await query.ToListAsync();
        }
    }
}
