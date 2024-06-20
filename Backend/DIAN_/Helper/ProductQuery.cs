namespace DIAN_.Helper
{
    public class ProductQuery
    {
        public string? Name { get; set; } = null;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 7;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > 0) ? value : 7;
        }
    }
    public class PaginationMetadata
    {
        public int TotalItems { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
    }

        
}
