using DIAN_.Models;

namespace DIAN_.DTOs.ArticleDTO
{
    public class CreateArticleRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public string Image { get; set; }

        public string Tag { get; set; } = string.Empty;

        public int Employee { get; set; }

        public bool Status { get; set; }
    }
}
