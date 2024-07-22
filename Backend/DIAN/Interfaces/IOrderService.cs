using DIAN_.DTOs.OrderDetailDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Interfaces
{
    public interface IOrderService
    {
        Task<PurchaseOrderDTO> CreatePurchaseOrderAsync(CreatePurchaseOrderDTO orderDto, string promoCode);
        bool SendEmailForVnPay(int orderId);
    }
}
