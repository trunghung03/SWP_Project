﻿using DIAN_.Models;

namespace DIAN_.DTOs.PurchaseOrderDTOs
{
    public class PurchaseOrderDetailDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public decimal TotalPrice { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
        public int? PromotionId { get; set; }

        //public Promotion MyProperty { get; set; }
        public bool? PayWithPoint { get; set; }
        public string Note { get; set; } = string.Empty;
        public int? SaleStaff { get; set; }
        public int? DeliveryStaff { get; set; }

    }
}
