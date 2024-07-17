namespace DIAN_.Helper
{
    public class ShellQuerry
    {
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > 0) ? value : 6;
        }
    }
}
