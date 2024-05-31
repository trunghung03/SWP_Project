using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CollectionDTO
{
    public class CollectionDTO
    {
        public int CollectionId { get; set; }

        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Description { get; set; }

        public List<ProductListDTO> Products { get; set; } = new List<ProductListDTO>();
    }
}
