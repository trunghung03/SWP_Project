using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class DiamondMappercs
    {
        public static DiamondDto ToDiamondDTO(this Diamond diamond)
        {
            return new DiamondDto
            {
                DiamondId = diamond.DiamondId,
                Name = diamond.Name,
                Color = diamond.Color,
                Clarity = diamond.Clarity,
                Cut = diamond.Cut,
                Carat = diamond.Carat,
                Cost = diamond.Cost,
                CertificateScan = diamond.CertificateScan,
                DiamondSize = diamond.DiamondSize ?? 0,
                AmountAvailable = diamond.AmountAvailable,
                Status = diamond.Status,
            };
        }

        public static DiamondListDto ToDiamondListDTO(this Diamond diamond)
        {
            return new DiamondListDto
            {
                Name = diamond.Name,
                DiamondId = diamond.DiamondId,
            };
        }

        public static Diamond ToDiamondFromCreateDTO(this CreateDiamondRequestDto diamondRequestDTO)
        {
            return new Diamond
            {
                Name = diamondRequestDTO.Name,
                //Color = diamondRequestDTO.Color,
                //Clarity = diamondRequestDTO.Clarity,
                //Cut = diamondRequestDTO.Cut,
                //Carat = diamondRequestDTO.Carat,
                Cost = diamondRequestDTO.Cost,
                //CertificateScan = diamondRequestDTO.CertificateScan,
                DiamondSize = diamondRequestDTO.DiamondSize,
                AmountAvailable = diamondRequestDTO.AmountAvailable,
                Status = diamondRequestDTO.Status,
            };
        }
        public static Diamond ToDiamondFromUpdateDTO(this UpdateDiamondRequestDto updateDiamond, int id)
        {
            return new Diamond
            {
                DiamondId = updateDiamond.DiamondId,
                Name = updateDiamond.Name,
                //Color = diamondRequestDTO.Color,
                //Clarity = diamondRequestDTO.Clarity,
                //Cut = diamondRequestDTO.Cut,
                //Carat = diamondRequestDTO.Carat,
                Cost = updateDiamond.Cost,
                //CertificateScan = diamondRequestDTO.CertificateScan,
                DiamondSize = updateDiamond.DiamondSize,
                AmountAvailable = updateDiamond.AmountAvailable,
                Status = updateDiamond.Status,
            };
        }
    }
}
