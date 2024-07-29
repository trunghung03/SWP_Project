namespace DIAN_.Helper
{
    public class PurchaseOrderQuerry
    {
        public string? SearchTerm { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public string Status { get; set; } = "default";
    }
}
