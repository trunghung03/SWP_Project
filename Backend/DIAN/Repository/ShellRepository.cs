using DIAN_.Interfaces;
using DIAN_.Models;
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

        public async Task<List<Shell>?> GetAllShellAsync()
        {
            var shells = await _context.Shells
                  .Where(s => s.Status)
                  .ToListAsync();
            return shells;
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

            shell.ShellMaterialId = shellDTO.ShellMaterialId;
            shell.Weight = shellDTO.Weight;
            shell.ProductId = shellDTO.ProductId;
            shell.SubDiamondAmount = shellDTO.SubDiamondAmount;
            shell.AmountAvailable = shellDTO.AmountAvailable;


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
