using DIAN_.DTOs.WarrantyDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarrantyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWarrantyRepository _warrantyRepo;

        public WarrantyController(ApplicationDbContext context, IWarrantyRepository warrantyRepo)
        {
            _context = context;
            _warrantyRepo = warrantyRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var warranties = await _warrantyRepo.GetAllAsync();
            return Ok(warranties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var warranty = await _warrantyRepo.GetByIdAsync(id);
            if (warranty == null)
            {
                return NotFound();
            }
            return Ok(warranty);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateWarrantyDTO warrantyDTO)
        {
            var warranty = warrantyDTO.ToCreateWarranty();
            var createdWarranty = await _warrantyRepo.CreateAsync(warranty);
            return CreatedAtAction(nameof(GetById), new { id = createdWarranty.OrderDetailId }, createdWarranty);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateWarrantyDTO warrantyDTO)
        {
            var existingWarranty = await _warrantyRepo.GetByIdAsync(id);
            if (existingWarranty == null)
            {
                return NotFound();
            }

            var warrantyToUpdate = warrantyDTO.ToUpdateWarranty(new Warranty { OrderDetailId = id });
            var updatedWarranty = await _warrantyRepo.UpdateAsync(warrantyToUpdate);
            return Ok(updatedWarranty);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _warrantyRepo.DeleteAsync(id);
            return NoContent();
        }
    }
}
