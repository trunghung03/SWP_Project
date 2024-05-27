using DIAN_.DTOs.SizeDTO;
using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class SizeMapper
    {
        public static Size ToSizeFromCreateDto(this CreateSizeRequestDto sizeDto)
        {
           return new Size{
               CategoryId = sizeDto.CategoryId,
               MinSize = sizeDto.MinSize,
               MaxSize = sizeDto.MaxSize,
               Step = sizeDto.Step
           };
        }
        public static Size ToSizeFromUpdateDto(this UpdateSizeRequestDto sizeDto)
        {
           return new Size{
               MinSize = sizeDto.MinSize,
               MaxSize = sizeDto.MaxSize,
               Step = sizeDto.Step
           };
        }
        public static SizeListDto ToSizeDetailDto(this Size size)
        {
           return new SizeListDto{
               CategoryId= size.CategoryId,
               MinSize = size.MinSize,
               MaxSize = size.MaxSize,
               Step = size.Step
           };
        }
    }
}
