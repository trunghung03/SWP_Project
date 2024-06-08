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

namespace UserApplication.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class CustomerController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly ICustomerRepository _customerRepository;

        public CustomerController(ITokenService tokenService, ICustomerRepository customerRepository)
        {
            _tokenService = tokenService;
            _customerRepository = customerRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var customer = await _customerRepository.GetByEmailAsync(loginDto.Email);
                if (customer == null)
                {
                    return Unauthorized("Invalid Email or Password!");
                }

                return Ok(new NewUserDto
                {
                    Email = customer.Email,
                    Token = _tokenService.CreateCustomerToken(customer)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("registercustomer")]
        public async Task<IActionResult> Register(RegisterUserDto user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var customer = await _customerRepository.RegisterAsync(user);

                if (customer == null)
                {
                    return BadRequest("Email already exists!");
                }

                return Ok(new NewUserDto
                {
                    Email = customer.Email,
                    Token = _tokenService.CreateCustomerToken(customer)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var customers = await _customerRepository.GetAllAsync();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var customer = await _customerRepository.GetByEmailAsync(email);
                if (customer == null)
                {
                    return NotFound();
                }

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var customer = await _customerRepository.GetByIdAsync(id);
                if (customer == null)
                {
                    return NotFound();
                }

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{email}")]
        public async Task<IActionResult> Update(string email, UpdateUserDto customerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var customer = await _customerRepository.UpdateAsync(email, customerDto);
                if (customer == null)
                {
                    return NotFound();
                }

                return Ok(customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var customer = await _customerRepository.DeleteAsync(email);
                if (customer == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
