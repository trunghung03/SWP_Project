using DIAN_.Models;

namespace DIAN_.DTOs.ProductDTOs
{
    public class ProductDetailWithSpecificDiamondDto
    {
        public Product Product { get; set; }
        public Shell Shell { get; set; }
        public Diamond SubDiamond { get; set; }
        public List<Diamond> MainDiamonds { get; set; }
    }
}
