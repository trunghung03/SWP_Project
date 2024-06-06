namespace DIAN_.DTOs.PurchaseOrderDTOs
{
    public class PurchaseOrderInfoDTO
    {
        public int UserId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public string PaymentMethod { get; set; }
        public string PromotionCode { get; set; }
        public bool? PayWithPoint { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime Date { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
    }
}
