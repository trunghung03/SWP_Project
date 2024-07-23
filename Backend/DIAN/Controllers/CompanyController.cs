using DIAN_.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/company")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyRepository _companyRepository;

        public CompanyController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        [HttpGet("markupprice")]
        public async Task<IActionResult> GetMarkupPrice()
        {
            var markupPrice = await _companyRepository.GetMarkupPriceAsync();
            if (markupPrice == null)
            {
                return NotFound();
            }
            return Ok(markupPrice);
        }
    }
}
