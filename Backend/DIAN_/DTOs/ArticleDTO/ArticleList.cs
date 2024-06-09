namespace DIAN_.DTOs.ArticleDTO
{
    public class ArticleList
    {
        public int ArticleID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Tag { get; set; } = string.Empty;

    }
}
