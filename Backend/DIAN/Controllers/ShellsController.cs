using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DIAN_.Models;

namespace DIAN_.Controllers
{
    [Route("api/shell")]
    [ApiController]
    public class ShellsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShellsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Shells
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shell>>> GetShell()
        {
            return await _context.Shells.ToListAsync();
        }

        // GET: api/Shells/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shell>> GetShell(int id)
        {
            var shell = await _context.Shells.FindAsync(id);

            if (shell == null)
            {
                return NotFound();
            }

            return shell;
        }

        // PUT: api/Shells/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShell(int id, Shell shell)
        {
            if (id != shell.ShellId)
            {
                return BadRequest();
            }

            _context.Entry(shell).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShellExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Shells
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Shell>> PostShell(Shell shell)
        {
            _context.Shells.Add(shell);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShell", new { id = shell.ShellId }, shell);
        }

        // DELETE: api/Shells/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShell(int id)
        {
            var shell = await _context.Shells.FindAsync(id);
            if (shell == null)
            {
                return NotFound();
            }

            _context.Shells.Remove(shell);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShellExists(int id)
        {
            return _context.Shells.Any(e => e.ShellId == id);
        }
    }
}
