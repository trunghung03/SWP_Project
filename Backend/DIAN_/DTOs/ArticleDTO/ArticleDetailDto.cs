namespace DIAN_.DTOs.ArticleDTO
{
    public class ArticleDetailDto
    {
        public int ArticleID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; } = string.Empty;
        public string Image { get; set; }
        public string Tag { get; set; }
    }
}
