using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class WarrantyMapper
    {
        public static Warranty ToWarrantyFromCreateDto(this CreateWarrantyRequestDto warrantyDto)
        {
            //  var startDate = DateTime.Now;
            return new Warranty
            {
                OrderDetailId = warrantyDto.OrderDetailId,
                //StartDate = startDate,
                //EndDate = startDate.AddYears(1),
                StartDate = warrantyDto.StartDate,
                EndDate = warrantyDto.EndDate,
                Status = "Active"
            };
        }
        public static Warranty ToWarrantyFromUpdateDto(this UpdateWarrantyRequestDto warrantyDto, int id)
        {
            return new Warranty
            {
                Status = warrantyDto.Status
            };
        }

        public static WarrantyDetailDto ToWarrantyDetailDto(this Warranty warranty)
        {
            return new WarrantyDetailDto
            {
                OrderDetailId = warranty.OrderDetailId,
                StartDate = warranty.StartDate,
                EndDate = warranty.EndDate,
                Status = warranty.Status
            };
        }
    }
}
