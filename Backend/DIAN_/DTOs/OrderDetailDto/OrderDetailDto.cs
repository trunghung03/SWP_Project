using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.OrderDetailDto
{
    public class OrderDetailDto
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        public decimal LineTotal { get; set; }
        [Required]
        public int ProductId { get; set; }
        public int? ShellMaterialId { get; set; }
        public int? SubDiamondId { get; set; }
        public decimal? Size { get; set; }
    }
}
