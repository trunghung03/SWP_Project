﻿using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using DIAN_.Mapper;
using DIAN_.DTOs.ProductDTOs;
using Microsoft.AspNetCore.Http.HttpResults;

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
            return await _context.Diamonds.AnyAsync(d => d.DiamondId == mainDiamondId);
        }

        public async Task<bool> ExistsProCodeAsync(string proCode)
        {
            return await _context.Products.AnyAsync(p => p.ProductCode == proCode);
        }

        public async Task<List<ProductDTO>> GetAllAsync()
        {
            return await _context.Products
                         .Select(p => p.ToProductDTO()).ToListAsync();
        }

        public async Task<ProductDTO> GetByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product?.ToProductDTO();
        }

        public async Task<List<ProductListDTO>> GetByNameAsync(string name)
        {
            return await _context.Products
                                 .Where(p => p.Name.Contains(name))
                                 .Select(p => p.ToProductListDTO())
                                 .ToListAsync();
        }

        public async Task<ProductDetailDTO> GetDetailAsync(int id)
        {
            var product = await _context.Products
                                        .Include(p => p.MainDiamond)
                                        .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return null;
            }

            var subDiamondColors = await _context.Diamonds.Select(d => d.Color).ToListAsync();
            return product.ToProductDetailDTO(product.MainDiamond, subDiamondColors);
        }

        public async Task<List<ProductListDTO>> GetListAsync()
        {
            return await _context.Products
                                .Select(p => p.ToProductListDTO())
                                .ToListAsync();
        }

        public async Task<ProductDTO> UpdateAsync(ProductDTO productDTO)
        {
            var product = await _context.Products.FindAsync(productDTO.ProductId);
            if (product == null)
            {
                return null;
            }

            // Map the DTO properties to the entity
            product.Name = productDTO.Name;
            product.Description = productDTO.Description;
            product.Price = productDTO.Price;
            product.LaborPrice = productDTO.LaborPrice;
            product.ImageLinkList = productDTO.ImageLinkList;
            product.ChargeUp = productDTO.ChargeUp;
            product.MainDiamondId = productDTO.MainDiamondId;
            product.SubDiamondAmount = productDTO.SubDiamondAmount;
            product.ProductCode = productDTO.ProductCode;
            product.MainDiamondAmount = productDTO.MainDiamondAmount;
            product.ShellAmount = productDTO.ShellAmount;
            product.CollectionId = productDTO.CollectionId;

            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return product.ToProductDTO();
        }

    }
}