namespace DIAN_.DTOs.ProductDTOs
{
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string ProductCode { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string Description { get; set; } = string.Empty;

        public int MainDiamondId { get; set; }

        public decimal LaborPrice { get; set; }

        public string ImageLinkList { get; set; } = string.Empty;

        public int SubDiamondAmount { get; set; }

        public int? MainDiamondAmount { get; set; }

        public decimal? ShellAmount { get; set; }
        
        public int? CollectionId { get; set; }

        public List<decimal> Sizes { get; set; } = new List<decimal>();
        public int? CategoryId { get; set; }
    }
}
