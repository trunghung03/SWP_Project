using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.SizeDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/categorysize")]
    public class SizeController : ControllerBase
    {
        private readonly ISizeRepository _sizeRepository;

        public SizeController(ISizeRepository sizeRepository)
        {
            _sizeRepository = sizeRepository;
        }

        [HttpPost("addsize")]
        public async Task<IActionResult> CreateSize([FromBody] CreateSizeRequestDto sizeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sizeModel = sizeDto.ToSizeFromCreateDto();
            await _sizeRepository.CreateSizeAsync(sizeModel);
            return CreatedAtAction(nameof(sizeModel.CategoryId), new { id = sizeModel.CategoryId }, sizeModel.ToSizeDetailDto());
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetSizeByCategoryId([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sizeModel = await _sizeRepository.GetSizeByIdAsync(id);
            if (sizeModel == null)
            {
                return NotFound("Size does not exist");
            }
            return Ok(sizeModel.ToSizeDetailDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateSize([FromRoute] int id, [FromBody] UpdateSizeRequestDto sizeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sizeModel = await _sizeRepository.UpdateSizeAsync(id, sizeDto.ToSizeFromUpdateDto());
            if (sizeModel == null)
            {
                return NotFound("Size does not exist");
            }
            return Ok(sizeModel.ToSizeDetailDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteSize([FromRoute] int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var sizeModel = await _sizeRepository.DeleteSizeAsync(id);
            if (sizeModel == null) return NotFound();

            return Ok(sizeModel);
        }
    }
    
}
