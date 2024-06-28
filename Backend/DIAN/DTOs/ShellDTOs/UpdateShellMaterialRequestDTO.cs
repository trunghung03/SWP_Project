using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.ShellDTOs
{
    public class UpdateShellMaterialRequestDTO
    {

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Amount available is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Amount available must be a non-negative number.")]
        public decimal AmountAvailable { get; set; }

    }
}
