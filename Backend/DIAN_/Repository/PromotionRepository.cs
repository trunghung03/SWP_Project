using DIAN_.Models;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            await _context.Promotions.AddAsync(promotionModel);
            await _context.SaveChangesAsync();
            return promotionModel;
        }

        public async Task<List<Promotion>> GetAllPromotionAsync(PromotionQuery promotionQuery)
        {
            var promotion = _context.Promotions.AsQueryable();

            if (!string.IsNullOrWhiteSpace(promotionQuery.Name))
            {
                promotion = promotion.Where(x => x.Name.Contains(promotionQuery.Name));
            }

            if (promotionQuery.Amount.HasValue)
            {
                promotion = promotion.Where(x => x.Amount == promotionQuery.Amount.Value);
            }

            if (promotionQuery.StartDate != default(DateTime))
            {
                promotion = promotion.Where(x => x.ValidFrom >= promotionQuery.StartDate);
            }

            switch (promotionQuery.SortBy)
            {
                case "Name":
                    promotion = promotionQuery.Ascending ? promotion.OrderBy(x => x.Name) : promotion.OrderByDescending(x => x.Name);
                    break;
                case "Amount":
                    promotion = promotionQuery.Ascending ? promotion.OrderBy(x => x.Amount) : promotion.OrderByDescending(x => x.Amount);
                    break;
                case "ValidFrom":
                    promotion = promotionQuery.Ascending ? promotion.OrderBy(x => x.ValidFrom) : promotion.OrderByDescending(x => x.ValidFrom);
                    break;
            }

            return await promotion.ToListAsync();
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

        public async Task<List<Promotion>> GetActivePromotionsAsync()
        {
            var existingPromotion = await _context.Promotions.Where(x => x.Status == true).ToListAsync();
            if(existingPromotion == null)
            {
                return null;
            }
            return existingPromotion;
        }

        public async Task<Promotion> GetPromotionByCodeAsync(string proCode)
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

        //public Task<bool> HasPromotionAsync(int id)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<List<Promotion>> SearchPromotionsByNameAsync(string name)
        {
            var promotion = await _context.Promotions.Where(x => x.Name.Contains(name)).ToListAsync();
            if (promotion == null)
            {
                return null;
            }
            return promotion;
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
    }
}
