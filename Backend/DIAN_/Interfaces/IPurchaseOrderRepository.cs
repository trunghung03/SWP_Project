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
        Task<List<Purchaseorder>> GetPurchaseOrderStatusAsync(string status, int id);

        //just can view the purchaseorder must have the same sale staff id
        Task<List<Purchaseorder>> GetListSalesOrderAssign(int staffId);

        //just can view the purchaseorder must have the same delivery staff id
        Task<List<Purchaseorder>> GetListDeliOrderAssign(int staffId);

        //Use w point or not
        Task<Purchaseorder?> CheckUsedPoint(bool payWithPoint, int userId);
    }
}
