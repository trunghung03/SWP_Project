using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UserApplication.Controllers
{
    [Authorize(Policy = "SalesStaffOnly")]
    [Route("api/salesstaff")]
    [ApiController]
    public class SalesStaffController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
