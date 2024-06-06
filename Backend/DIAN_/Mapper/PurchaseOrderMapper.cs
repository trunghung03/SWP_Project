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
                Name=order.Name,
                PhoneNumber=order.PhoneNumber,
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

        public static PurchaseOrderInfoDTO ToPurchaseOrderInfoDTO(this Purchaseorder order)
        {
            return new PurchaseOrderInfoDTO
            {
                PayWithPoint = order.PayWithPoint,
                 //$"{order.User.LastName} {order.User.FirstName}",
                FullName=order.Name,
                PhoneNumber = order.User.PhoneNumber,
                Address= order.User.Address,
                Note = order.Note,
                PaymentMethod = order.PaymentMethod,
                PromotionCode = order.Promotion?.Code ?? string.Empty,
                UserId = order.UserId,
                TotalPrice= order.TotalPrice,
                OrderStatus = order.OrderStatus,
                Date = order.Date,
            };
        }
        public static Purchaseorder ToCreatePurchaseOrder(this CreatePurchaseOrderDTO dto)
        {
            return new Purchaseorder
            {
                UserId = dto.UserId,
                Date = dto.Date,
                Name=dto.Name,
                PhoneNumber = dto.PhoneNumber,
                PaymentMethod = dto.PaymentMethod,
                ShippingAddress = dto.ShippingAddress,
                TotalPrice = dto.TotalPrice,
                OrderStatus = dto.OrderStatus,
                PromotionId = dto.PromotionId,
                PayWithPoint = dto.PayWithPoint,
                Note = dto.Note,
                SaleStaff = dto.SaleStaff,
                DeliveryStaff = dto.DeliveryStaff
            };
        }

        public static void ToUpdatePurchaseOrder(this Purchaseorder order, UpdatePurchaseOrderDTO dto)
        {
            order.UserId = dto.UserId;
            order.Date = dto.Date;
            order.Name = dto.Name;
            order.PhoneNumber = dto.PhoneNumber;
            order.PaymentMethod = dto.PaymentMethod;
            order.ShippingAddress = dto.ShippingAddress;
            order.TotalPrice = dto.TotalPrice;
            order.OrderStatus = dto.OrderStatus;
            order.PromotionId = dto.PromotionId ?? 0;
            order.PayWithPoint = dto.PayWithPoint;
            order.Note = dto.Note;
        }
        public static void ToUpdatePurchaseOrderStatus(this Purchaseorder order, string status)
        {
            order.OrderStatus = status;
        }
    }
}
