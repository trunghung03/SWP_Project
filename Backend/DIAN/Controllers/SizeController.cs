using DIAN_.DTOs.PromotionDto;
using DIAN_.DTOs.SizeDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/sizes")]
    public class SizeController : ControllerBase
    {
        private readonly ISizeRepository _sizeRepository;

        public SizeController(ISizeRepository sizeRepository)
        {
            _sizeRepository = sizeRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var sizes = await _sizeRepository.GetAllSizeAsync();

                return Ok(sizes.Select(s => s.ToSizeDetailDto()));
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("addsize")]
        public async Task<IActionResult> CreateSize([FromBody] CreateSizeRequestDto sizeDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var sizeModel = sizeDto.ToSizeFromCreateDto();
                var createdSize = await _sizeRepository.CreateSizeAsync(sizeModel);
                return CreatedAtAction(nameof(GetSizeByCategoryId), new { id = createdSize.CategoryId }, sizeModel.ToSizeDetailDto());
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetSizeByCategoryId([FromRoute] int id)
        {
            try
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
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateSize([FromRoute] int id, [FromBody] UpdateSizeRequestDto sizeDto)
        {
            try
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
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteSize([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var sizeModel = await _sizeRepository.DeleteSizeAsync(id);
                if (sizeModel == null) return NotFound();

                return Ok(sizeModel);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
