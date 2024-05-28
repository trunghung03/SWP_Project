namespace DIAN_.DTOs.ArticleDTO
{
    public class ArticleDto
    {
        public string Title { get; set; } 
        public string Content { get; set; } 
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; }
        public string Image { get; set; }
        public string Tag { get; set; }
    }
}
