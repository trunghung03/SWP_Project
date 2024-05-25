using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;
using DIAN_.Mapper;
using DIAN_.DTOs.ProductDTOs;

namespace DIAN_.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context; 
        }
        public async Task<List<ProductListDTO>> GetListAsync()
        {
            return await _context.Products
                                .Select(p => p.ToProductListDTO())
                                .ToListAsync();
        }
    }
}
