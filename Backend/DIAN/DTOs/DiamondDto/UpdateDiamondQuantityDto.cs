using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.DiamondDto
{
    public class UpdateDiamondQuantityDto
    {
        [Required(ErrorMessage = "Amount available is required.")]
        [Range(0, int.MaxValue, ErrorMessage = "Amount Available cannot be smaller than 0")]
        public int AmountAvailable { get; set; }
    }
}
