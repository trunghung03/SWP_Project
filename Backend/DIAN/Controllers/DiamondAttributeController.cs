using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/diamond-attributes")]
    [ApiController]
    public class DiamondAttributeController : ControllerBase
    {
        private readonly IDiamondAttributeRepository _diamondAttributeRepository;

        public DiamondAttributeController(IDiamondAttributeRepository diamondAttributeRepository)
        {
            _diamondAttributeRepository = diamondAttributeRepository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDiamondAttributeById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamondAttribute = await _diamondAttributeRepository.GetDiamondAttributesAsync(id);

                if (diamondAttribute == null)
                {
                    return NotFound("Diamond attribute does not exist");
                }

                return Ok(diamondAttribute.ToDiamondAttributeDto());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("sub")]
        public async Task<IActionResult> GetSubDiamondAttributes()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamondAttributes = await _diamondAttributeRepository.GetSubDiamondAttributesAsync();

                if (diamondAttributes == null)
                {
                    return NotFound("Diamond attributes do not exist");
                }

                return Ok(diamondAttributes.Select(x => x.ToDiamondAttributeDto()));
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("main")]
        public async Task<IActionResult> GetMainDiamondAttributes()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var diamondAttributes = await _diamondAttributeRepository.GetMainDiamondAttributesAsync();

                if (diamondAttributes == null)
                {
                    return NotFound("Diamond attributes do not exist");
                }

                return Ok(diamondAttributes.Select(x => x.ToDiamondAttributeDto()));
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
