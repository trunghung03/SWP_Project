using DIAN_.Interfaces;
using DIAN_.Models;
using DIAN_.Helper;
using Microsoft.EntityFrameworkCore;

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
            var queryable = _context.Shells
        .Where(s => s.Status)
        .AsQueryable();

            int totalItems = await queryable.CountAsync();

            var shells = await queryable
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            return (shells, totalItems);
        }


        public async Task<Shell?> GetShellByIdAsync(int id)
        {
            var shell = await _context.Shells
               .Where(s => s.Status && s.ShellId == id)
               .FirstOrDefaultAsync();
            if (shell == null)
            {
                throw new KeyNotFoundException("Shell does not exist");
            }
            return shell;
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
    }
}
