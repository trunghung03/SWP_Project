namespace DIAN_.DTOs.ArticleDTO
{
    public class ArticleDto
    {
        public int ArticleID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string? CreatedBy { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Tag { get; set; } = string.Empty;
    }
}
