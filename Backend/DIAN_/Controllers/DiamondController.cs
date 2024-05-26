using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/diamond")]
    [ApiController]
    public class DiamondController : ControllerBase
    {
        private readonly IDiamondRepository _diamondRepository;
        public DiamondController(IDiamondRepository diamondRepository)
        {
            this._diamondRepository = diamondRepository;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllDiamondsAsync([FromQuery] DiamondQuery diamondQuery)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _diamondRepository.GetAllDiamondsAsync(diamondQuery);

            var diamondDtos = result.Select(diamond => diamond.ToDiamondListDTO()).ToList();
            return Ok(result);
        }

        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> GetDiamondByIdAsync([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var diamond = await _diamondRepository.GetDiamondByIdAsync(id);
            if (diamond == null)
            {
                return NotFound();
            }
            return Ok(diamond.ToDiamondDTO);
        }


        [HttpPost]
        public async Task<IActionResult> AddDiamondAsync([FromBody]  CreateDiamondRequestDto diamondDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var diamond = diamondDto.ToDiamondFromCreateDTO();
            var result = await _diamondRepository.AddDiamondAsync(diamond);
            return CreatedAtAction(nameof(GetDiamondByIdAsync), new { id = diamond.DiamondId }, diamond.ToDiamondDTO());
        }

        [HttpPut]
        [Route("{id: int}")]
        public async Task<IActionResult> UpdateDiamondAsync([FromRoute] int id, [FromBody] UpdateDiamondRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diamondModel = await _diamondRepository.UpdateDiamondAsync(id, updateDto.ToDiamondFromUpdateDTO(id));
            if (diamondModel == null)
                return NotFound("Diamond does not exist");
            return Ok(diamondModel.ToDiamondDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiamondAsync([FromRoute] int id, [FromBody] UpdateDiamondRequestDto deleteDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var diamond = await _diamondRepository.DeleteDiamondAsync(id, deleteDto.ToDiamondFromUpdateDTO(id));
            if (diamond == null)
                return NotFound("Diamond does not exist");
            return Ok(diamond.ToDiamondDTO);
        }


    } 

}
