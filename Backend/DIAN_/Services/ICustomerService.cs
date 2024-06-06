using DIAN_.DTOs.AccountDTO;
using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;

namespace DIAN_.Services
{
    public interface ICustomerService
    {
        Task<PurchaseOrderDTO> ViewHistoryOrdersList(PurchaseOrderDTO purchaseOrderDTO);

        Task<Orderdetail> ViewOrderDetails(int orderId);

        Task<UpdateCustomerPointDto> AccumualatePoint(string status, int orderId);
    }
}
