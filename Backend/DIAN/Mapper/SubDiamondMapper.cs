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
               SubDiamondId = diamond.SubdiamondId,
               Shape = diamond.Shape,   
               Color = diamond.Color,
               Clarity = diamond.Clarity,
               Cut = diamond.Cut,
               Carat = diamond.Carat,
               Price = diamond.Price,
               AmountAvailable = diamond.AmountAvailable,
               Status = diamond.Status,
            };
        }
        public static Subdiamond ToSubDiamondFromCreateDTO(this CreateSubDiamondRequestDto subDiamondRequestDTO)
        {
            return new Subdiamond
            {
                Shape = subDiamondRequestDTO.Shape,
                Color = subDiamondRequestDTO.Color,
                Clarity = subDiamondRequestDTO.Clarity,
                Cut = subDiamondRequestDTO.Cut,
                Carat = subDiamondRequestDTO.Carat,
                Price = subDiamondRequestDTO.Price,
                AmountAvailable = subDiamondRequestDTO.AmountAvailable,
                Status = subDiamondRequestDTO.Status,
            };
        }
        public static Subdiamond ToSubDiamondFromUpdateDTO(this UpdateSubDiamondRequestDto updateSubDiamond, int id)
        {
            return new Subdiamond
            {
                Shape = updateSubDiamond.Shape,    
                Color = updateSubDiamond.Color,
                Clarity = updateSubDiamond.Clarity,
                Cut = updateSubDiamond.Cut,
                Carat = updateSubDiamond.Carat,
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
