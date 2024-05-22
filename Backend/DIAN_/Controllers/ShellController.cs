using DIAN_.DTOs;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("shell")]
        public IActionResult GetAllNames()
        {
            var shellNames = _context.Shells
                                     .Select(shell => shell.ToShellNameDTO())
                                     .ToList();

            return Ok(shellNames);
        }
    }
}
