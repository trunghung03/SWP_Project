using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<IActionResult> GetAllDiamondsAsync([FromQuery] DiamondQuery query)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var (diamonds, totalCount) = await _diamondRepository.GetAllDiamondsAsync(query);

                if (!diamonds.Any())
                {
                    return NotFound("Diamond does not exist");
                }

                var diamondDtos = diamonds.Select(diamond => diamond.ToDiamondDTO()).ToList();

                var pagination = new
                {
                    currentPage = query.PageNumber,
                    pageSize = query.PageSize,
                    totalPages = (int)Math.Ceiling((double)totalCount / query.PageSize),
                    totalCount
                };

                return Ok(new { data = diamondDtos, pagination });
            }
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{shape}")]
        public async Task<IActionResult> GetDiamondByShapeAsync([FromRoute] string shape)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamonds = await _diamondRepository.GetDiamondByShapeAsync(shape);

                if (!diamonds.Any())
                {
                    return NotFound("Diamond does not exist");
                }

                var diamondDtos = diamonds.Select(diamond => diamond.ToDiamondDTO()).ToList();
                return Ok(diamondDtos);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("creatediamond")]
        public async Task<IActionResult> AddDiamondAsync([FromBody] CreateDiamondRequestDto diamondDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamond = diamondDto.ToDiamondFromCreateDTO();
                var result = await _diamondRepository.AddDiamondAsync(diamond);
                return Ok(new { diamondId = result.DiamondId, diamond = result.ToDiamondDTO() });
            }
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("updatecertificate/{id:int}")]
        public async Task<IActionResult> UpdateDiamondCertificate([FromRoute] int id, UpdateCertificateDto updateCertificate)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamondModel = await _diamondRepository.UpdateDiamondCertificate(updateCertificate.ToDiamondFromUpdateCertificate(id), id);
                if (diamondModel == null)
                {
                    return NotFound("Diamond does not exist");
                }
                return Ok(diamondModel.ToDiamondDTO());
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
