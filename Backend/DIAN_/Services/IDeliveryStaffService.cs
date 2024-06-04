using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;

namespace DIAN_.Services
{
    public interface IDeliveryStaffService
    {
        //just can view the purchaseorder must have the same delivery staff id 
        Task<List<PurchaseOrderDetailDto>> ViewListDeliveryOrders(Purchaseorder purchaseOrderDTO);

        //update status to completed, also update customer point
        Task<Purchaseorder> UpdateDeliveryStatus(string status, int orderId); 
    }
}
