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
    [Route("api/employee")]
    public class EmployeeController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(ITokenService tokenService, IEmployeeRepository employeeRepository)
        {
            _tokenService = tokenService;
            _employeeRepository = employeeRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var employee = await _employeeRepository.GetByEmailAsync(loginDto.Email);
            if (employee == null) { return Unauthorized("Invalid Email or Password!"); }

            return Ok(
                new NewUserDto
                {
                    Email = employee.Email,
                    Token = _tokenService.CreateEmployeeToken(employee)
                });
        }

        [HttpPost("registeremployee")]
        public async Task<IActionResult> Register(RegisterEmployeeDto user)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var employee = await _employeeRepository.RegisterAsync(user);

            if (employee == null) return BadRequest("Email already exists!");

            return Ok(
                new NewUserDto
                {
                    Email = employee.Email,
                    Token = _tokenService.CreateEmployeeToken(employee)
                });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var employee = await _employeeRepository.GetAllAsync();
            
            return Ok(employee);
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var employee = await _employeeRepository.GetByEmailAsync(email);
            if (employee == null) return NotFound();

            return Ok(employee);
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null) return NotFound();

            return Ok(employee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateEmployeeDto employeeDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var employee = await _employeeRepository.UpdateAsync(id, employeeDto);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var employee = await _employeeRepository.DeleteAsync(id);

            if (employee == null) return NotFound();

            return NoContent();
        }
    }
}
