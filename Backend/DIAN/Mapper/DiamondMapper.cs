using DIAN_.DTOs.DiamondDto;
using DIAN_.DTOs.OrderDetailDto;
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
                CertificateScan = diamond.CertificateScan,
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
                CertificateScan = diamondRequestDTO.CertificateScan,
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

        public static Diamond ToDiamondFromUpdateProductId(this UpdateProductIdForDiamondDto updateProductId, int id)
        {
            return new Diamond
            {
                ProductId = updateProductId.ProductId,
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
        //        CertificateScan = diamond.CertificateScan,
        //        DiamondSize = diamond.DiamondSize ?? 0,
        //    };
        //}
    }
}
