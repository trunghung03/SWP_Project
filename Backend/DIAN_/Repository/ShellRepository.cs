using DIAN_.DTOs.ShellDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class ShellRepository : IShellMaterialRepository
    {
        private readonly ApplicationDbContext _context;
        public ShellRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ShellMaterialDTO> CreateAsync(Shellmaterial shell)
        {
            await _context.Shellmaterials.AddAsync(shell);
            await _context.SaveChangesAsync();
            return shell.ToShellMaterialDTO();
        }

        public async Task DeleteAsync(int id)
        {
            var shell = await _context.Shellmaterials.FindAsync(id);
            if (shell != null)
            {
                shell.Status = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ShellMaterialDTO> GetByIdAsync(int id)
        {
            var shell = await _context.Shellmaterials.FindAsync(id);
            return shell?.ToShellMaterialDTO();
        }

        public async Task<List<ShellMaterialDTO>> GetAllAsync()
        {
            return await _context.Shellmaterials
                .Where(s => s.Status)
                .Select(s => s.ToShellMaterialDTO())
                .ToListAsync();
        }

        public async Task<ShellMaterialDTO> UpdateAsync(ShellMaterialDTO shellDTO)
        {
            var shell = await _context.Shellmaterials.FindAsync(shellDTO.ShellMaterialId);
            if (shell == null)
            {
                return null;
            }

            shell.Name = shellDTO.Name;
            shell.AmountAvailable = shellDTO.AmountAvailable;
            shell.Price = shellDTO.Price;

            _context.Shellmaterials.Update(shell);
            await _context.SaveChangesAsync();

            return shell.ToShellMaterialDTO();
        }
        public async Task<List<string>> GetListNamesAsync()
        {
            return await _context.Shellmaterials
                .Where(s => s.Status)
                .Select(s => s.Name)
                .ToListAsync();
        }
    }
}
