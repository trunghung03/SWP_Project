using DIAN_.DTOs.OrderDetailDto;
using DIAN_.Helper;
using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IOrderDetailRepository
    {
        Task<List<Orderdetail>> GetAllAsync();
        Task<Orderdetail?> GetByIdAsync(int id);
        Task<List<Orderdetail>?> GetByOrderIdAsync(int id);
        Task<Orderdetail?> CreateAsync(Orderdetail orderdetail);
        Task<Orderdetail?> UpdateAsync(Orderdetail orderdetail, int id);
        Task<Orderdetail?> DeleteAsync(int id);

        Task<OrderBillDto?> ViewOrderBillAsync(int orderId);

    }
}
