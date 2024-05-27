using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.CategoryDTO
{
    public class CategoryDetailDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public List<string> Size { get; set; }
    }
}
