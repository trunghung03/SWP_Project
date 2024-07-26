using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.SubDiamondDto
{
    public class SubDiamondDto
    {
        public int SubDiamondId { get; set; }
        public int SubDiamondAttributeId { get; set; }

        public string Shape { get; set; } = string.Empty;

        public string Color { get; set; } = string.Empty;

        public string Clarity { get; set; } = string.Empty;

        public string Cut { get; set; } = string.Empty;

        public decimal? Carat { get; set; }

        public decimal Price { get; set; }

        public int? AmountAvailable { get; set; }

        public bool Status { get; set; }
    }
}