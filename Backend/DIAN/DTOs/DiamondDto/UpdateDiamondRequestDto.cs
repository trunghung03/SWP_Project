using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.DiamondDto
{
    public class UpdateDiamondRequestDto
    {
        [Required(ErrorMessage = "Cost is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Cost cannot be smaller than 0.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public bool Status { get; set; } = true;
    }
}
