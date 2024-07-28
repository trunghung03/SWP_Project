using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.ShellDto
{
    public class CreateShellRequestDto
    {
        public int? ProductId { get; set; }

        [Required(ErrorMessage = "Shell Material ID is required.")]
        public int ShellMaterialId { get; set; }

        [Required(ErrorMessage = "Weight is required.")]
        public  decimal Weight { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be a non-negative number.")]
        public int AmountAvailable { get; set; }

        [Required(ErrorMessage = "Sizes are required.")]
        public List<decimal> Sizes { get; set; } = new List<decimal>();
        public bool Status { get; set; }
    }
}
