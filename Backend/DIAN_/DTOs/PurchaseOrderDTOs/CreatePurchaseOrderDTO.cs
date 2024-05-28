namespace DIAN_.DTOs.PurchaseOrderDTOs
{
    public class CreatePurchaseOrderDTO
    {
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public string PaymentMethod { get; set; }
        public string ShippingAddress { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderStatus { get; set; }
        public int? PromotionId { get; set; }
        public bool? PayWithPoint { get; set; }
        public string Note { get; set; }
    }
}
