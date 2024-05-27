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
                Color = diamondRequestDTO.Color,
                Clarity = diamondRequestDTO.Clarity,
                Cut = diamondRequestDTO.Cut,
                Carat = diamondRequestDTO.Carat,
                Cost = diamondRequestDTO.Cost,
                CertificateScan = diamondRequestDTO.CertificateScan,
                DiamondSize = diamondRequestDTO.DiamondSize,
                AmountAvailable = diamondRequestDTO.AmountAvailable,
                Status = diamondRequestDTO.Status,
            };
        }
        public static Diamond ToDiamondFromUpdateDTO(this UpdateDiamondRequestDto updateDiamond, int id)
        {
            return new Diamond
            {
                Name = updateDiamond.Name,
                Color = updateDiamond.Color,
                Clarity = updateDiamond.Clarity,
                Cut = updateDiamond.Cut,
                Carat = updateDiamond.Carat,
                Cost = updateDiamond.Cost,
                CertificateScan = updateDiamond.CertificateScan,
                DiamondSize = updateDiamond.DiamondSize,
                AmountAvailable = updateDiamond.AmountAvailable,
                Status = updateDiamond.Status,
            };
        }
        //public static DiamondDetailDto ToDiamondDetailDTO(this Diamond diamond)
        //{
        //    return new DiamondDetailDto
        //    {
        //        DiamondId = diamond.DiamondId,
        //        Name = diamond.Name,
        //        Color = diamond.Color,
        //        Clarity = diamond.Clarity,
        //        Cut = diamond.Cut,
        //        Carat = diamond.Carat,
        //        Cost = diamond.Cost,
        //        CertificateScan = diamond.CertificateScan,
        //        DiamondSize = diamond.DiamondSize ?? 0,
        //    };
        //}
    }
}
