using System.ComponentModel.DataAnnotations;


namespace DIAN_.DTOs.ArticleDTO
{
    public class UpdateArticleRequestDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        [Required]
        public string Image { get; set; } = string.Empty;
        [Required]
        public string Tag { get; set; } = string.Empty;
    }
}
