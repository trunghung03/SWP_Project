using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/warranties")]
    public class WarrantyController : ControllerBase
    {
        private readonly IWarrantyRepository _warrantyRepository;

        public WarrantyController(IWarrantyRepository warrantyRepository)
        {
            _warrantyRepository = warrantyRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllWarranty()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var warranties = await _warrantyRepository.GetAllWarrantyAsync();
                if(warranties.Count == 0)
                {
                    return NotFound("Warranty does not exist");
                }
                return Ok(warranties);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetWarrantyById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var warranty = await _warrantyRepository.GetWarrantyByIdAsync(id);
                if (warranty == null)
                {
                    return NotFound("Warranty does not exist");
                }
                return Ok(warranty.ToWarrantyDetailDto());
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("addwarranty")]
        public async Task<IActionResult> CreateWarranty([FromBody] CreateWarrantyRequestDto warrantyDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Check if a warranty with the same OrderDetailId already exists
                var existingWarranty = await _warrantyRepository.GetWarrantyByIdAsync(warrantyDto.OrderDetailId);
                if (existingWarranty != null)
                {
                    return BadRequest("Warranty already exists");
                }

                var warrantyModel = warrantyDto.ToWarrantyFromCreateDto();
                await _warrantyRepository.CreateWarrantyAsync(warrantyModel);
                return CreatedAtAction(nameof(GetWarrantyById), new { id = warrantyModel.OrderDetailId }, warrantyModel);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateWarranty([FromRoute] int id, [FromBody] UpdateWarrantyRequestDto warrantyDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var warranty = await _warrantyRepository.UpdateWarrantyAsync(id, warrantyDto.ToWarrantyFromUpdateDto(id));
                if (warranty == null)
                {
                    return NotFound("Warranty does not exist");
                }
                return Ok(warranty.ToWarrantyDetailDto());
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteWarranty([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var warranty = await _warrantyRepository.DeleteWarrantyAsync(id);
                if (warranty == null)
                {
                    return NotFound("Warranty does not exist");
                }
                return Ok(warranty.ToWarrantyDetailDto());
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
