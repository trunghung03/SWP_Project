using DIAN_.DTOs.ProductDTOs;
using DIAN_.Helper;
using DIAN_.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetListAsync();
        Task<Product> GetByIdAsync(int id);
        Task<Product> CreateAsync(Product product);

        Task<ManageProductDetailDto> GetProductDetail(int productId);
        Task<Product> UpdateProductAsync(Product product, int id);
        Task<Product?> DeleteAsync(int id);
        Task<Product> GetDetailAsync(int id);
        Task<(List<Product>, int)> GetAllAsync(ProductQuery query);
        Task<List<Product>> GetByNameAsync(string name);
        Task<bool> ExistsMainDiamondAsync(int mainDiamondId);
        Task<bool> ExistsProCodeAsync(string proCode);
        Task<List<Product>> GetProductByCode(string code);
        Task<IEnumerable<Product>> GetLast8ProductsAsync();

        Task<bool> ExistsMainDiamondAttributeAsync(int mainDiamondAttributeId);
        Task<bool> ExistsSubDiamondAttributeAsync(int subDiamondAttributeId);
    }
}
