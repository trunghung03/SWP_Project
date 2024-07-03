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
                DiamondType = diamond.DiamondType,
                Shape = diamond.Shape,
                DiamondId = diamond.DiamondId,
                Color = diamond.Color,
                Clarity = diamond.Clarity,
                Cut = diamond.Cut,
                Carat = diamond.Carat ?? 0,
                CertificateScan = diamond.CertificateScan,
            };
        }

        public static DiamondListDto ToDiamondListDTO(this Diamond diamond)
        {
            return new DiamondListDto
            {
                DiamondType = diamond.DiamondType,
                Shape = diamond.Shape,
                DiamondId = diamond.DiamondId,
            };
        }

        public static Diamond ToDiamondFromCreateDTO(this CreateDiamondRequestDto diamondRequestDTO)
        {
            return new Diamond
            {
                DiamondType = diamondRequestDTO.DiamondType,
                Shape = diamondRequestDTO.Shape,
                Color = diamondRequestDTO.Color,
                Clarity = diamondRequestDTO.Clarity,
                Cut = diamondRequestDTO.Cut,
                Carat = diamondRequestDTO.Carat,
                Price = diamondRequestDTO.Price,
                Quantity = diamondRequestDTO.AmountAvailable,
                CertificateScan = diamondRequestDTO.CertificateScan,
                Status = diamondRequestDTO.Status,
            };
        }
        public static Diamond ToDiamondFromUpdateDTO(this UpdateDiamondRequestDto updateDiamond, int id)
        {
            return new Diamond
            {
                DiamondType = updateDiamond.DiamondType,
                Shape = updateDiamond.Shape,    
                Color = updateDiamond.Color,
                Clarity = updateDiamond.Clarity,
                Cut = updateDiamond.Cut,
                Carat = updateDiamond.Carat,
                Price = updateDiamond.Price,
                Quantity = updateDiamond.AmountAvailable,
                CertificateScan = updateDiamond.CertificateScan,
                Status = updateDiamond.Status,
            };
        }
        public static Diamond ToDiamondFromUpdateCertificate(this UpdateCertificateDto updateCertificate, int id)
        {
            return new Diamond
            {
                CertificateScan = updateCertificate.CertificateScan,
            };
        }
    }
}
