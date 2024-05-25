using DIAN_.Data;
using DIAN_.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/promotionController")]
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
    }
}
