using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.DiamondDto
{
    public class CreateDiamondRequestDto
    {
        [Required]
        [StringLength(50)]
        public string Shape { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Color { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Clarity { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Cut { get; set; } = string.Empty;

        [Required]
        [Range(0.01, 40.00)]
        public decimal Carat { get; set; }

        [Required]
        [Range(0, Double.MaxValue, ErrorMessage = "Cost cannot be smaller than 0")]
        public decimal Cost { get; set; }

        [Required]
        public string CertificateScan { get; set; } = string.Empty;

        [Required]
        public int AmountAvailable { get; set; }

        [Required]
        public bool Status { get; set; }
    }
}
