namespace DIAN_.Helper
{
    public class DiamondQuery
    {
        public string? Name { get; set; } = null;

        public decimal? Cost { get; set; } = null;

        public string? SortBy { get; set; } = null;

        public bool Ascending { get; set; } = false;

        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 20;
    }
}
