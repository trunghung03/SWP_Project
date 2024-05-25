using DIAN_.Models;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/promotion")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        private readonly IPromotionRepository _promotionRepository;
        
        private readonly ApplicationDbContext _context;

        public PromotionController(IPromotionRepository promotionRepository, ApplicationDbContext context) 
        {
            this._context = context;
            this._promotionRepository = promotionRepository;
        }
        [HttpGet("list")]
        public async Task<IActionResult>  GetAllPromotions([FromQuery] PromotionQuery query)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var promotions = await _promotionRepository.GetAllPromotionAsync(query);
            var promotionDtos = promotions.Select(promotion => promotion.ToPromotionList()).ToList();
            return Ok(promotions);
        }


        [HttpGet("get/{id:int}")]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var promotion = await _promotionRepository.GetPromotionByIdAsync(id);
            if (promotion == null)
            {
                return NotFound();
            }
            return Ok(promotion.ToPromotionDetail());
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePromotion([FromBody] CreatePromotionRequestDto promotionDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var promotionModel = promotionDto.ToPromotionFromCreateDto();
            await _promotionRepository.CreatePromotionAsync(promotionModel);
            return CreatedAtAction(nameof(getById), new { id = promotionModel.PromotionId }, promotionModel.ToPromotionDetail());
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdatePromotion([FromRoute] int id, [FromBody] UpdatePromotionRequestDto promotionDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var promotion = await _promotionRepository.UpdatePromotionAsync(id, promotionDto);
            if(promotion == null)
            {
                return NotFound();
            }
            return Ok(promotion.ToPromotionDetail());
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeletePromotion([FromRoute] int id, UpdatePromotionRequestDto updatePromotion)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var promotion = await _promotionRepository.DeletePromotionAsync(id, updatePromotion);
            if(promotion == null)
            {
                return NotFound();
            }
            return Ok(promotion.ToPromotionDetail());
        }
    }
}
