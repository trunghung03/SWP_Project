using DIAN_.DTOs.DiamondAttributeDto;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class DiamondAttributeMapper
    {
        public static Diamondattribute FromCreateDtoToDiamondAttribute(this CreateDiamondAttributeDto createDiamondAttributeDto)
        {
            return new Diamondattribute
            {
                Shape = createDiamondAttributeDto.Shape,
                Color = createDiamondAttributeDto.Color,
                Clarity = createDiamondAttributeDto.Clarity,
                Cut = createDiamondAttributeDto.Cut,
                Carat = createDiamondAttributeDto.Carat
            };
        }

        //public static DiamondAttribute FromUpdateDtoToDiamondAttribute(this UpdateDiamondAttributeDto updateDiamondAttributeDto)
        //{
        //    return new DiamondAttribute()
        //    {
        //        Shape = updateDiamondAttributeDto.Shape,
        //        Color = updateDiamondAttributeDto.Color,
        //        Clarity = updateDiamondAttributeDto.Clarity,
        //        Cut = updateDiamondAttributeDto.Cut,
        //        Carat = updateDiamondAttributeDto.Carat
        //    };
        //}

        public static DiamondAttributeDto ToDiamondAttributeDto(this Diamondattribute diamondAttribute)
        {
            return new DiamondAttributeDto
            {
                DiamondAttributeId = diamondAttribute.DiamondAtrributeId,
                Shape = diamondAttribute.Shape,
                Color = diamondAttribute.Color,
                Clarity = diamondAttribute.Clarity,
                Cut = diamondAttribute.Cut,
                Carat = diamondAttribute.Carat
            };
        }
    }
}
