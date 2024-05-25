using DIAN_.DTOs.Account;
using DIAN_.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApplication.Dtos.Account;
using UserApplication.Helpers;
using UserApplication.Interfaces;

namespace UserApplication.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class EmployeeController : ControllerBase
    {
        private readonly UserManager<Employee> _employeeManager;
        private readonly SignInManager<Employee> _empSignInManager;
        private readonly ITokenService _tokenService;
        public EmployeeController(UserManager<Employee> employeeManager,
                                    SignInManager<Employee> empSignInManager,
                                    ITokenService tokenService)
        {
            _employeeManager = employeeManager;
            _empSignInManager = empSignInManager;
            _tokenService = tokenService;
        }

        [HttpPost("logincustomer")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await _employeeManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Email.ToLower());
            if (user == null) { return Unauthorized("Invalid Username!"); }

            var result = await _empSignInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) { return Unauthorized("Username not found and/or password incorrect!"); }

            return Ok(
                new NewUserDto
                {
                    Email = user.UserName,
                    Token = _tokenService.CreateToken(user, Roles.User)
                });
        }

        [HttpPost("registeradmin")]
        public async Task<IActionResult> RegisterAdmin(RegisterEmployeeDto user)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var employee = new Employee
                {
                    UserName = user.Email,
                    Role = user.Role,
                };

                var createdUser = await _employeeManager.CreateAsync(employee, user.Password);

                if (createdUser.Succeeded)
                {
                    return Ok(
                        new NewUserDto
                        {
                            Email = employee.UserName,
                            Token = _tokenService.CreateToken(employee, employee.Role)
                        });
                }
                else
                {
                    return BadRequest(createdUser.Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("getemployee")]
        public async Task<IActionResult> GetEmployee()
        {
            var employees = await _employeeManager.Users.ToListAsync();

            return Ok(employees);
        }
    }
}
