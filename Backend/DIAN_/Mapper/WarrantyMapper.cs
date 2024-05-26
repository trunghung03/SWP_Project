using DIAN_.DTOs.WarrantyDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class WarrantyMapper
    {
        public static WarrantyDTO ToWarrantyDTO(this Warranty warranty)
        {
            return new WarrantyDTO
            {
                OrderDetailId = warranty.OrderDetailId,
                StartDate = warranty.StartDate,
                EndDate = warranty.EndDate,
                Status = warranty.Status
            };
        }

        public static Warranty ToCreateWarranty(this CreateWarrantyDTO warrantyDTO)
        {
            return new Warranty
            {
                OrderDetailId = warrantyDTO.OrderDetailId,
                StartDate = warrantyDTO.StartDate,
                EndDate = warrantyDTO.EndDate,
                Status = true,
            };
        }

        public static Warranty ToUpdateWarranty(this UpdateWarrantyDTO warrantyDTO, Warranty existingWarranty)
        {
            existingWarranty.StartDate = warrantyDTO.StartDate;
            existingWarranty.EndDate = warrantyDTO.EndDate;
            return existingWarranty;
        }
    }
}
