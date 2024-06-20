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
        Task<List<ProductListDTO>> GetListAsync();
        Task<ProductDTO> GetByIdAsync(int id);
        Task<ProductDTO> CreateAsync(Product product);
        Task<Product> UpdateProductAsync(Product product, int id);
        Task DeleteAsync(int id);
        Task<ProductDetailDTO> GetDetailAsync(int id);
        Task<(List<ProductDTO>, PaginationMetadata)> GetAllAsync(ProductQuery query);
        Task<List<ProductListDTO>> GetByNameAsync(string name);
        Task<bool> ExistsMainDiamondAsync(int mainDiamondId);
        Task<bool> ExistsProCodeAsync(string proCode);
    }
}
