using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.PromotionDto
{
    public class CreatePromotionRequestDto
    {

        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(150, ErrorMessage = "Name cannot be over 150 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Code is required.")]
        [StringLength(50, ErrorMessage = "Code must not exceed 50 characters.")]
        public string Code { get; set; } = string.Empty;

        [Required(ErrorMessage = "Amount is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Amount must be a non-negative number.")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [MaxLength(500, ErrorMessage = "Description cannot be over 500 characters.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Start date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Start date must be a valid date.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End date is required.")]
        [DataType(DataType.Date, ErrorMessage = "End date must be a valid date.")]
        public DateTime EndDate { get; set; }
        public bool Status { get; set; } = true;
    }
}