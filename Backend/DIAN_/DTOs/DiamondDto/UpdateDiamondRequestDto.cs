using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.DiamondDto
{
    public class UpdateDiamondRequestDto
    {
        [Required]
        [StringLength(50)]
        public string Shape { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Color { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Clarity { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Cut { get; set; } = string.Empty;

        [Required]
        [Range(0.01, 40.00)]
        public decimal Carat { get; set; }

        

        [Required]
        public string CertificateScan { get; set; } = string.Empty;

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Amount Available cannot be smaller than 0")]
        public int AmountAvailable { get; set; }

        public bool Status { get; set; } = true; // Thêm thuộc tính Status với giá trị mặc định là true
    }
}
