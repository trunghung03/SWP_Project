using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.ProductDTOs
{
    public class UpdateProductRequestDTO
    {

        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [StringLength(255, ErrorMessage = "Description must not exceed 500 characters.")]
        public string? Description { get; set; }

        public string ImageLinkList { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Collection ID must be a positive number.")]
        public int? CollectionId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Category ID must be a positive number.")]
        [Required(ErrorMessage = "Category ID is required.")]
        public int? CategoryId { get; set; }
        public bool Status { get; set; }
    }
}
