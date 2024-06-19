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

        [Range(1, int.MaxValue, ErrorMessage = "Shell Material ID must be a positive number.")]
        public int? ShellMaterialId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Sub Diamond ID must be a positive number.")]
        public int? SubDiamondId { get; set; }

        [Required(ErrorMessage = "Size is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Size must be greater than 0.")]
        public decimal? Size { get; set; }
        public bool Status { get; set; }
    }
}
