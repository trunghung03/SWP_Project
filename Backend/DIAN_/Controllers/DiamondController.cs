using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/diamonds")]
    public class DiamondController : ControllerBase
    {
        private readonly IDiamondRepository _diamondRepository;

        public DiamondController(IDiamondRepository diamondRepository)
        {
            this._diamondRepository = diamondRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllDiamondsAsync()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _diamondRepository.GetAllDiamondsAsync();

                if (!result.Any())
                {
                    return NotFound("Diamond does not exist");
                }

                var diamondDtos = result.Select(diamond => diamond.ToDiamondDTO()).ToList();
                return Ok(diamondDtos);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDiamondByIdAsync([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamond = await _diamondRepository.GetDiamondByIdAsync(id);
                if (diamond == null)
                {
                    return NotFound("Diamond does not exist");
                }
                return Ok(diamond.ToDiamondDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("creatediamond")]
        public async Task<IActionResult> AddDiamondAsync([FromBody] CreateDiamondRequestDto diamondDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    foreach (var state in ModelState)
                    {
                        foreach (var error in state.Value.Errors)
                        {
                            Console.WriteLine($"Error: {error.ErrorMessage}");
                        }
                    }
                    return BadRequest(ModelState);
                }

                var diamond = diamondDto.ToDiamondFromCreateDTO();
                var result = await _diamondRepository.AddDiamondAsync(diamond);
                return Ok(result.ToDiamondDTO());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateDiamondAsync([FromRoute] int id, [FromBody] UpdateDiamondRequestDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamondModel = await _diamondRepository.UpdateDiamondAsync(updateDto.ToDiamondFromUpdateDTO(id), id);
                if (diamondModel == null)
                {
                    return NotFound("Diamond does not exist");
                }
                return Ok(diamondModel.ToDiamondDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteDiamondAsync([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamond = await _diamondRepository.DeleteDiamondAsync(id);
                if (diamond == null)
                {
                    return NotFound("Diamond does not exist");
                }
                return Ok(diamond.ToDiamondDTO());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
