﻿using Microsoft.AspNetCore.Mvc;
using UserApplication.Dtos.Account;
using UserApplication.Interfaces;
using DIAN_.DTOs.Account;
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
        private readonly IOrderDetailRepository _orderDetailRepository;
        public EmployeeController(ITokenService tokenService, IEmployeeRepository employeeRepository, 
            ISalesStaffService salesStaffService, IDeliveryStaffService deliveryStaffService, IOrderDetailRepository orderDetailRepository)
        {
            _tokenService = tokenService;
            _employeeRepository = employeeRepository;
            _salesStaffService = salesStaffService;
            _deliveryStaffService = deliveryStaffService;
            _orderDetailRepository = orderDetailRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var employee = await _employeeRepository.LoginAsync(loginDto);
                if (employee == null) { return Unauthorized("Invalid Email or Password!"); }

                return Ok(
                    new NewUserDto
                    {
                        Email = employee.Email,
                        Token = _tokenService.CreateEmployeeToken(employee)
                    });
            }
            catch(Exception)
            {
                throw;
            }
        }

        [HttpPost("registeremployee")]
        public async Task<IActionResult> Register(RegisterEmployeeDto user)
        {
            try
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
            catch(Exception)
            {
                throw;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var employee = await _employeeRepository.GetAllAsync();

                return Ok(employee);
            }
            catch(Exception)
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

                var employee = await _employeeRepository.GetByEmailAsync(email);
                if (employee == null) return NotFound();

                return Ok(employee);
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

                var employee = await _employeeRepository.GetByIdAsync(id);
                if (employee == null) return NotFound();

                return Ok(employee);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateEmployeeDto employeeDto)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var employee = await _employeeRepository.UpdateAsync(id, employeeDto);
                if (employee == null) return NotFound();
                return Ok(employee);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var employee = await _employeeRepository.DeleteAsync(id);

                if (employee == null) return NotFound();

                return NoContent();
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("role/{role}")]
        public async Task<IActionResult> GetEmployeeByRole(string role)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var employees = await _employeeRepository.GetEmployeeByRole(role);

                return Ok(employees);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("salesstaff/orderlists")]
        public async Task<IActionResult> ViewListOrdersAssign( int staffId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };
                var orders = await _salesStaffService.ViewListOrdersAssign(staffId);

                return Ok(orders);
            }catch(Exception)
            {
                throw;
            }
        }
        [HttpGet("salesstaff/status/{status}")] 
        public async Task<IActionResult> ViewListOrdersByStatus(string status, int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var orders = await _salesStaffService.ViewListOrdersByStatus(status, id);

                return Ok(orders);
            }catch(Exception)
            {
                throw;
            }
        }
        [HttpGet("deliverystaff/status/{status}")]
        public async Task<IActionResult> ViewListDeliveryOrdersByStatus(string status, int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var orders = await _deliveryStaffService.ViewListOrdersByStatus(status, id);

                return Ok(orders);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("salesstaff/updatestatus")]
        public async Task<IActionResult> SalesStaffUpdateOrderStatus(string status, int orderId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var order = await _salesStaffService.UpdateOrderStatus(status, orderId);

                return Ok(order);
            }catch(Exception) {
                throw;
            }
        }

        //For delivery staff
        [HttpGet("deliverystaff/orderlists")]
        public async Task<IActionResult> ViewListDeliveryOrders(int staffId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var orders = await _deliveryStaffService.ViewListDeliveryOrders(staffId);

                return Ok(orders);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpPut("deliverystaff/updatestatus")]
        public async Task<IActionResult> DeliveryStaffUpdateDeliveryStatus(string status, int orderId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var order = await _deliveryStaffService.UpdateDeliveryStatus(status, orderId);

                return Ok(order.OrderStatus);
            }catch(Exception)
            {
                throw;
            }
        }
        [HttpPut("customer/{id}")]
        public async Task<IActionResult> DeactivateAndActivateCustomer(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var result = await _employeeRepository.DeactivateAndActivateCustomer(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }catch(Exception)
            {
                throw;
            }
        }
        [HttpPut("staff/{id}")]
        public async Task<IActionResult> DeactivateAndActivateStaff(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var result = await _employeeRepository.DeactivateAndActivateEmployee(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("view-order-detail-bill")]
        public async Task<IActionResult> ViewOrderBillAsync(int orderId)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var result = await _orderDetailRepository.ViewOrderBillAsync(orderId);

                return Ok(result);
            }catch(Exception)
            {
                throw;
            }
        }
    }
}
