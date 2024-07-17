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
    }
}
