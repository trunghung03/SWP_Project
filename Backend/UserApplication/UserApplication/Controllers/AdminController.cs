using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UserApplication.Controllers
{
    [Authorize(Policy = "AdminOnly")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public async Task<IActionResult> AddProduct()
        {
            return Ok();
        }
    }
}
