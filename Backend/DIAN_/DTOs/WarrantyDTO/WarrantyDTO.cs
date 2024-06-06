using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.WarrantyDTO
{
    public class WarrantyDTO
    {
        [Required]
        public string CustomerName { get; set; }
        [Required]
        public string DateOfPurchase { get; set; }
        public string Service { get; set; } = "Diamond Insurance";
        [Required]
        public string IdNumber { get; set; }
        [Required]
        public string WarrantyPeriodStart { get; set; }
        [Required]
        public string WarrantyPeriodEnd { get; set; }
    }
}
