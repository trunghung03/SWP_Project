using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DIAN_.Models;
using DIAN_.Interfaces;
using DIAN_.Repository;
using DIAN_.Mapper;
using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.ShellDto;
using DIAN_.Helper;

namespace DIAN_.Controllers
{
    [Route("api/shells")]
    [ApiController]
    public class ShellsController : ControllerBase
    {
        private readonly IShellRepository _shellRepository;

        public ShellsController(IShellRepository shellRepository)
        {
            _shellRepository = shellRepository;
        }

        // GET: api/Shells
        [HttpGet]
        public async Task<IActionResult> GetShell([FromQuery] ShellQuerry query)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var (shells, totalItems) = await _shellRepository.GetAllShellAsync(query);

                if (!shells.Any())
                {
                    return NotFound("Shell does not exist");
                }

                var shellDtos = shells.Select(shell => shell.ToShellDetail()).ToList();

                var paginationMetadata = new
                {
                    currentPage = query.PageNumber,
                    pageSize = query.PageSize,
                    totalPages = (int)Math.Ceiling((double)totalItems / query.PageSize),
                    totalItems
                };

                Response.Headers.Add("X-Pagination", System.Text.Json.JsonSerializer.Serialize(paginationMetadata));

                return Ok(new { Data = shellDtos, Pagination = paginationMetadata });
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetShellById( [FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var shell = await _shellRepository.GetShellByIdAsync(id);
                if (shell == null)
                {
                    return NotFound("Shell does not exist");
                }
                return Ok(shell.ToShellDetail());
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateShell([FromBody] CreateShellRequestDto shellDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var shellModel = shellDto.ToShellFromCreateDto();
                await _shellRepository.CreateShellAsync(shellModel);
                return Ok(shellModel.ToShellDetail());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShell([FromBody] UpdateShellRequestDto shellRequestDto, [FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var shell = await _shellRepository.UpdateShellAsync(shellRequestDto.ToShellFromUpdateDto(id), id);
                if (shell == null)
                {
                    return NotFound("Promotion does not exist");
                }
                return Ok(shell.ToShellDetail());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShell([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var deletedShell = await _shellRepository.DeleteShellAsync(id);
                if (deletedShell == null)
                {
                    return NotFound("Shell does not exist");
                }
                return Ok(deletedShell.ToShellDetail());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("updatestock/{id}")]
        public async Task<IActionResult> UpdateShellStock([FromBody] UpdateShellStock updateShellStock, [FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var updatedShell = await _shellRepository.UpdateShellStockAsync(updateShellStock.ToShellFromUpdateStockDto(id), id);
                if (updatedShell == null)
                {
                    return NotFound("Shell does not exist");
                }
                return Ok(updatedShell.ToShellDetail());
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
