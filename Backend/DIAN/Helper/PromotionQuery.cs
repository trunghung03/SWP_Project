namespace DIAN_.Helper
{
    public class PromotionQuery
    {
        public string? Name { get; set; } = null;

        public decimal? Amount { get; set; } = null;

        public DateTime StartDate { get; set; }

        //public DateTime EndDate { get; set; }

        public string? SortBy { get; set; } = null;

        public bool Ascending { get; set; } = false;

        //public int PageNumber { get; set; } = 1;

        //public int PageSize { get; set; } = 20;
    }
}

