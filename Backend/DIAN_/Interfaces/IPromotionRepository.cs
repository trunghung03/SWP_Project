using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IPromotionRepository
    {
        Task<List<Promotion>> GetAllPromotionAsync(QueryObject queryObj);

        Task<Promotion> GetPromotionByIdAsync(int id);

        Task<Promotion> GetPromotionByCodeAsync(string proCode);

        Task<Promotion> CreatePromotionAsync(Promotion promotionModel);

        Task<Promotion> UpdatePromotionAsync(int id, Promotion promotion);   

        Task<Promotion> DeletePromotionAsync(int id);

        Task<bool> HasPromotionAsync(int id);

        Task<List<Promotion>> SearchPromotionsByNameAsync(string name);

        Task<List<Promotion>> GetActivePromotionsAsync();

        // Task<List<Promotion>> GetPromotionsByPriceRangeAsync(decimal minPrice, decimal maxPrice);




        //Task<List<Promotion>> GetPromotionsByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}
