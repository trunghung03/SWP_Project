using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CategoryDTO
{
    public class CreateCollectionDTO
    {
        [Required(ErrorMessage = "Collection ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Collection ID must be a positive number.")]
        public int CollectionId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, ErrorMessage = "Description must not exceed 500 characters.")]
        public string? Description { get; set; }

        [Url(ErrorMessage = "Image link must be a valid URL.")]
        public string? ImageLink { get; set; }
    }
}
