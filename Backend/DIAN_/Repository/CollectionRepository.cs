using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class CollectionRepository : ICollectionRepository
    {
        private readonly ApplicationDbContext _context;
        public CollectionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Collection?> CreateAsync(Collection collection)
        {
            // Check for duplicates
            if (await _context.Collections.AnyAsync(c => c.Name == collection.Name)) { return null; }

            await _context.Collections.AddAsync(collection);
            await _context.SaveChangesAsync();
            return collection;
        }

        public async Task<Collection?> DeleteAsync(int id)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);

            if (collection == null) { return null; }

            _context.Collections.Remove(collection);
            await _context.SaveChangesAsync();
            return collection;
        }

        public async Task<List<Collection>> GetAllAsync()
        {
            var collections = await _context.Collections.ToListAsync();

            return collections;
        }

        public async Task<Collection?> GetByIdAsync(int id)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);

            if (collection == null) { return null; }

            return collection;
        }

        public async Task<Collection?> UpdateAsync(int id, UpdateCollectionDTO collectionDTO)
        {
            // Check for duplicates
            if (await _context.Collections.AnyAsync(c => c.Name == collectionDTO.Name)) { return null; }
            var collection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);
            if (collection == null) return null;

            collection.Name = collectionDTO.Name;
            collection.Description = collectionDTO.Description;
            collection.Status = collectionDTO.Status ?? true;

            await _context.SaveChangesAsync();
            return collection;
        }
    }
}
