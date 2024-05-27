using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.WarrantyDTO
{
    public class CreateWarrantyRequestDto
    {
        [Required]
        public int OrderDetailId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public bool Status { get; set; }
    }
}
