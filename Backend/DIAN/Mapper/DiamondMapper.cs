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
                Shape = diamond.DiamondAtrribute?.Shape ?? "Not Available", 
                Color = diamond.DiamondAtrribute?.Color ?? "Not Available",
                Clarity = diamond.DiamondAtrribute?.Clarity ?? "Not Available", 
                Cut = diamond.DiamondAtrribute?.Cut ?? "Not Available",
                Carat = diamond.DiamondAtrribute?.Carat ?? 0,
                Price = diamond.Price,
                CertificateScan = diamond.CertificateScan,
            };
        }

        public static Diamond ToDiamondFromCreateDTO(this CreateDiamondRequestDto diamondRequestDTO)
        {
            return new Diamond
            {
                DiamondAtrribute = new Diamondattribute
                {
                    Shape = diamondRequestDTO.Shape,
                    Color = diamondRequestDTO.Color,
                    Clarity = diamondRequestDTO.Clarity,
                    Cut = diamondRequestDTO.Cut,
                    Carat = diamondRequestDTO.Carat,
                },
                Price = diamondRequestDTO.Price,
                Status = diamondRequestDTO.Status,
                CertificateScan = diamondRequestDTO.CertificateScan,
            };
        }

        public static Diamond ToDiamondFromUpdateDTO(this UpdateDiamondRequestDto updateDiamond, int id)
        {
            return new Diamond
            {
                Price = updateDiamond.Price,
                Status = updateDiamond.Status,
            };
        }
    }
}
