
using DIAN_.Data;
using DIAN_.DTOs;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using DIAN_.DTOs;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShellController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ShellController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("shell")]
        public IActionResult GetAllNames()
        {
            var shellNames = _context.Shellmaterials
                                     .Select(shell => Shellmaterial.ToShellNameDTO()
                                     .ToList());

            return Ok(shellNames);
        }
    }
}
