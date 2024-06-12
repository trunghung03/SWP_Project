using DIAN_.Models;
using System.ComponentModel.DataAnnotations;


namespace DIAN_.DTOs.ArticleDTO
{
    public class CreateArticleRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string Image { get; set; } = string.Empty;

        [Required]
        public string Tag { get; set; } = string.Empty;

        [Required]
        public int Employee { get; set; }

        [Required]
        public bool Status { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
