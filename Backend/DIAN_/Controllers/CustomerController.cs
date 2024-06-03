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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var customer = await _customerRepository.DeleteAsync(id);

            if (customer == null) return NotFound();

            return NoContent();
        }
    }
}
