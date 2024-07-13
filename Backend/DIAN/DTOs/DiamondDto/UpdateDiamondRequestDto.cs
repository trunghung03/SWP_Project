using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.DiamondDto
{
    public class UpdateDiamondRequestDto
    {
        [Required(ErrorMessage = "Shape is required.")]
        [StringLength(50, ErrorMessage = "Shape must not exceed 50 characters.")]
        public string Shape { get; set; } = string.Empty;

        [Required(ErrorMessage = "Color is required.")]
        [StringLength(50, ErrorMessage = "Color must not exceed 50 characters.")]
        public string Color { get; set; } = string.Empty;

        [Required(ErrorMessage = "Clarity is required.")]
        [StringLength(50, ErrorMessage = "Clarity must not exceed 50 characters.")]
        public string Clarity { get; set; } = string.Empty;

        [Required(ErrorMessage = "Cut is required.")]
        [StringLength(50, ErrorMessage = "Cut must not exceed 50 characters.")]
        public string Cut { get; set; } = string.Empty;

        [Required(ErrorMessage = "Carat is required.")]
        [Range(0.01, 40.00, ErrorMessage = "Carat must be between 0.01 and 40.00.")]
        public decimal Carat { get; set; }

        //[Required(ErrorMessage = "Certificate scan is required.")]
        //public string CertificateScan { get; set; } = string.Empty;

        [Required(ErrorMessage = "Amount available is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Amount Available cannot be smaller than 0")]
        public int AmountAvailable { get; set; }

        public decimal Price { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public bool Status { get; set; } = true;
    }
}
