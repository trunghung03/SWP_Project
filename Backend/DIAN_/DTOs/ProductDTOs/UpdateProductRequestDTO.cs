namespace DIAN_.DTOs.ProductDTOs
{
    public class UpdateProductRequestDTO
    {
        
        public string ProductCode { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public int MainDiamondId { get; set; }

        public decimal LaborPrice { get; set; }

        public string ImageLinkList { get; set; }

        public int SubDiamondAmount { get; set; }

        public int? MainDiamondAmount { get; set; }

        public decimal? ShellAmount { get; set; }
        public int? CollectionId { get; set; }
        public int? CategoryId { get; set; }
    }
}
