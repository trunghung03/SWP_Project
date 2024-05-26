using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class SizeRepository : ISizeRepository
    {
        private readonly ApplicationDbContext _context;
        public SizeRepository(ApplicationDbContext context)
        {
            this._context = context;
        }


        public async Task<Size> CreateSizeAsync(Size sizeModel)
        {
            await _context.Sizes.AddAsync(sizeModel);
            await _context.SaveChangesAsync();
            return sizeModel;
        }

        public async Task<Size?> DeleteSizeAsync(int id)
        {
            var existingSize = await _context.Sizes.FirstOrDefaultAsync(x => x.CategoryId == id);
            if (existingSize != null)
            {
                _context.Sizes.Remove(existingSize);
                await _context.SaveChangesAsync();
                return existingSize;
            }
            return null;
        }

        //    public async Task<List<Size>> GetAllSizeAsync()
        //{
        //    var sizes = await _context.Sizes.ToListAsync();

        //    return sizes;
        //}

        public async Task<Size?> GetSizeByIdAsync(int id)
        {
            var size = await _context.Sizes.FirstOrDefaultAsync(c => c.CategoryId == id);

            if (size == null) { return null; }

            return size;
        }

        public async Task<Size?> UpdateSizeAsync(int id, Size size)
        {
            var existingSize = await _context.Sizes.FirstOrDefaultAsync(x => x.CategoryId == id);
            if (existingSize != null)
            {
                existingSize.MinSize = size.MinSize;
                existingSize.MaxSize = size.MaxSize;
                existingSize.Step = size.Step;
                await _context.SaveChangesAsync();
                return existingSize;
            }
            return null;
        }
    }
}
