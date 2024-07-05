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
                ShellMaterialId = orderDetailDto.ShellMaterialId ?? null,
                Size = orderDetailDto.Size ?? null,
                CertificateScan = orderDetailDto.CertificateScan,
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
                ShellMaterialId = orderDetailDto.ShellMaterialId ?? null,
                Size = orderDetailDto.Size ?? null,
                CertificateScan = orderDetailDto.CertificateScan,
                Status = orderDetailDto.Status,
            };
        }
        public static Orderdetail ToDiamondFromUpdateCertificate(this UpdateCertificateDto updateCertificate, int id)
        {
            return new Orderdetail
            {
                CertificateScan = updateCertificate.CertificateScan,
            };
        }

    }
}
