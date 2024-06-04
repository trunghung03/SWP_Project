using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;

namespace DIAN_.Services
{
    public interface ISalesStaffService
    {
        Task<List<PurchaseOrderDTO>> ViewListOrdersByStatus(string status);

        Task<List<PurchaseOrderDetailDto>> ViewListOrdersAssign(Purchaseorder purchaseOrderDTO);

        Task<Purchaseorder> UpdateOrderStatus(string status, int orderId);

        Task<bool> PrepareCertificate(int orderId); //prepare pdf

        Task<Warranty> PrepareWarranty(int orderId);     //prepare pdf

        Task<string> GeneratePdfAsync(Diamond diamond); //gen pdf?


    }
}
