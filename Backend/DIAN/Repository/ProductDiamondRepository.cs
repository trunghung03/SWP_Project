using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class ProductDiamondRepository : IProductDiamondRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductDiamondRepository(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task<ProductDiamond?> CreateAsync(ProductDiamond productDiamond)
        {
            await _context.ProductDiamonds.AddAsync(productDiamond);
            await _context.SaveChangesAsync();
            return productDiamond;
        }

        public async Task<IEnumerable<ProductDiamond>> CreateRangeAsync(IEnumerable<ProductDiamond> productDiamonds)
        {
            _context.ProductDiamonds.AddRange(productDiamonds);
            await _context.SaveChangesAsync();
            return productDiamonds;
        }

        public async Task<ProductDiamond?> DeleteAsync(int productId)
        {
            var existingProductDiamond = await _context.ProductDiamonds.FirstOrDefaultAsync(x => x.ProductId == productId);
            if (existingProductDiamond != null)
            {
                existingProductDiamond.Status = false;
                await _context.SaveChangesAsync();
                return existingProductDiamond;
            }
            return null;
        }

        public async Task<List<ProductDiamond>> GetAllAsync()
        {
            var productDiamonds = await _context.ProductDiamonds
                  .Where(s => s.Status)
                  .ToListAsync();
            return productDiamonds;
        }

        public async Task<ProductDiamond?> GetByProductIdAsync(int productId)
        {
            var existingProductDiamond = await _context.ProductDiamonds
               .Where(s => s.Status && s.ProductId == productId)
               .FirstOrDefaultAsync();
            if (existingProductDiamond == null) throw new KeyNotFoundException("The combination does not exist");
            return existingProductDiamond;
        }

        public async Task<ProductDiamond?> UpdateAsync(int productId, ProductDiamond productDiamond)
        {
            var existingProductDiamond = await _context.ProductDiamonds.FirstOrDefaultAsync(x => x.ProductId == productId);
            if (existingProductDiamond != null)
            {
                existingProductDiamond.ProductId = productDiamond.ProductId;
                existingProductDiamond.DiamondId = productDiamond.DiamondId;
                existingProductDiamond.Status = productDiamond.Status;
                await _context.SaveChangesAsync();
                return existingProductDiamond;
            }
            return null;
        }
    }
}
