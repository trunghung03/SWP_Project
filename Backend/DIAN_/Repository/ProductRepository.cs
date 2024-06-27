using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using DIAN_.Mapper;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.Helper;

namespace DIAN_.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Product> CreateAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<Product?> DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product != null)
            {
                product.Status = false;
                await _context.SaveChangesAsync();
                return product;
            }
            return null;
        }

        public async Task<bool> ExistsMainDiamondAsync(int mainDiamondId)
        {
            return await _context.Diamonds.Where(s => s.Status).AnyAsync(d => d.DiamondId == mainDiamondId);
        }

        public async Task<bool> ExistsProCodeAsync(string proCode)
        {
            return await _context.Products
                .Where(p => p.Status)
                .AnyAsync(p => p.ProductCode == proCode);
        }

        public async Task<(List<Product>, int)> GetAllAsync(ProductQuery query)
        {
            var products = _context.Products
                .Where(p => p.Status)
                .Include(p => p.Category)
                .ThenInclude(c => c.Size)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                products = products.Where(p => EF.Functions.Like(p.Name, $"%{query.Name}%"));
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            var productList = await products
                .Skip(skipNumber)
                .Take(query.PageSize)
                .ToListAsync();

            var totalItems = await products.CountAsync();
            return (productList, totalItems);
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            var product = await _context.Products.Where(p => p.Status && p.ProductId == id)
                          .Include(p => p.Category).ThenInclude(c => c.Size)
                          .FirstOrDefaultAsync();
            if (product == null)
            {
                throw new Exception($"Product with id {id} not found.");
            }
            return product;
        }

        public async Task<List<Product>> GetByNameAsync(string name)
        {
            var products = await _context.Products
                                  .Where(p => p.Status && p.Name.Contains(name))
                                  .Include(p => p.MainDiamond) // Include the MainDiamond to get the shape
                                  .ToListAsync();
            return products;
        }

        public async Task<List<Product>> GetProductByCode(string code)
        {
            var products = await _context.Products.Where(p => p.ProductCode.Contains(code)).ToListAsync();
            if (products == null || !products.Any())
            {
                throw new KeyNotFoundException("Product does not exist");
            }
            return products;
        }

        public async Task<Product> GetDetailAsync(int id)
        {
            var product = await _context.Products
                                        .Include(p => p.MainDiamond)
                                        .Include(p => p.Category).ThenInclude(c => c.Size)
                                        .Where(p => p.Status && p.ProductId == id)
                                        .FirstOrDefaultAsync();

            if (product == null)
            {
                throw new KeyNotFoundException("Product does not exist");
            }
            return product;
        }

        public async Task<List<Product>> GetListAsync()
        {
            var products = await _context.Products
                                 .Include(p => p.MainDiamond) // Include the MainDiamond to get the shape
                                 .ToListAsync();

            return products;
        }

        public async Task<Product> UpdateProductAsync(Product product, int id)
        {
            var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (existingProduct != null)
            {
                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.LaborCost = product.LaborCost;
                existingProduct.ImageLinkList = product.ImageLinkList;
                existingProduct.CollectionId = product.CollectionId;
                existingProduct.CategoryId = product.CategoryId;
                await _context.SaveChangesAsync();
                return existingProduct;
            }
            return null;
        }

        public async Task<IEnumerable<Product>> GetLast8ProductsAsync()
        {
            return await _context.Products
                                 .OrderByDescending(p => p.ProductId) // Order by ProductId to get the latest products
                                 .Take(8)
                                 .ToListAsync();
        }
    }
}
