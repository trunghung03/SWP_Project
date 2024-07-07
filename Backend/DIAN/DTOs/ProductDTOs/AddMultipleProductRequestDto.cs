using DIAN_.DTOs.ProductDTOs;

namespace DIAN_.DTOs.ProductDTOs
{
    public class AddMultipleProductRequestDto
    {
        public List<AddProductDto> Products { get; set; }
        public UpdateProductRequestDTO CreateProductRequest { get; set; } = new UpdateProductRequestDTO();
        public int Quantity { get; set; }
    }
}