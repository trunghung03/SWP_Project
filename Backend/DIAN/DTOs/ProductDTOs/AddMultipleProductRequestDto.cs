using DIAN_.DTOs.ProductDTOs;

namespace DIAN_.DTOs.ProductDTOs
{
    public class AddMultipleProductRequestDto
    {
        public List<AddProductDto> Products { get; set; }
        public int Quantity { get; set; }
    }
}