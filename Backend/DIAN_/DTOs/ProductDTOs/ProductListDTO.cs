namespace DIAN_.DTOs.ProductDTOs
{
    public class ProductListDTO
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string ImageLinkList { get; set; }
        public int? CategoryID { get; set; }
    }
}
