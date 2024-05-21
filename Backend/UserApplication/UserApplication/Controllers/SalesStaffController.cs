using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UserApplication.Controllers
{
    [Authorize(Policy = "SalesStaffOnly")]
    [Route("api/salesstaff")]
    [ApiController]
    public class SalesStaffController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
