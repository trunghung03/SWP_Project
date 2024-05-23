using DIAN_.DTOs;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShellController : ControllerBase
    {
        private readonly DIANContext _context;
        public ShellController(DIANContext context)
        {
            _context = context;
        }

        [HttpGet("shells")]
        public async Task<IActionResult> GetShells()
        {
            var shells = await _context.Shells
                                 .Include(s => s.Shellinventories)
                                 .Select(shell => shell.ToShellDTO())
                                 .ToListAsync();

            return Ok(shells);
        }
    }
}
