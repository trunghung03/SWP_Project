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
                Shape = diamond.MainDiamondAtrribute?.Shape ?? "Not Available", 
                Color = diamond.MainDiamondAtrribute?.Color ?? "Not Available",
                Clarity = diamond.MainDiamondAtrribute?.Clarity ?? "Not Available", 
                Cut = diamond.MainDiamondAtrribute?.Cut ?? "Not Available",
                Carat = diamond.MainDiamondAtrribute?.Carat ?? 0,
                Price = diamond.Price,
                CertificateScan = diamond.CertificateScan,
            };
        }

        public static Diamond ToDiamondFromCreateDTO(this CreateDiamondRequestDto diamondRequestDTO)
        {
            return new Diamond
            {
                MainDiamondAtrribute = new Diamondattribute
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
