using DIAN_.DTOs.OrderDetailDto;
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
                Name = order.Name,
                PhoneNumber = order.PhoneNumber,
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
                Address = order.User.Address,
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
                Name = dto.Name,
                PhoneNumber = dto.PhoneNumber,
                PaymentMethod = dto.PaymentMethod,
                ShippingAddress = dto.ShippingAddress,
                TotalPrice = dto.TotalPrice,
                OrderStatus = dto.OrderStatus,
                PromotionId = dto.PromotionId ?? 0,
                PayWithPoint = dto.PayWithPoint,
                Note = dto.Note,
                SaleStaff = dto.SaleStaff,
                DeliveryStaff = dto.DeliveryStaff
            };
        }

        public static Orderdetail ToOrderDetail(CreateOrderDetailDto dto)
        {
            return new Orderdetail
            {
                OrderDetailId = dto.OrderId,
                OrderId = dto.OrderId,
                LineTotal = dto.LineTotal,
                ProductId = dto.ProductId,
                ShellMaterialId = dto.ShellMaterialId,
                SubDiamondId = dto.SubDiamondId,
                Size = dto.Size
            };
        }

        //public static List<Orderdetail> ToOrderDetails(List<CreateOrderDetailDto> dtos)
        //{
        //    return dtos.Select(dto => ToOrderDetail(dto)).ToList();
        //}

        public static Purchaseorder ToUpdatePurchaseOrder(this UpdatePurchaseOrderDTO dto, int id)
        {
            return new Purchaseorder
            {
                Date = dto.Date,
                Name = dto.Name,
                PhoneNumber = dto.PhoneNumber,
                PaymentMethod = dto.PaymentMethod,
                ShippingAddress = dto.ShippingAddress,
                TotalPrice = dto.TotalPrice,
                OrderStatus = dto.OrderStatus,
               // PromotionId = dto.PromotionId ?? 0,
                PayWithPoint = dto.PayWithPoint,
                Note = dto.Note
            };
        }
        public static Purchaseorder ToUpdatePurchaseOrderStatus(this Purchaseorder order, string status)
        {
            return new Purchaseorder
            {
                OrderStatus = status
            };
        }


        public static Purchaseorder ToUpdateTotalPrice(this Purchaseorder order, decimal totalPrice)
        {
            return new Purchaseorder
            {
                TotalPrice = totalPrice
            };
        }
        public static PurchaseOrderDetailDto ToPurchaseOrderDetail(this Purchaseorder dto)
        {
            return new PurchaseOrderDetailDto
        {
            UserId = dto.UserId,
            Date = DateTime.Now,
            Name = dto.Name,
            PhoneNumber = dto.PhoneNumber,
            PaymentMethod = dto.PaymentMethod,
            ShippingAddress = dto.ShippingAddress,
            TotalPrice = dto.TotalPrice,
            OrderStatus = dto.OrderStatus,
            PromotionId = dto.PromotionId ?? 0,
            PayWithPoint = dto.PayWithPoint,
            Note = dto.Note,
            SaleStaff = dto.SaleStaff,
            DeliveryStaff = dto.DeliveryStaff

        };
        }
    }
}
