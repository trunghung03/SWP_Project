using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CategoryDTO
{
    public class CreateCategoryDTO
    {
        [Required(ErrorMessage = "Category name is required.")]
        [StringLength(100, ErrorMessage = "Category name must not exceed 100 characters.")]
        public string? Name { get; set; }

    }
}
