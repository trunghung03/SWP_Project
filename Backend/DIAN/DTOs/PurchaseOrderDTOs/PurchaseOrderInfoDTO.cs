namespace DIAN_.DTOs.PurchaseOrderDTOs
{
    public class PurchaseOrderInfoDTO
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public string PromotionCode { get; set; } = string.Empty;
        public bool? PayWithPoint { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime Date { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
    }
}
