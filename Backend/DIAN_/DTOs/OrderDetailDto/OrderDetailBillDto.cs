using DIAN_.DTOs.ProductDTOs;
using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.OrderDetailDto
{
    public class OrderBillDto
    {
        public int OrderId { get; set; }   
        public int UserId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public string PaymentMethod { get; set; }

        public string PromotionCode { get; set; }
        public decimal PromotionAmount { get; set; }
        public bool? PayWithPoint { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime Date { get; set; }
        public string OrderStatus { get; set; }
        public List<OrderBillProductDetailDto> ProductDetails { get; set; } = new List<OrderBillProductDetailDto>();
    }

}
