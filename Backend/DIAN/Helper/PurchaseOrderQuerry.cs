namespace DIAN_.Helper
{
    public class PurchaseOrderQuerry
    {
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > 0) ? value : 6;
        }
        public string Status { get; set; } = "default";
    }
}
