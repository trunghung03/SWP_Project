using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.PromotionDto
{
    public class CreatePromotionRequestDto
    {

        [Required]
        [MaxLength(150, ErrorMessage = "Name cannot be over 150 over characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Code { get; set; } = string.Empty;
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public bool Status { get; set; }
    }
}