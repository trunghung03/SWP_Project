using DIAN_.DTOs.ShellDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class ShellMaterialRepository : IShellMaterialRepository
    {
        private readonly ApplicationDbContext _context;
        public ShellMaterialRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Shellmaterial> CreateAsync(Shellmaterial shell)
        {
            await _context.Shellmaterials.AddAsync(shell);
            await _context.SaveChangesAsync();
            return shell;
        }

        public async Task<Shellmaterial?> DeleteAsync(int id)
        {
            var shell = await _context.Shellmaterials.FirstOrDefaultAsync(s => s.ShellMaterialId == id);
            if (shell != null)
            {
                shell.Status = false;
                await _context.SaveChangesAsync();
                return shell;
            }
            throw new KeyNotFoundException("Shell does not exist");
        }

        public async Task<Shellmaterial?> GetByIdAsync(int id)
        {
            var shell = await _context.Shellmaterials
                .Where(s => s.Status && s.ShellMaterialId == id)
                .FirstOrDefaultAsync();
            if (shell == null)
            {
                throw new KeyNotFoundException("Shell does not exist");
            }
            return shell;
        }



        public async Task<List<Shellmaterial>> GetAllAsync()
        {
            var shells = await _context.Shellmaterials
                .Where(s => s.Status)
                .ToListAsync();
            return shells;
        }

        public async Task<Shellmaterial?> UpdateAsync(Shellmaterial shellDTO, int id)
        {
            var shell = await _context.Shellmaterials.FirstOrDefaultAsync(s => s.ShellMaterialId == id);
            if (shell == null)
            {
                return null;
            }

            shell.Name = shellDTO.Name;
            shell.Price = shellDTO.Price;

            _context.Shellmaterials.Update(shell);
            await _context.SaveChangesAsync();

            return shell;
        }
        public async Task<List<string>> GetListNamesAsync()
        {
            return await _context.Shellmaterials
                .Where(s => s.Status)
                .Select(s => s.Name)
                .ToListAsync();
        }

        public async Task<List<Shellmaterial>> GetShellByName(string name)
        {
            var shell = await _context.Shellmaterials
                .Where(s => s.Name.Contains(name))
                .ToListAsync();
            return shell;
        }
    }
}
