using DIAN_.DTOs.PromotionDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class PromotionMapper
    {
        public static PromotionDto ToProductFromCreateDto(this CreatePromotionRequestDto promotionModel)
        {
            return new PromotionDto
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

        public static PromotionList ToPromotionList(this Promotion promotionModel)
        {
            return new PromotionList
            {
                Name = promotionModel.Name,
                Amount = promotionModel.Amount,
                StartDate = promotionModel.ValidFrom,
                EndDate = promotionModel.ValidTo,
                Status = promotionModel.Status
            };
        }

        public static PromotionDetailDto ToPromotionDetail(this Promotion promotionModel)
        {
            return new PromotionDetailDto
            {
                Name = promotionModel.Name,
                Code = promotionModel.Code,
                Amount = promotionModel.Amount,
                Description = promotionModel.Description,
                StartDate = promotionModel.ValidFrom,
                EndDate = promotionModel.ValidTo,
                Status = promotionModel.Status,
            };
        }
    }
}