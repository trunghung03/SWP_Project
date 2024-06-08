using DIAN_.DTOs.ShellDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/shellmaterials")]
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

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var shell = await _shellRepo.GetByIdAsync(id);
            if (shell == null)
            {
                return NotFound();
            }
            return Ok(shell);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetShellByName([FromRoute] string name)
        {
            var shells = await _shellRepo.GetShellByName(name);
            if (shells.Count == 0)
            {
                return NotFound();
            }
            var shellDTOs = shells.Select(shell => shell.ToShellMaterialDTO()).ToList();
            return Ok(shellDTOs);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateShellMaterialRequestDTO shellDTO)
        {
            var shell = shellDTO.ToShellMaterial();
            var createdShell = await _shellRepo.CreateAsync(shell);
            return CreatedAtAction(nameof(GetById), new { id = createdShell.ShellMaterialId }, createdShell);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateShellMaterialRequestDTO shellDTO)
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

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await _shellRepo.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("listNames")]
        public async Task<IActionResult> GetAllNames()
        {
            var names = await _shellRepo.GetListNamesAsync();
            return Ok(names);
        }
    }
}
