using DIAN_.DTOs.OrderDetailDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Services
{
    public interface IOrderService
    {
        Task<Purchaseorder> CreatePurchaseOrderAsync(CreatePurchaseOrderDTO createOrderDto);
        Task<Purchaseorder> UpdatePurchaseOrderAsync(Purchaseorder order, int orderId);
        Task<Purchaseorder> UpdatePurchaseOrderStatusAsync(int orderId, Purchaseorder statusDto);
        Task<bool> CompleteOrderAsync(int orderId);
        //public Task<ActionResult<PurchaseOrderDTO>> CreateOrder(CreatePurchaseOrderDTO createOrderDto);



        //Task<bool> CompleteOrderAsync(int orderId);

        ////public ActionResult<List<Orderdetail>> SubmitOrderDetails(int orderId, List<CreateOrderDetailDto> orderDetailDtos)
    }
}
