namespace DIAN_.Helper
{
    public class DiamondQuery
    {
        public string? Name { get; set; } = null;

        public decimal? Cost { get; set; } = null;

        public string? SortBy { get; set; } = null;

        public bool Ascending { get; set; } = false;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 5;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > 0) ? value : 5;
        }
    }
}
