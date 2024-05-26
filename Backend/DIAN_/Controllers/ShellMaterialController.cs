using DIAN_.Data;
using DIAN_.DTOs.ShellDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShellMaterialController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IShellMaterialRepository _shellRepo;

        public ShellMaterialController(ApplicationDbContext context, IShellMaterialRepository shellRepo)
        {
            _context = context;
            _shellRepo = shellRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var shells = await _shellRepo.GetAllAsync();
            return Ok(shells);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var shell = await _shellRepo.GetByIdAsync(id);
            if (shell == null)
            {
                return NotFound();
            }
            return Ok(shell);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateShellMaterialRequestDTO shellDTO)
        {
            var shell = shellDTO.ToShellMaterial();
            var createdShell = await _shellRepo.CreateAsync(shell);
            return CreatedAtAction(nameof(GetById), new { id = createdShell.ShellMaterialId }, createdShell);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateShellMaterialRequestDTO shellDTO)
        {
            var existingShell = await _shellRepo.GetByIdAsync(id);
            if (existingShell == null)
            {
                return NotFound();
            }

            var shellToUpdate = shellDTO.ToShellMaterial(new Shellmaterial { ShellMaterialId = id });
            var updatedShell = await _shellRepo.UpdateAsync(shellToUpdate.ToShellMaterialDTO());
            return Ok(updatedShell);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _shellRepo.DeleteAsync(id);
            return NoContent();
        }
    }
}
