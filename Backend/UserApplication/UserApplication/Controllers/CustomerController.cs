using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UserApplication.Controllers
{
    [Authorize(Policy = "CustomerOnly")]
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
