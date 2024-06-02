namespace DIAN_.DTOs.ArticleDTO
{
    public class ArticleList
    {
        public int ArticleID { get; set; }
        public string Title { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Image { get; set; }
        public string Tag { get; set; }

    }
}
