using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IPurchaseOrderRepository
    {
        Task<IEnumerable<PurchaseOrderDTO>> GetAllAsync();
        Task<PurchaseOrderInfoDTO> GetInfoAsync(int orderId);
        Task<PurchaseOrderDTO> CreateAsync(Purchaseorder order);
        Task<PurchaseOrderDTO> UpdateAsync(Purchaseorder order);

    }
}
