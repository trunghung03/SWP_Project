using DIAN_.DTOs.OrderDetailDto;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Interfaces
{
    public interface IOrderService
    {
        public Task<ActionResult<PurchaseOrderDTO>> CreatePurchaseOrderInformation(CreatePurchaseOrderDTO createOrderDto);

        //public ActionResult<List<Orderdetail>> SubmitOrderDetails(int orderId, List<CreateOrderDetailDto> orderDetailDtos)
    }
}
