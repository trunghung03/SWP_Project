namespace DIAN_.DTOs.ArticleDTO
{
    public class UpdateArticleRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public string Image { get; set; }

        public string Tag { get; set; } = string.Empty;

        public bool Status { get; set; }
    }
}
