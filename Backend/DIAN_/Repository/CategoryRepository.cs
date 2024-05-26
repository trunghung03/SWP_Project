using DIAN_.Data;
using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Category?> CreateAsync(CreateCategoryDTO categoryDTO)
        {
            // Check for duplicates
            if (await _context.Categories.AnyAsync(c => c.Name == categoryDTO.Name)) { return null; }

            var category = new Category
            {
                Name = categoryDTO.Name,
                Status = true,
            };

            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category?> DeleteAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category == null) { return null; }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            var categories = await _context.Categories.ToListAsync();

            return categories;
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == id);

            if (category == null) { return null; }

            return category;
        }

        public async Task<Category?> UpdateAsync(int id, UpdateCategoryDTO categoryDTO)
        {
            // Check for duplicates
            if (await _context.Categories.AnyAsync(c => c.Name == categoryDTO.Name)) { return null; }
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.CategoryId == id);
            if (category == null) return null;

            category.Name = categoryDTO.Name;
            category.Status = categoryDTO.Status ?? true;

            await _context.SaveChangesAsync();
            return category;
        }
    }
}
