using DIAN_.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApplication.Dtos.Account;
using UserApplication.Helpers;
using UserApplication.Interfaces;
using DIAN_.DTOs.Account;
using DIAN_.Repository;
using DIAN_.Interfaces;
using DIAN_.Services;
using DIAN_.Helper;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Identity.Data;
using DIAN_.DTOs.AccountDTO;

namespace UserApplication.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class CustomerController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly ICustomerService _customerService;
        private readonly ICustomerRepository _customerRepository;
        public CustomerController(ITokenService tokenService, ICustomerRepository customerRepository, 
            IEmailService emailService, ICustomerService customerService)
        {
            _tokenService = tokenService;
            _customerRepository = customerRepository;
            _emailService = emailService;
            _customerService = customerService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var customer = await _customerRepository.GetByEmailAsync(loginDto.Email);
            if (customer == null) { return Unauthorized("Invalid Email or Password!"); }

            return Ok(
                new NewUserDto
                {
                    Email = customer.Email,
                    Token = _tokenService.CreateCustomerToken(customer)
                });
        }

        [HttpPost("registercustomer")]
        public async Task<IActionResult> Register(RegisterUserDto user)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var customer = await _customerRepository.RegisterAsync(user);

            if (customer == null) return BadRequest("Email already exists!");

            return Ok(
                new NewUserDto
                {
                    Email = customer.Email,
                    Token = _tokenService.CreateCustomerToken(customer)
                });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var customers = await _customerRepository.GetAllAsync();
            
            return Ok(customers);
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var customer = await _customerRepository.GetByEmailAsync(email);
            if (customer == null) return NotFound();

            return Ok(customer);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var customer = await _customerRepository.GetByIdAsync(id);
            if (customer == null) return NotFound();

            return Ok(customer);
        }

        [HttpPut("{email}")]
        public async Task<IActionResult> Update(string email, UpdateUserDto customerDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var customer = await _customerRepository.UpdateAsync(email, customerDto);
            if (customer == null) return NotFound();
            return Ok(customer);
        }

        [HttpDelete("{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var customer = await _customerRepository.DeleteAsync(email);

            if (customer == null) return NotFound();

            return NoContent();
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest mailRequest)
        {
            try
            {
                if (Request.Form.Files.Any())
                {
                    mailRequest.Attachments = Request.Form.Files;
                }

                await _emailService.SendEmailAsync(mailRequest);
                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private string GetHtmlcontent()
        {
            string Response = "<div style=\"width:100%;background-color:lightblue;text-align:center;margin:10px\">";
            Response += "<h1>Welcome to Dian Diamond</h1>";
            Response += "<img src=\"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Fdiamond.html&psig=AOvVaw2VlHublQIZCNXMYsF7Y7G7&ust=1717833207920000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDYksGByYYDFQAAAAAdAAAAABAE\" />";
            Response += "<h2>Pray for you laptop</h2>";
            //Response += "<a href=\"https://www.youtube.com/channel/UCsbmVmB_or8sVLLEq4XhE_A/join\">Please join membership by click the link</a>";
            //Response += "<div><h1> Contact us : nihiratechiees@gmail.com</h1></div>";
            Response += "</div>";
            return Response;
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };
                var result = await _customerService.ResetPasswordRequestAsync(forgotPasswordDto);
                if (result)
                {
                    return Ok("Password reset link has been sent.");
                }
                else
                {
                    return BadRequest("An error occurred while processing your request.");
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };
                var result = await _customerService.ConfirmResetPassword(resetPasswordDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
