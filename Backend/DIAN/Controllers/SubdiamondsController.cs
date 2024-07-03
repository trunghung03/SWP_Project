using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DIAN_.Models;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubdiamondsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubdiamondsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Subdiamonds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subdiamond>>> GetSubdiamonds()
        {
            return await _context.Subdiamonds.ToListAsync();
        }

        // GET: api/Subdiamonds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subdiamond>> GetSubdiamond(int id)
        {
            var subdiamond = await _context.Subdiamonds.FindAsync(id);

            if (subdiamond == null)
            {
                return NotFound();
            }

            return subdiamond;
        }

        // PUT: api/Subdiamonds/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubdiamond(int id, Subdiamond subdiamond)
        {
            if (id != subdiamond.SubdiamondId)
            {
                return BadRequest();
            }

            _context.Entry(subdiamond).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubdiamondExists(id))
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

        // POST: api/Subdiamonds
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Subdiamond>> PostSubdiamond(Subdiamond subdiamond)
        {
            _context.Subdiamonds.Add(subdiamond);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubdiamond", new { id = subdiamond.SubdiamondId }, subdiamond);
        }

        // DELETE: api/Subdiamonds/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubdiamond(int id)
        {
            var subdiamond = await _context.Subdiamonds.FindAsync(id);
            if (subdiamond == null)
            {
                return NotFound();
            }

            _context.Subdiamonds.Remove(subdiamond);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubdiamondExists(int id)
        {
            return _context.Subdiamonds.Any(e => e.SubdiamondId == id);
        }
    }
}
