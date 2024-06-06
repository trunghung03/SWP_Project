﻿using DIAN_.Models;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/promotions")]

    public class PromotionController : ControllerBase
    {
        private readonly IPromotionRepository _promotionRepository;

        public PromotionController(IPromotionRepository promotionRepository)
        {
            this._promotionRepository = promotionRepository;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllPromotions()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var promotions = await _promotionRepository.GetAllPromotionAsync();
                if (promotions.Count == 0)
                {
                    return NotFound("Promotion does not exist");
                }
                var promotionDtos = promotions.Select(promotion => promotion.ToPromotionDetail());
                return Ok(promotionDtos);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var promotion = await _promotionRepository.GetPromotionByIdAsync(id);
                if (promotion == null)
                {
                    return NotFound("Promotion does not exist");
                }
                return Ok(promotion.ToPromotionDetail());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("createpromotion")]
        public async Task<IActionResult> CreatePromotion([FromBody] CreatePromotionRequestDto promotionDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var promotionModel = promotionDto.ToPromotionFromCreateDto();
                await _promotionRepository.CreatePromotionAsync(promotionModel);
                return Ok(promotionModel.ToPromotionDetail());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdatePromotion([FromRoute] int id, [FromBody] UpdatePromotionRequestDto promotionDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var promotion = await _promotionRepository.UpdatePromotionAsync(id, promotionDto.ToPromotionFromUpdateDto(id));
                if (promotion == null)
                {
                    return NotFound("Promotion does not exist");
                }
                return Ok(promotion.ToPromotionDetail());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeletePromotion([FromRoute] int id, UpdatePromotionRequestDto deletePromotion)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var promotion = await _promotionRepository.DeletePromotionAsync(id, deletePromotion.ToPromotionFromUpdateDto(id));
                if (promotion == null)
                {
                    return NotFound("Promotion does not exist");
                }
                return Ok(promotion.ToPromotionDetail());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        //[HttpGet("{code}")]
        //public async Task<IActionResult> getPromotionByCode(string code)
        //{
        //    var promoton
        //}
    }
}

