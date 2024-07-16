using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.SubDiamondDto
{
    public class UpdateSubDiamondStockDto
    {
        [Range(0, int.MaxValue, ErrorMessage = "Amount available cannot be smaller than 0.")]
        [Required(ErrorMessage = "Amount available is required.")]
        public int AmountAvailable { get; set; }
    }
}
    