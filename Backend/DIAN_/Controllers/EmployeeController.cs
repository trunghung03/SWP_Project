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

namespace UserApplication.Controllers
{
    [ApiController]
    [Route("api/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ISalesStaffService _salesStaffService;
        private readonly IDeliveryStaffService _deliveryStaffService;

        public EmployeeController(ITokenService tokenService, IEmployeeRepository employeeRepository,
            ISalesStaffService salesStaffService, IDeliveryStaffService deliveryStaffService)
        {
            _tokenService = tokenService;
            _employeeRepository = employeeRepository;
            _salesStaffService = salesStaffService;
            _deliveryStaffService = deliveryStaffService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
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
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("registeremployee")]
        public async Task<IActionResult> Register(RegisterEmployeeDto user)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var employee = await _employeeRepository.RegisterAsync(user);

                if (employee == null) return BadRequest("Email already exists!");

                return Ok(
                    new NewUserDto
                    {
                        Email = employee.Email,
                        Token = _tokenService.CreateEmployeeToken(employee)
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
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var employee = await _employeeRepository.GetAllAsync();
                return Ok(employee);
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
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var employee = await _employeeRepository.GetByEmailAsync(email);
                if (employee == null) return NotFound();

                return Ok(employee);
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
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var employee = await _employeeRepository.GetByIdAsync(id);
                if (employee == null) return NotFound();

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateEmployeeDto employeeDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var employee = await _employeeRepository.UpdateAsync(id, employeeDto);
                if (employee == null) return NotFound();
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var employee = await _employeeRepository.DeleteAsync(id);
                if (employee == null) return NotFound();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // For sales staff   
        [HttpGet("salesstaff/orderlists")]
        public async Task<IActionResult> ViewListOrdersAssign([FromQuery] int staffId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var orders = await _salesStaffService.ViewListOrdersAssign(staffId);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("salesstaff/updatestatus")]
        public async Task<IActionResult> SalesStaffUpdateOrderStatus(string status, int orderId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var order = await _salesStaffService.UpdateOrderStatus(status, orderId);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // For delivery staff
        [HttpGet("deliverystaff/orderlists")]
        public async Task<IActionResult> ViewListDeliveryOrders([FromQuery] int staffId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var orders = await _deliveryStaffService.ViewListDeliveryOrders(staffId);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("deliverystaff/updatestatus")]
        public async Task<IActionResult> DeliveryStaffUpdateDeliveryStatus(string status, int orderId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var order = await _deliveryStaffService.UpdateDeliveryStatus(status, orderId);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
