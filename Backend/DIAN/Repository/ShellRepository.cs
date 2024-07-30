using DIAN_.Interfaces;
using DIAN_.Models;
using DIAN_.Helper;
using Microsoft.EntityFrameworkCore;
using DIAN_.DTOs.ShellDto;

namespace DIAN_.Repository
{
    public class ShellRepository : IShellRepository
    {
        private readonly ApplicationDbContext _context;
        public ShellRepository(ApplicationDbContext context)
        {
            this._context = context;
        }
        public async Task<Shell> CreateShellAsync(Shell shell)
        {
            await _context.Shells.AddAsync(shell);
            await _context.SaveChangesAsync();
            return shell;
        }

        public async Task<Shell?> DeleteShellAsync(int id)
        {
            var existingShell = await _context.Shells.FirstOrDefaultAsync(x => x.ShellId == id);
            if (existingShell != null)
            {
                existingShell.Status = false;
                await _context.SaveChangesAsync();
                return existingShell;
            }
            return null;
        }

        public async Task<(List<Shell>, int)> GetAllShellAsync(ShellQuerry query)
        {
            IQueryable<Shell> shellsQuery = _context.Shells
                                            .Include(s => s.ShellMaterial) // Ensure ShellMaterial is included
                                            .Where(s => s.Status)
                                            .AsQueryable();
            if (!string.IsNullOrEmpty(query.SearchTerm))
            {
                string lowerSearchTerm = query.SearchTerm.ToLower();
                shellsQuery = shellsQuery.Where(s =>
                                                    s.ShellId.ToString() == lowerSearchTerm ||
                                                    s.ShellMaterial.Name.ToLower().Contains(lowerSearchTerm) ||
                                                    s.ProductId.ToString().Contains(lowerSearchTerm) ||
                                                    s.AmountAvailable.ToString().Contains(lowerSearchTerm) ||
                                                    s.Status.ToString().Contains(lowerSearchTerm));
            }
            int totalItems = await shellsQuery.CountAsync();

            // If neither PageNumber nor PageSize is provided, return all shells without pagination
            if (!query.PageNumber.HasValue && !query.PageSize.HasValue)
            {
                var allShells = await shellsQuery.OrderBy(s => s.ShellId).ToListAsync();
                return (allShells, allShells.Count);
            }

            int pageSize = query.PageSize ?? 6; // Default page size to 6 if not provided
            int pageNumber = query.PageNumber ?? 1; // Default page number to 1 if not provided

            var skipNumber = (pageNumber - 1) * pageSize;
            var paginatedShells = await shellsQuery
                .Skip(skipNumber)
                .Take(pageSize)
                .ToListAsync();

            return (paginatedShells, totalItems);
        }



        public async Task<Shell?> GetShellByIdAsync(int id)
        {
            var shell = await _context.Shells
               .Where(s => s.Status && s.ShellId == id)
               .Include(s => s.ShellMaterial)
               .FirstOrDefaultAsync();
            if (shell == null)
            {
                throw new KeyNotFoundException("Shell does not exist");
            }
            return shell;
        }

        public async Task<List<Shell>> GetShellByProductIdAsync(int productId)
        {
            var shells = await _context.Shells
                .Where(s => s.ProductId == productId)
                .Include(s => s.ShellMaterial) 
                .ToListAsync();
            return shells;
        }

        public async Task<Shell?> UpdateShellAsync(Shell shellDTO, int id)
        {
            var shell = await _context.Shells.FirstOrDefaultAsync(s => s.ShellId == id);
            if (shell == null)
            {
                return null;
            }
            shell.ProductId = shellDTO.ProductId;
            shell.ShellMaterialId = shellDTO.ShellMaterialId;
            shell.AmountAvailable = shellDTO.AmountAvailable;
            shell.Weight = shellDTO.Weight;
            shell.Status = shellDTO.Status;
            shell.Size = shellDTO.Size;

            _context.Shells.Update(shell);
            await _context.SaveChangesAsync();

            return shell;
        }

        public async Task<Shell?> UpdateShellStockAsync(Shell shellDto, int id)
        {
           var shell = await _context.Shells.FirstOrDefaultAsync(s => s.ShellId == id);
            if (shell != null)
            {
                shell.AmountAvailable = shellDto.AmountAvailable;
                await _context.SaveChangesAsync();
                return shell;
            }
            return null;
        }
        public async Task<List<Shell>> SearchShellsAsync(ShellSearch searchCriteria)
        {
            var query = _context.Shells.Include(s => s.ShellMaterial).AsQueryable();

            if (!string.IsNullOrEmpty(searchCriteria.query))
            {
                string queryStr = searchCriteria.query.ToLower();
                query = query.Where(s => s.ProductId.ToString().Contains(queryStr) ||
                                         s.ShellMaterial.Name.ToLower().Contains(queryStr) ||
                                         s.AmountAvailable.ToString().Contains(queryStr) ||
                                         s.Weight.ToString().Contains(queryStr) ||
                                         s.Size.ToString().Contains(queryStr));
            }

            return await query.ToListAsync();
        }

    }
}
