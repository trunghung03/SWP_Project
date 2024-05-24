using DIAN_.DTOs.PromotionDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DIAN_.Models;

namespace DIAN_.Mapper.Promotion
{
    public static class PromotionMapper
    {
        public static UpdatePromotionRequestDto ToUpdatePromotionRequestDto(this UpdatePromotionRequestDto promotionModel)
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