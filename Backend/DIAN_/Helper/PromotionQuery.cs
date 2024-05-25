namespace DIAN_.Helper
{
    public class PromotionQuery
    {
        public string Name { get; set; }

        public decimal Amount { get; set; }

        //public DateTime StartDate { get; set; }

        //public DateTime EndDate { get; set; }

        public string? SortBy { get; set; } = null;

       public bool Ascending { get; set; } = true; // true for ascending, false for descending

        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 20;
    }
}

