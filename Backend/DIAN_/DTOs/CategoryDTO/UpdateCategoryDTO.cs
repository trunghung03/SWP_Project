using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CategoryDTO
{
    public class UpdateCategoryDTO
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public bool? Status { get; set; }
    }
}
