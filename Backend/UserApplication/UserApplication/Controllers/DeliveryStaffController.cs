﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UserApplication.Controllers
{
    [Authorize(Policy = "DeliveryStaffOnly")]
    [Route("api/delistaff")]
    [ApiController]
    public class DeliveryStaffController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
