using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IDeliveryStaffService
    {
        //just can view the purchaseorder must have the same delivery staff id 
        Task<(List<PurchaseOrderDetailDto> Orders, int TotalCount)> ViewListDeliveryOrders(int deliStaffId, PurchaseOrderQuerry querry);
        Task<List<PurchaseOrderDetailDto>> ViewListOrdersByStatus(string status, int deliveryId);

        //update status to completed, also update customer point
        Task<Purchaseorder> UpdateDeliveryStatus(string status, int orderId);
    }
}
