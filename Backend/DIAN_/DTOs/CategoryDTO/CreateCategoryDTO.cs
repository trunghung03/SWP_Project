using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CategoryDTO
{
    public class CreateCategoryDTO
    {
        [Required]
        public string? Name { get; set; }
    }
}
