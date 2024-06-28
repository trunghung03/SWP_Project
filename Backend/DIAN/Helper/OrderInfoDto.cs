namespace DIAN_.Helper
{
    public class OrderInfoDto
    {
        public long OrderId { get; set; }
        public long Amount { get; set; }
        public string OrderDesc { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }
        public string Status { get; set; } = string.Empty;

        public long PaymentTranId { get; set; }
        public string BankCode { get; set; } = string.Empty;
        public string PayStatus { get; set; } = string.Empty;
    }
}
