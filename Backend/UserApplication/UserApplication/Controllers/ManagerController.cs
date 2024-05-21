using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UserApplication.Controllers
{
    [Authorize(Policy = "ManagerOnly")]
    [Route("api/manager")]
    [ApiController]
    public class ManagerController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
