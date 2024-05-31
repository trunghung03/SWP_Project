namespace DIAN_.DTOs.ArticleDTO
{
    public class UpdatedArticleDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Tag { get; set; } = string.Empty;
    }
}
