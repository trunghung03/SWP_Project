using DIAN_.DTOs.ProductDTOs;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.OrderDetailDto
{
    public class OrderBillDto
    {
        public int OrderId { get; set; }   
        public int UserId { get; set; }

        public string Email { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Note { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;

        public string PromotionCode { get; set; } = string.Empty;
        public decimal? PromotionAmount { get; set; }
        public bool? PayWithPoint { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime Date { get; set; } 
        public string OrderStatus { get; set; } = string.Empty;
        public List<OrderBillProductDetailDto> ProductDetails { get; set; } = new List<OrderBillProductDetailDto>();
    }

}
