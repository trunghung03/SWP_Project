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
using DIAN_.Helper;
using DIAN_.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Identity.Data;
using DIAN_.DTOs.AccountDTO;
using Google.Apis.Auth;

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
        private readonly IConfiguration _configuration;

        public CustomerController(ITokenService tokenService, ICustomerRepository customerRepository,
            IEmailService emailService, ICustomerService customerService, IConfiguration configuration)
        {
            _tokenService = tokenService;
            _customerRepository = customerRepository;
            _emailService = emailService;
            _customerService = customerService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var customer = await _customerRepository.LoginAsync(loginDto);
                if (customer == null) { return Unauthorized("Invalid Email or Password!"); }

                // Generate a new token for the logged-in customer
                var token = _tokenService.CreateCustomerToken(customer);

                return Ok(new NewUserDto
                {
                    Email = customer.Email,
                    Token = token
                });
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost("registercustomer")]
        public async Task<IActionResult> Register(RegisterUserDto user)
        {
            try
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
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("login-gg")]
        public async Task<IActionResult> LoginGG(RegisterUserDto user)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };
            var customer = await _customerRepository.GetByEmailAsync(user.Email);

            if (customer == null)
                customer = await _customerRepository.RegisterAsync(user);


            return Ok(
                new NewUserDto
                {
                    Email = customer.Email,
                    AccountType = "Google",
                    Token = _tokenService.CreateCustomerToken(customer)
                });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customers = await _customerRepository.GetAllAsync();

                return Ok(customers);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customer = await _customerRepository.GetByEmailAsync(email);
                if (customer == null) return NotFound();

                return Ok(customer);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("search/name/{name}")]
        public async Task<IActionResult> SearchByName(string name)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customer = await _customerRepository.SearchByNameAsyncs(name);
                if (customer == null) return NotFound();

                return Ok(customer);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customer = await _customerRepository.GetByIdAsync(id);
                if (customer == null) return NotFound();

                return Ok(customer);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("{email}")]
        public async Task<IActionResult> Update(string email, UpdateUserDto customerDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customer = await _customerRepository.UpdateAsync(email, customerDto);
                if (customer == null) return NotFound();
                return Ok(customer);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customer = await _customerRepository.DeleteAsync(email);

                if (customer == null) return NotFound();

                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendMail(MailRequest mailRequest)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };
                //if (Request.Form.Files.Any())
                //{
                //    mailRequest.Attachments = Request.Form.Files;
                //}
                //else
                //{
                //    mailRequest.Attachments = null;
                //}

                await _emailService.SendEmailAsync(mailRequest);
                return Ok();
            }
            catch (Exception)
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
            catch (Exception)
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
                if (result.Succeeded)
                {
                    var customer = await _customerRepository.GetByEmailAsync(resetPasswordDto.Email);
                    if (customer != null)
                    {
                        return Ok(
                            new NewUserDto
                            {
                                Email = customer.Email,
                                Token = _tokenService.CreateCustomerToken(customer)
                            }
                        );
                    }
                    else
                    {
                        return BadRequest("An error occurred while processing your request.");
                    }
                }
                else
                {
                    return BadRequest("An error occurred while processing your request.");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customer = await _customerRepository.GetByEmailAsync(changePasswordDto.Email);
                if (customer == null) return NotFound();

                var result = await _customerRepository.ChangePassword(customer, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
                if (result is not null)
                {
                    return Ok(customer);
                }
                else
                {
                    return Ok("Cannot update password due to password is not match.");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}
