using DIAN_.DTOs.ShellDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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
            try
            {
                var shells = await _shellRepo.GetAllAsync();
                return Ok(shells);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            try
            {
                var shell = await _shellRepo.GetByIdAsync(id);
                if (shell == null)
                {
                    return NotFound();
                }
                return Ok(shell);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateShellMaterialRequestDTO shellDTO)
        {
            try
            {
                var shell = shellDTO.ToShellMaterial();
                var createdShell = await _shellRepo.CreateAsync(shell);
                return CreatedAtAction(nameof(GetById), new { id = createdShell.ShellMaterialId }, createdShell);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateShellMaterialRequestDTO shellDTO)
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                await _shellRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("listNames")]
        public async Task<IActionResult> GetAllNames()
        {
            try
            {
                var names = await _shellRepo.GetListNamesAsync();
                return Ok(names);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
