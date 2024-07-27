using System.ComponentModel.DataAnnotations;


namespace DIAN_.DTOs.ArticleDTO
{
    public class UpdateArticleRequestDto
    {

        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title must not exceed 100 characters.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Content is required.")]
        public string Content { get; set; } = string.Empty;

        [Required(ErrorMessage = "Image URL is required.")]
        public string Image { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tag is required.")]
        [StringLength(50, ErrorMessage = "Tag must not exceed 50 characters.")]
        public string Tag { get; set; } = string.Empty;
    }
}
