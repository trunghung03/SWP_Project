using System.ComponentModel.DataAnnotations;


namespace DIAN_.DTOs.WarrantyDTO
{
    public class UpdateWarrantyRequestDto
    {
        [Required(ErrorMessage = "Status is required.")]
        public bool Status { get; set; }
    }
}
