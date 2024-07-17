using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class SubDiamondMapper
    {
        public static SubDiamondDto ToSubDiamondDTO(this Subdiamond diamond)
        {
            return new SubDiamondDto
            {
                SubDiamondId = diamond.DiamondId,
                Shape = diamond.DiamondAtrribute?.Shape, 
                Color = diamond.DiamondAtrribute?.Color, 
                Clarity = diamond.DiamondAtrribute?.Clarity, 
                Cut = diamond.DiamondAtrribute?.Cut, 
                Carat = diamond.DiamondAtrribute?.Carat,
                Price = diamond.Price,
                AmountAvailable = diamond.AmountAvailable,
                Status = diamond.Status,
            };
        }

        public static Subdiamond ToSubDiamondFromCreateDTO(this CreateSubDiamondRequestDto subDiamondRequestDTO)
        {
            return new Subdiamond
            {
                DiamondAtrribute = new Diamondattribute
                {
                    Shape = subDiamondRequestDTO.Shape,
                    Color = subDiamondRequestDTO.Color,
                    Clarity = subDiamondRequestDTO.Clarity,
                    Cut = subDiamondRequestDTO.Cut,
                    Carat = subDiamondRequestDTO.Carat,
                },
                Price = subDiamondRequestDTO.Price,
                AmountAvailable = subDiamondRequestDTO.AmountAvailable,
                Status = subDiamondRequestDTO.Status,
            };
        }

        public static Subdiamond ToSubDiamondFromUpdateDTO(this UpdateSubDiamondRequestDto updateSubDiamond, int id)
        {
            return new Subdiamond
            {
                Price = updateSubDiamond.Price,
                AmountAvailable = updateSubDiamond.AmountAvailable,
                Status = updateSubDiamond.Status,
            };
        }
        public static Subdiamond ToUpdateSubDiamondStock(this UpdateSubDiamondStockDto updateSubDiamondStock, int id)
        {
            return new Subdiamond
            {
                AmountAvailable = updateSubDiamondStock.AmountAvailable,
            };
        }
    }
}