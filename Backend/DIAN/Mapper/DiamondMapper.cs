using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class DiamondMapper
    {
        public static DiamondDto ToDiamondDTO(this Diamond diamond)
        {
            return new DiamondDto
            {
                Shape = diamond.Shape,
                DiamondId = diamond.DiamondId,
                Color = diamond.Color,
                Clarity = diamond.Clarity,
                Cut = diamond.Cut,
                Carat = diamond.Carat ?? 0,
            };
        }

        public static DiamondListDto ToDiamondListDTO(this Diamond diamond)
        {
            return new DiamondListDto
            {
                Shape = diamond.Shape,
                DiamondId = diamond.DiamondId,
            };
        }

        public static Diamond ToDiamondFromCreateDTO(this CreateDiamondRequestDto diamondRequestDTO)
        {
            return new Diamond
            {
                Shape = diamondRequestDTO.Shape,
                Color = diamondRequestDTO.Color,
                Clarity = diamondRequestDTO.Clarity,
                Cut = diamondRequestDTO.Cut,
                Carat = diamondRequestDTO.Carat,
                Status = diamondRequestDTO.Status,
            };
        }
        public static Diamond ToDiamondFromUpdateDTO(this UpdateDiamondRequestDto updateDiamond, int id)
        {
            return new Diamond
            {
                Shape = updateDiamond.Shape,    
                Color = updateDiamond.Color,
                Clarity = updateDiamond.Clarity,
                Cut = updateDiamond.Cut,
                Carat = updateDiamond.Carat,
                Status = updateDiamond.Status,
            };
        }
        public static Diamond ToDiamondFromUpdateAmountAvailable(this UpdateDiamondStockDto updateAmountAvailable, int id)
        {
            return new Diamond
            {
                AmountAvailable = updateAmountAvailable.AmountAvailable,
            };
        }
    }
}
