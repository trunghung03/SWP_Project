namespace DIAN_.DTOs.ProductDTOs
{
    public class UpdateProductRequestDTO
    {
        

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal LaborPrice { get; set; }

        public string ImageLinkList { get; set; }

        public int? CollectionId { get; set; }
        public int? CategoryId { get; set; }
    }
}
