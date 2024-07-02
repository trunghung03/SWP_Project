using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.SubDiamondDto
{
    public class UpdateSubDiamondRequestDto
    {
        [StringLength(50, ErrorMessage = "Shape must not exceed 50 characters.")]
        public string Shape { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "Color must not exceed 100 characters.")]
        public string Color { get; set; } = string.Empty;

        [StringLength(50, ErrorMessage = "Clarity must not exceed 50 characters.")]
        public string Clarity { get; set; } = string.Empty;

        [StringLength(50, ErrorMessage = "Cut must not exceed 50 characters.")]
        public string Cut { get; set; } = string.Empty;

        [Range(0.01, 40.00, ErrorMessage = "Carat must be between 0.01 and 40.00.")]
        public decimal Carat { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price cannot be smaller than 0.")]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Amount available cannot be smaller than 0.")]
        public int AmountAvailable { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public bool Status { get; set; }
    }
}
