using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ISalesStaffService
    {
        Task<List<PurchaseOrderDetailDto>> ViewListOrdersByStatus(string status, int id);

        Task<List<PurchaseOrderDetailDto>> ViewListOrdersAssign(int staffId);

        Task<Purchaseorder> UpdateOrderStatus(string status, int orderId);

        Task DeleteUnpaidOrdersOlderThan3Days();


    }
}
