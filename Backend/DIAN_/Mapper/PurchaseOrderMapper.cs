using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class PurchaseOrderMapper
    {
        public static PurchaseOrderDTO ToPurchaseOrderDTO(this Purchaseorder order)
        {
            return new PurchaseOrderDTO
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                Date = order.Date,
                PaymentMethod = order.PaymentMethod,
                ShippingAddress = order.ShippingAddress,
                TotalPrice = order.TotalPrice,
                OrderStatus = order.OrderStatus,
                PromotionId = order.PromotionId,
                PayWithPoint = order.PayWithPoint,
                Note = order.Note
            };
        }

        public static Purchaseorder ToCreatePurchaseOrder(this CreatePurchaseOrderDTO dto)
        {
            return new Purchaseorder
            {
                UserId = dto.UserId,
                Date = dto.Date,
                PaymentMethod = dto.PaymentMethod,
                ShippingAddress = dto.ShippingAddress,
                TotalPrice = dto.TotalPrice,
                OrderStatus = dto.OrderStatus,
                PromotionId = dto.PromotionId ?? 0,
                PayWithPoint = dto.PayWithPoint,
                Note = dto.Note
            };
        }

        public static void ToUpdatePurchaseOrder(this Purchaseorder order, UpdatePurchaseOrderDTO dto)
        {
            order.UserId = dto.UserId;
            order.Date = dto.Date;
            order.PaymentMethod = dto.PaymentMethod;
            order.ShippingAddress = dto.ShippingAddress;
            order.TotalPrice = dto.TotalPrice;
            order.OrderStatus = dto.OrderStatus;
            order.PromotionId = dto.PromotionId ?? 0;
            order.PayWithPoint = dto.PayWithPoint;
            order.Note = dto.Note;
        }
    }
}
