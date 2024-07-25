using DIAN_.Models;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DIAN_.Repository;
using DIAN_.DTOs.ProductDTOs;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/promotions")]

    public class PromotionController : ControllerBase
    {
        private readonly IPromotionRepository _promotionRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IEmailService _emailService;

        public PromotionController(ICustomerRepository customerRepository, IPromotionRepository promotionRepository, IEmailService emailService)
        {
            _customerRepository = customerRepository;
            this._promotionRepository = promotionRepository;
            _emailService = emailService;
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
                throw;
            }
        }

        [HttpGet("promotion/{code}")]
        public async Task<IActionResult> GetPromotionByCode(string code)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);
                var promotion = await _promotionRepository.GetPromotionByCodeAsync(code);
                if (promotion == null)
                {
                    return NotFound("Promotion does not exist");
                }
                return Ok(promotion.ToPromotionDetail());
            }
            catch (Exception)
            {
                throw;
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
                throw;
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


                SendEmailToAll(promotionModel);



                return Ok(promotionModel.ToPromotionDetail());
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async void SendEmailToAll(Promotion promotionModel)
        {
            var customers = _customerRepository.GetAllAsync().Result;

            foreach (var customer in customers)
            {
                var emailBody = _emailService.EmailPromotionBody(promotionModel, customer.FirstName, "promotion.html").Result;
                var mailRequest = new MailRequest
                {
                    ToEmail = customer.Email,
                    Subject = "[Dian Diamond] Don't miss out on this promotion!",
                    Body = emailBody
                };
                await _emailService.SendEmailAsync(mailRequest);
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
                throw;
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
                throw;
            }
        }
        [HttpPut("deactivate-activate/{id}")]
        public async Task<IActionResult> DeactivateAndActivatePromotion(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var result = await _promotionRepository.DeactivateAndActivatePromotion(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("staff/promotion/{code}")]
        public async Task<IActionResult> GetPromotionByCodeForStaff([FromRoute] string code)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);
                var promotions = await _promotionRepository.GetPromotionByCodeForStaffAsync(code);
                if (promotions == null || promotions.Count == 0)
                {
                    return NotFound("No promotions found containing the given code.");
                }

                var promotionDtos = promotions.Select(p => p?.ToPromotionDetail());
                return Ok(promotionDtos);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("searchAllFields")]
        public async Task<IActionResult> SearchPromotionsAsync([FromQuery] string query)
        {
            try
            {
                var searchCriteria = new PromotionSearch
                {
                    query = query
                };

                var promotions = await _promotionRepository.SearchPromotionsAsync(searchCriteria);

                if (!promotions.Any())
                {
                    return NotFound("No promotions match the search criteria.");
                }

                var promoDTOs = promotions.Select(promo => promo.ToPromotionDetail()).ToList();
                return Ok(promoDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

