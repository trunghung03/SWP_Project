using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IProductDiamondRepository
    {
        Task<List<ProductDiamond>> GetAllAsync();
        Task<ProductDiamond?> GetByProductIdAsync(int productId);
        Task<ProductDiamond?> CreateAsync(ProductDiamond productDiamond);
        Task<IEnumerable<ProductDiamond>> CreateRangeAsync(IEnumerable<ProductDiamond> productDiamonds);
        Task<ProductDiamond?> UpdateAsync(int productId, ProductDiamond productDiamond);
        Task<ProductDiamond?> DeleteAsync(int productId);
    }
}
