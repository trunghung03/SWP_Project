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
    public class CustomerController : ControllerBase
    {
        private readonly UserManager<Customer> _customerManager;
        private readonly SignInManager<Customer> _cusSignInManager;
        private readonly UserManager<Employee> _employeeManager;
        private readonly SignInManager<Employee> _empSignInManager;
        private readonly ITokenService _tokenService;
        public CustomerController(UserManager<Customer> customerManager,
                                    SignInManager<Customer> cusSignInManager,
                                    UserManager<Employee> employeeManager, 
                                    SignInManager<Employee> empSignInManager,
                                    ITokenService tokenService)
        {
            _customerManager = customerManager;
            _cusSignInManager = cusSignInManager;
            _employeeManager = employeeManager;
            _empSignInManager = empSignInManager;
            _tokenService = tokenService;
        }

        [HttpPost("logincustomer")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var user = await _customerManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Email.ToLower());
            if (user == null) { return Unauthorized("Invalid Username!"); }

            var result = await _cusSignInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) { return Unauthorized("Username not found and/or password incorrect!"); }

            return Ok(
                new NewUserDto
                {
                    Email = user.UserName,
                    Token = _tokenService.CreateToken(user, Roles.User)
                });
        }

        [HttpPost("registercustomer")]
        public async Task<IActionResult> Register(RegisterCustomerDto user)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var customer = new Customer
                {
                    UserName = user.Email,
                };

                var createdUser = await _customerManager.CreateAsync(customer, user.Password);

                if (createdUser.Succeeded)
                {
                    return Ok(
                        new NewUserDto
                        {
                            Email = customer.UserName,
                            Token = _tokenService.CreateToken(customer, Roles.User)
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

        [HttpGet("getcustomer")]
        public async Task<IActionResult> GetCustomer()
        {
            var customers = await _customerManager.Users.ToListAsync();

            return Ok(customers);
        }

        [HttpGet("getemployee")]
        public async Task<IActionResult> GetEmployee()
        {
            var employees = await _employeeManager.Users.ToListAsync();

            return Ok(employees);
        }
    }
}
