using DIAN_.DTOs.OrderDetailDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Services
{
    public interface IOrderService
    {
        PurchaseOrderDTO CreatePurchaseOrderAsync(CreatePurchaseOrderDTO orderDto, string promoCode);
        Task<decimal> CheckUsedPoints(int userId, decimal totalPrice, bool usePoints);

        Task<decimal> ApplyCoupon(string couponCode, decimal totalPrice);
       // Task<Purchaseorder> UpdatePurchaseOrderAsync(Purchaseorder order, int orderId);
       //Task<Purchaseorder> UpdatePurchaseOrderStatusAsync(int orderId, Purchaseorder statusDto);
       // Task<bool> CompleteOrderAsync(int orderId);
       //public Task<ActionResult<PurchaseOrderDTO>> CreateOrder(CreatePurchaseOrderDTO createOrderDto);


        //Task<bool> CompleteOrderAsync(int orderId);

        ////public ActionResult<List<Orderdetail>> SubmitOrderDetails(int orderId, List<CreateOrderDetailDto> orderDetailDtos)
    }
}
