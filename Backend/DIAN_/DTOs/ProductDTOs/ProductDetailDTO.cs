namespace DIAN_.DTOs.ProductDTOs
{
    public class ProductDetailDTO
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string ProductCode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Carat { get; set; }
        public List<string> SubDiamondColors { get; set; } = new List<string>();
        public List<decimal> Sizes { get; set; } = new List<decimal>();
        public int? CategoryId { get; set; }
    }
}
