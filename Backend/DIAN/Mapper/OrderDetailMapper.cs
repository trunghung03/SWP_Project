using DIAN_.DTOs.OrderDetailDto;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class OrderDetailMapper
    {
        public static Orderdetail FromCreateToOrderDetail(this CreateOrderDetailDto orderDetailDto)
        {
            return new Orderdetail
            {
                OrderId = orderDetailDto.OrderId,
                LineTotal = orderDetailDto.LineTotal,
                ProductId = orderDetailDto.ProductId,
                Size = orderDetailDto.Size ?? null,
                Status = true,
            };
        }
        public static Orderdetail FromUpdateToOrderDetail(this UpdateOrderDetailDto orderDetailDto)
        {
            return new Orderdetail
            {
                OrderId = orderDetailDto.OrderId,
                LineTotal = orderDetailDto.LineTotal,
                ProductId = orderDetailDto.ProductId,
                Size = orderDetailDto.Size ?? null,
                Status = orderDetailDto.Status,
            };
        }
        //public static Orderdetail ToDiamondFromUpdateCertificate(this UpdateCertificateDto updateCertificate, int id)
        //{
        //    return new Orderdetail
        //    {
        //        CertificateScan = updateCertificate.CertificateScan,
        //    };
        //}

    }
}
