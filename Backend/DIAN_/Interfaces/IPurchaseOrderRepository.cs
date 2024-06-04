using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IPurchaseOrderRepository
    {
        Task<List<Purchaseorder>> GetAllPurchaseOrderAsync(); //not need to know who is assigned
        Task<Purchaseorder> GetPurchaseOrderInfoAsync(int orderId);
        Task<Purchaseorder> CreatePurchaseOrderAsync(Purchaseorder order);
        Task<Purchaseorder> UpdatePurchaseOrderAsync(Purchaseorder order, int orderId);
        Task<Purchaseorder> GetPurchasrOrderById(int purchasrId);
        Task<Purchaseorder> UpdatePurchaseOrderStatusAsync(int orderId, string status);
        Task<List<Purchaseorder>> GetPurchaseOrderStatusAsync(string status);

        //Task<List<Purchaseorder>> GetListOrderAssign(int staffId);
        //Task<Purchaseorder> AssignStaff(int orderId, Purchaseorder order);
    }
}
