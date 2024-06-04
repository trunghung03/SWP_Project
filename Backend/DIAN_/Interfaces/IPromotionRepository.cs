using DIAN_.DTOs.PromotionDto;
using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IPromotionRepository
    {
        Task<List<Promotion>> GetAllPromotionAsync();

        Task<Promotion?> GetPromotionByIdAsync(int id);

        Task<Promotion?> GetPromotionByCodeAsync(string proCode);

        Task<Promotion> CreatePromotionAsync(Promotion promotionModel); 

        Task<Promotion?> UpdatePromotionAsync(int id, Promotion promotion);   

        Task<Promotion?> DeletePromotionAsync(int id, Promotion promotion);

        Task<bool> CheckPromotion(string proCode);

        Task<List<Promotion?>> SearchPromotionsByNameAsync(string name);

        Task<int> GetPromotionIdByCodeAsync(string code);
        //Task<List<Promotion>> GetActivePromotionsAsync();

        // Task<List<Promotion>> GetPromotionsByPriceRangeAsync(decimal minPrice, decimal maxPrice);

        //Task<List<Promotion>> GetPromotionsByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}
