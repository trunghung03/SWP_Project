using Microsoft.AspNetCore.Mvc;
using DIAN_.Interfaces;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Mapper;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubdiamondsController : ControllerBase
    {
        private readonly ISubDiamondRepository _subDiamondRepository;

        public SubdiamondsController(ISubDiamondRepository subDiamondRepository)
        {
            _subDiamondRepository = subDiamondRepository;
        }
        [HttpPost]
        public async Task<IActionResult> CreateSubDiamond([FromBody] CreateSubDiamondRequestDto subDiamondRequestDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           var subDiamond = subDiamondRequestDTO.ToSubDiamondFromCreateDTO();
            await _subDiamondRepository.CreateAsync(subDiamond);
            return Ok(subDiamond);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllSubDiamonds()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var subDiamonds = await _subDiamondRepository.GetAllAsync();
                if (subDiamonds.Count == 0)
                {
                    return NotFound("Subdiamonds does not exist");
                }
                var subDiamondDtos = subDiamonds.Select(subDiamond => subDiamond.ToSubDiamondDTO());
                return Ok(subDiamondDtos);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubDiamondById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var subDiamond = await _subDiamondRepository.GetByIdAsync(id);
                if (subDiamond == null)
                {
                    return NotFound("Subdiamond does not exist");
                }
                var subDiamondDto = subDiamond.ToSubDiamondDTO();
                return Ok(subDiamondDto);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubDiamond([FromRoute] int id, [FromBody] UpdateSubDiamondRequestDto updateSubDiamond)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var subDiamond = await _subDiamondRepository.GetByIdAsync(id);
                if (subDiamond == null)
                {
                    return NotFound("Subdiamond does not exist");
                }
                var updatedSubDiamond = updateSubDiamond.ToSubDiamondFromUpdateDTO(id);
                await _subDiamondRepository.UpdateAsync(id, updatedSubDiamond);
                return Ok(updatedSubDiamond.ToSubDiamondDTO());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubDiamond([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var subDiamond = await _subDiamondRepository.GetByIdAsync(id);
                if (subDiamond == null)
                {
                    return NotFound("Subdiamond does not exist");
                }
                await _subDiamondRepository.DeleteAsync(id);
                return Ok(subDiamond.ToSubDiamondDTO());
            }
            catch (Exception)
            {
                throw;
            }
        }
       
    }
}
