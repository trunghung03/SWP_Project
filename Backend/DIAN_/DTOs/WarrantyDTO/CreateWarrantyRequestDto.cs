using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.WarrantyDTO
{
    public class CreateWarrantyRequestDto
    {
        [Required(ErrorMessage = "OrderDetailId is required.")]
        public int OrderDetailId { get; set; }

        [Required(ErrorMessage = "StartDate is required.")]
        [DataType(DataType.Date, ErrorMessage = "StartDate must be a valid date.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "EndDate is required.")]
        [DataType(DataType.Date, ErrorMessage = "EndDate must be a valid date.")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public string? Status { get; set; }
    }
}
