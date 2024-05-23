using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;

namespace DIAN_.Repository
{
    public class PromotionRepository : IPromotionRepository
    {
        public Task<Promotion> CreatePromotionAsync(Promotion promotionModel)
        {
            throw new NotImplementedException();
        }

        public Task<Promotion> DeletePromotionAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Promotion>> GetActivePromotionsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<List<Promotion>> GetAllPromotionAsync(QueryObject queryObj)
        {
            throw new NotImplementedException();
        }

        public Task<Promotion> GetPromotionByCodeAsync(string proCode)
        {
            throw new NotImplementedException();
        }

        public Task<Promotion> GetPromotionByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> HasPromotionAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Promotion>> SearchPromotionsByNameAsync(string name)
        {
            throw new NotImplementedException();
        }

        public Task<Promotion> UpdatePromotionAsync(int id, Promotion promotion)
        {
            throw new NotImplementedException();
        }
    }
}
