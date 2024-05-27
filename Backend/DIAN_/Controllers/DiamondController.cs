using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/diamond")]
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

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDiamondByIdAsync([FromRoute] int id)
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
            return Ok(diamond.ToDiamondDetailDTO());
        }


        [HttpPost("creatediamond")]
        public async Task<IActionResult> AddDiamondAsync([FromBody] CreateDiamondRequestDto diamondDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var diamond = diamondDto.ToDiamondFromCreateDTO();
            var result = await _diamondRepository.AddDiamondAsync(diamond);
            return Ok(result.ToDiamondDTO());
        }

        [HttpPut]
        [Route("update/{id:int}")]  
        public async Task<IActionResult> UpdateDiamondAsync([FromRoute] int id, [FromBody] UpdateDiamondRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var diamondModel = await _diamondRepository.UpdateDiamondAsync(updateDto.ToDiamondFromUpdateDTO(id), id);
            if (diamondModel == null)
                return NotFound("Diamond does not exist");
            return Ok(diamondModel.ToDiamondDTO());
        }

        [HttpPut]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteDiamondAsync([FromRoute] int id, [FromBody] UpdateDiamondRequestDto deleteDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var diamond = await _diamondRepository.DeleteDiamondAsync(id, deleteDto.ToDiamondFromUpdateDTO(id));
            if (diamond == null)
                return NotFound("Diamond does not exist");
            return Ok(diamond.ToDiamondDTO());
        }
    }

}
