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
    

        
}
