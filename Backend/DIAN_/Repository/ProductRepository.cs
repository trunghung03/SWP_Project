using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using DIAN_.Mapper;
using DIAN_.DTOs.ProductDTOs;
using Microsoft.AspNetCore.Http.HttpResults;
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
        public async Task<ProductDTO> CreateAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product.ToProductDTO();
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (product != null)
            {
                product.Status = false;
                await _context.SaveChangesAsync();
            }
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

        public async Task<(List<ProductDTO>, int)> GetAllAsync(ProductQuery query)
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
                .Select(p => p.ToProductDTO())
                .ToListAsync();

            var totalItems = await products.CountAsync();
            return (productList, totalItems);
        }
        /*return await _context.Products.Where(p => p.Status)
                     .Include(p => p.Category).ThenInclude(c => c.Size)
                     .Select(p => p.ToProductDTO()).ToListAsync();*/

        public async Task<ProductDTO> GetByIdAsync(int id)
        {
            var product = await _context.Products.Where(p => p.Status && p.ProductId == id)
                          .Include(p => p.Category).ThenInclude(c => c.Size)
                          .FirstOrDefaultAsync();
            if (product == null)
            {
                throw new Exception($"Product with id {id} not found.");
            }
            return product.ToProductDTO();
        }

        public async Task<List<ProductListDTO>> GetByNameAsync(string name)
        {
            var products = await _context.Products
                                  .Where(p => p.Status && p.Name.Contains(name))
                                  .Include(p => p.MainDiamond) // Include the MainDiamond to get the shape
                                  .ToListAsync();

            return products.Select(p => p.ToProductListDTO(p.MainDiamond)).ToList();
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


        public async Task<ProductDetailDTO> GetDetailAsync(int id)
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

            var subDiamondColors = await _context.Diamonds.Select(d => d.Color).ToListAsync();
            return product.ToProductDetailDTO(product.MainDiamond, subDiamondColors);
        }

        public async Task<List<ProductListDTO>> GetListAsync()
        {
            var products = await _context.Products
                                 .Include(p => p.MainDiamond) // Include the MainDiamond to get the shape
                                 .ToListAsync();

            return products.Select(p => p.ToProductListDTO(p.MainDiamond)).ToList();
        }

        public async Task<ProductDTO> UpdateAsync(ProductDTO productDTO)
        {
            var product = await _context.Products.FindAsync(productDTO.ProductId);
            if (product == null)
            {
                throw new KeyNotFoundException("Product does not exist");
            }

            // Map the DTO properties to the entity
            product.Name = productDTO.Name;
            product.Description = productDTO.Description;
            product.LaborCost = productDTO.LaborPrice;
            product.ImageLinkList = productDTO.ImageLinkList;
            product.CollectionId = productDTO.CollectionId;

            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return product.ToProductDTO();
        }

        public async Task<Product> UpdateProductAsync(Product product, int id)
        {
            var existingProduct =await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
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

        public async Task<IEnumerable<ProductListDTO>> GetLast8ProductsAsync()
        {
            var products = await _context.Products
                                         .OrderByDescending(p => p.ProductId) // Order by ProductId to get the latest products
                                         .Take(8)
                                         .ToListAsync();

            var diamonds = await _context.Diamonds
                                         .Where(d => products.Select(p => p.MainDiamondId).Contains(d.DiamondId))
                                         .ToListAsync();

            var productDTOs = products.Select(p =>
            {
                var diamond = diamonds.FirstOrDefault(d => d.DiamondId == p.MainDiamondId);

                if (diamond == null) return null;

                return p.ToProductListDTO(diamond);
            }).ToList();

            return productDTOs;
        }
    }
}
