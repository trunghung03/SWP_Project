using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.Mapper.Promotion
{
    public class PromotionMapper
    {
        public static UpdatePromotionRequestDto ToUpdatePromotionRequestDto(this Promotion promotionModel)
        {
            return new UpdatePromotionRequestDto
            {
                Name = promotionModel.Name,
                Code = promotionModel.Code,
                Amount = promotionModel.Amount,
                Description = promotionModel.Description,
                StartDate = promotionModel.StartDate,
                EndDate = promotionModel.EndDate,
                Status = promotionModel.Status
            };
        }
    }
}