using DIAN_.DTOs.OrderDetailDto;
using DIAN_.Models;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.PurchaseOrderDTOs
{
    public class CreatePurchaseOrderDTO
    {
        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Invalid date format.")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must not exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required.")]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Payment method is required.")]
        [StringLength(50, ErrorMessage = "Payment method must not exceed 50 characters.")]
        public string PaymentMethod { get; set; } = string.Empty;

        [Required(ErrorMessage = "Shipping address is required.")]
        public string ShippingAddress { get; set; } = string.Empty;

        [Required(ErrorMessage = "Total price is required.")]
        [Range(0, double.MaxValue, ErrorMessage = "Total price must be a non-negative number.")]
        public decimal TotalPrice { get; set; }

        [Required(ErrorMessage = "Order status is required.")]
        public string OrderStatus { get; set; } = string.Empty;

        public int? PromotionId { get; set; }

        public bool? PayWithPoint { get; set; }

        [StringLength(500, ErrorMessage = "Note must not exceed 500 characters.")]
        public string Note { get; set; } = string.Empty;

        [Required(ErrorMessage = "Sale staff ID is required.")]
        public int SaleStaff { get; set; }

        [Required(ErrorMessage = "Delivery staff ID is required.")]
        public int DeliveryStaff { get; set; }
    }

}
