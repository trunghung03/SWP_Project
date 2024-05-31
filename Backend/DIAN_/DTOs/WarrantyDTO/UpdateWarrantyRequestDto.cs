using System.ComponentModel.DataAnnotations;


namespace DIAN_.DTOs.WarrantyDTO
{
    public class UpdateWarrantyRequestDto
    {
        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}
