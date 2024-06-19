using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CategoryDTO
{
    public class CreateCollectionDTO
    {
        public int CollectionId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required] 
        public string? Description { get; set; }

        public string? ImageLink { get; set; }
    }
}
