using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.OrderDetailDto
{
    public class UpdateOrderDetailDto
    {
        [Required(ErrorMessage = "Order ID is required.")]
        public int OrderId { get; set; }

        [Required(ErrorMessage = "Line total is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Line total must be greater than 0.")]
        public decimal LineTotal { get; set; }

        [Required(ErrorMessage = "Product ID is required.")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Shell ID is required.")]
        public int ShellId { get; set; }
        public bool Status { get; set; }

        public string? CertificateScan { get; set; }
    }
}
