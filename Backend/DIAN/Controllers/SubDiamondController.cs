using Microsoft.AspNetCore.Mvc;
using DIAN_.Interfaces;
using DIAN_.DTOs.SubDiamondDto;
using DIAN_.Mapper;
using DIAN_.Helper;
using DIAN_.Repository;
using DIAN_.DTOs.DiamondDto;

namespace DIAN_.Controllers
{
    [Route("api/subdiamonds")]
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
            return Ok(subDiamond.ToSubDiamondDTO());
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

        [HttpGet("all")]
        public async Task<IActionResult> GetAllDiamondsAsync([FromQuery] DiamondQuery query)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var (diamonds, totalItems) = await _subDiamondRepository.GetAllDiamondsAsync(query);

                if (!diamonds.Any())
                {
                    return NotFound("Diamond does not exist");
                }

                var diamondDtos = diamonds.Select(diamond => diamond.ToSubDiamondDTO()).ToList();

                // Check if pagination parameters are provided
                if (!query.PageNumber.HasValue && !query.PageSize.HasValue)
                {
                    // No pagination info needed if we are returning all diamonds
                    return Ok(new { data = diamondDtos });
                }

                var pagination = new
                {
                    currentPage = query.PageNumber ?? 1,
                    pageSize = query.PageSize ?? 7,
                    totalPages = (int)Math.Ceiling((double)totalItems / (query.PageSize ?? 7)),
                    totalCount = totalItems
                };

                return Ok(new { data = diamondDtos, pagination });
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
        [HttpGet("searchSubDia")]
        public async Task<IActionResult> SearchSubDiamondsAsync([FromQuery] SubDiamondSearch searchCriteria)
        {
            try
            {
                var diamonds = await _subDiamondRepository.SearchSubDiamondsAsync(searchCriteria);

                if (!diamonds.Any())
                {
                    return NotFound("No diamonds match the search criteria.");
                }
                var subDiamonds = diamonds.Select(subDiamond => subDiamond.ToSubDiamondDTO()).ToList();
                return Ok(subDiamonds);
            }
            catch (Exception ex)
            {
                // Log exception here if necessary
                return StatusCode(500, new { title = "An unexpected error occurred.", status = 500, detail = ex.Message });
            }
        }
    }
}