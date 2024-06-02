using DIAN_.Models;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using Microsoft.EntityFrameworkCore;
using DIAN_.Mapper;

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
            if (promotionModel.EmployeeId == 0) 
            {
                throw new ArgumentException("EmployeeId must be inputed.");
            }
        
            await _context.Promotions.AddAsync(promotionModel);
            await _context.SaveChangesAsync();
            return promotionModel;
        }

        public async Task<List<Promotion>> GetAllPromotionAsync()
        {

         //   return await _context.Promotions.Where(x => x.Status == true)
         //.Select(p => p.ToPromotionList()).ToListAsync();
         var promotions = await _context.Promotions.ToListAsync();
            
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

        //public async Task<List<Promotion>> GetInActivePromotionsAsync()
        //{
        //    var existingPromotion = await _context.Promotions.Where(x => x.Status == false).ToListAsync();
        //    if(existingPromotion == null)
        //    {
        //        return null;
        //    }
        //    return existingPromotion;
        //}

        public async Task<Promotion?> GetPromotionByCodeAsync(string proCode)
        {
            var existingPromotion = await _context.Promotions.FirstOrDefaultAsync(x => x.Code == proCode);
            if(existingPromotion == null)
            {
                return null;
            }
            return existingPromotion;
        }

        public async Task<Promotion?> GetPromotionByIdAsync(int id)
        {
            var existingPromotion = await _context.Promotions.FirstOrDefaultAsync(x => x.PromotionId == id);
           if(existingPromotion == null)
           {
               return null;
           }
           return existingPromotion;
           
        }

        public async Task<List<Promotion?>> SearchPromotionsByNameAsync(string name)
        {
            var promotion = await _context.Promotions.Where(x => x.Name.Contains(name)).ToListAsync();
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
    }
}
