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
        public static Promotion ToPromotionFromCreateDto(this CreatePromotionRequestDto promotionModel)
        {
            return new Promotion
            {
                Name = promotionModel.Name,
                Code = promotionModel.Code,
                Amount = promotionModel.Amount,
                Description = promotionModel.Description,
                ValidFrom = promotionModel.StartDate,
                ValidTo = promotionModel.EndDate,
                EmployeeId = promotionModel.EmployeeId,
                Status = true,
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
                Id = promotionModel.PromotionId,
                Name = promotionModel.Name,
                Code = promotionModel.Code,
                Amount = promotionModel.Amount,
                Description = promotionModel.Description,
                StartDate = promotionModel.ValidFrom,
                EndDate = promotionModel.ValidTo,
                EmployeeId = promotionModel.EmployeeId,
                Status = promotionModel.Status,
            };
        }
        public static Promotion ToPromotionFromUpdateDto(this UpdatePromotionRequestDto promotionModel, int id)
        {
            return new Promotion
            {
                Name = promotionModel.Name,
                Code = promotionModel.Code,
                Amount = promotionModel.Amount,
                Description = promotionModel.Description,
                ValidFrom = promotionModel.ValidFrom,
                ValidTo = promotionModel.ValidTo,
                Status = promotionModel.Status
            };
        }
    }
}