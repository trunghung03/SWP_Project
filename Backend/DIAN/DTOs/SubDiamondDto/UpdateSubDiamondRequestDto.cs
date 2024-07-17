using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.SubDiamondDto
{
    public class UpdateSubDiamondRequestDto
    {

        [Required(ErrorMessage = "Price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Price cannot be smaller than 0.")]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Amount available cannot be smaller than 0.")]
        public int AmountAvailable { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        public bool Status { get; set; }
    }
}
