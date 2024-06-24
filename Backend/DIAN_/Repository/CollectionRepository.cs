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
            if (await _context.Collections.AnyAsync(c => c.Name == collection.Name && c.CollectionId==collection.CollectionId)) { return null; }

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
            var collections = await _context.Collections
                .ToListAsync();

            return collections;
        }

        public async Task<Collection?> GetByIdAsync(int id)
        {
            var collection = await _context.Collections
                .FirstOrDefaultAsync(c => c.CollectionId == id);

            if (collection == null) { return null; }

            return collection;
        }

        public async Task<Collection?> UpdateAsync(int id, Collection collection)
        {
            // Check for duplicates
            if (await _context.Collections.AnyAsync(c => c.Name == collection.Name)) { return null; }
            var updateCollection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);
            if (updateCollection == null) return null;

            updateCollection.Name = collection.Name;
            updateCollection.Description = collection.Description;
            updateCollection.Status = collection.Status;

            await _context.SaveChangesAsync();
            return updateCollection;
        }

        public async Task<bool> UpdateCollectionStatus(int id)
        {
            var collection = await _context.Collections.FirstOrDefaultAsync(c => c.CollectionId == id);
            if (collection == null) return false;
            collection.Status = !collection.Status; // Toggles the status
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Collection> GetLatestCollectionAsync()
        {
            return await _context.Collections
                .OrderByDescending(c => c.CollectionId)
                .FirstOrDefaultAsync();
        }
    }
}
