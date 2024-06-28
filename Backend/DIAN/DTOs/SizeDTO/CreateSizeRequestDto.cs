using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.SizeDTO
{
    public class CreateSizeRequestDto
    {
        [Required(ErrorMessage = "Category ID is required.")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Minimum size is required.")]
        [Range(0, 25, ErrorMessage = "Minimum size must be between 0 and 25.")]
        public decimal MinSize { get; set; }

        [Required(ErrorMessage = "Maximum size is required.")]
        [Range(0, 25, ErrorMessage = "Maximum size must be between 0 and 25.")]
        public decimal MaxSize { get; set; }

        [Required(ErrorMessage = "Step is required.")]
        [Range(0.01, 25, ErrorMessage = "Step must be between 0.01 and 25.")]
        public decimal Step { get; set; }

    }
}
