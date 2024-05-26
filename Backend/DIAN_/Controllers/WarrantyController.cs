﻿using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Mapper;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/warranty")]
    public class WarrantyController : ControllerBase
    {
        private readonly WarrantyRepository _warrantyRepository;

        public WarrantyController(WarrantyRepository warrantyRepository)
        {
            _warrantyRepository = warrantyRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllWarranty()
        {
            var warranties = await _warrantyRepository.GetAllWarrantyAsync();
            return Ok(warranties);
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetWarrantyById([FromRoute] int id)
        {
            var warranty = await _warrantyRepository.GetWarrantyByIdAsync(id);
            if (warranty == null)
            {
                return NotFound();
            }
            return Ok(warranty);
        }

        [HttpPost("addwarranty")]
        public async Task<IActionResult> CreateWarranty([FromBody] CreateWarrantyRequestDto warrantyDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var warrantyModel = warrantyDto.ToWarrantyFromCreateDto();
            await _warrantyRepository.CreateWarrantyAsync(warrantyModel);
            return CreatedAtAction(nameof(GetWarrantyById), new { id = warrantyModel.OrderDetailId }, warrantyModel.ToWarrantyDetailDto());
        }



        [HttpPut]
        [Route("update/{id:int}")]
        public async Task<IActionResult> UpdateWarranty([FromRoute] int id, [FromBody] UpdateWarrantyRequestDto warrantyDto)
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

        [HttpPut]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteWarranty([FromRoute] int id, [FromBody] UpdateWarrantyRequestDto warrantyDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var warranty = await _warrantyRepository.DeleteWarrantyAsync(id, warrantyDto.ToWarrantyFromUpdateDto(id));
            if (warranty == null)
            {
                return NotFound("Warranty does not exist");
            }

            return Ok(warranty.ToWarrantyDetailDto());
        }
    }
}
