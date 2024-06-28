namespace DIAN_.DTOs.ProductDTOs
{
    public class ProductListDTO
    {
        public int ProductId { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string? ImageLinkList { get; set; } = string.Empty;
        public int? CategoryID { get; set; }
        public string Shape { get; set; } = string.Empty ;
        public string Clarity { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public decimal Carat { get; set; } = 0;
        public int CollectionId { get; set; }
    }
}
