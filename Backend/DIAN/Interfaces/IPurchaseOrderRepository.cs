using DIAN_.DTOs.PurchaseOrderDTOs;
using DIAN_.Models;
using DIAN_.Helper;
namespace DIAN_.Interfaces
{
    public interface IPurchaseOrderRepository
    {
        Task<List<Purchaseorder>> GetAllPurchaseOrderAsync(PurchaseOrderQuerry querry); //not need to know who is assigned
        Task<Purchaseorder> GetPurchaseOrderInfoAsync(int orderId);
        Task<Purchaseorder> CreatePurchaseOrderAsync(Purchaseorder order);
        Task<Purchaseorder> UpdatePurchaseOrderAsync(Purchaseorder order, int orderId);
        Task<Purchaseorder> GetPurchasrOrderById(int purchasrId);
        Task<Purchaseorder> UpdatePurchaseOrderStatusAsync(int orderId, string status);
        Task<List<Purchaseorder>> GetPurchaseOrderStatusAsync(string status, int id);
        Task<List<Purchaseorder>> DeliveryGetPurchaseOrderStatusAsync(string status, int id);

        //just can view the purchaseorder must have the same sale staff id
        Task<(List<Purchaseorder> Orders, int TotalCount)> GetListSalesOrderAssign(int staffId, PurchaseOrderQuerry querry);

        //just can view the purchaseorder must have the same delivery staff id
        Task<(List<Purchaseorder> Orders, int TotalCount)> GetListDeliOrderAssign(int staffId, PurchaseOrderQuerry querry);

        Task<Purchaseorder?> DeleteOrder(int orderid);

        Task<List<Purchaseorder>> GetUnpaidOrdersOlderThan(DateTime cutoffDate);

        //Use w point or not
        Task<Purchaseorder?> CheckUsedPoint(bool payWithPoint, int userId);
    }
}
