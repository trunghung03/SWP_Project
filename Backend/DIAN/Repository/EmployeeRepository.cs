using Castle.Core.Resource;
using DIAN_.DTOs.Account;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApplication.Dtos.Account;

namespace DIAN_.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<Employee> _passwordHasher;
        public EmployeeRepository(ApplicationDbContext context, IPasswordHasher<Employee> passwordHasher) 
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }
        public async Task<Employee?> DeleteAsync(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(c => c.EmployeeId == id);
            if (employee == null) return null;

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<List<Employee>> GetEmployeeByRole(string role)
        {
            var employees = await _context.Employees.Where(c => c.Role == role).ToListAsync();
            return employees;
        }

        public async Task<Employee?> GetByEmailAsync(string email)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(c => c.Email == email);
            if (employee == null) return null;

            return employee;
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(c => c.EmployeeId == id);
            if (employee == null) return null;

            return employee;
        }


        public async Task<List<Employee>> SearchByNameAsyncs(string name)
        {

            var employees = await _context.Employees
                .Where(c => c.FirstName.Contains(name) ||
                            c.LastName.Contains(name) ||
                            (c.FirstName + " " + c.LastName).Contains(name))
                .ToListAsync();

            return employees;
        }
        public async Task<Employee?> LoginAsync(LoginDto loginDto)
        {

            var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (employee == null) { return null; }

            var verificationResult = _passwordHasher.VerifyHashedPassword(employee, employee.Password, loginDto.Password);
            if (verificationResult == PasswordVerificationResult.Failed) { return null; }


            return employee;
        }

        public async Task<Employee?> RegisterAsync(RegisterEmployeeDto user)
        {
            if (_context.Employees.Any(_context => _context.Email == user.Email)) { return null; }

            var employee = new Employee
            {
                Email = user.Email,
                Password = _passwordHasher.HashPassword(null, user.Password),
                LastName = user.LastName,
                FirstName = user.FirstName,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                Status = true,
            };

            var createdUser = await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        public async Task<Employee?> UpdateAsync(int id, UpdateEmployeeDto employeeDto)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(c => c.EmployeeId == id);
            if (employee == null) return null;

            employee.Email = employeeDto.Email;
            if (employeeDto.Password != null)
            {
                employee.Password = _passwordHasher.HashPassword(employee, employeeDto.Password);
            }
            employee.LastName = employeeDto.LastName;
            employee.FirstName = employeeDto.FirstName;
            employee.Address = employeeDto.Address;
            employee.PhoneNumber = employeeDto.PhoneNumber;
            employee.Role = employeeDto.Role;
            employee.Status = employeeDto.Status;

            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> DeactivateAndActivateEmployee(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(c => c.EmployeeId == id);
            if (employee == null) return false;
            if (employee.Status == true) employee.Status = false;
            else if (employee.Status == false) employee.Status = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeactivateAndActivateCustomer(int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            if (customer == null) return false;
            if (customer.Status == true) customer.Status = false;
            else if (customer.Status == false) customer.Status = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Employee?> ChangePassword(Employee employeeModel, string oldPassword, string newPassword)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Email == employeeModel.Email);
            if (employee == null) { return null; }
            var verificationResult = _passwordHasher.VerifyHashedPassword(employee, employee.Password, oldPassword);
            if (verificationResult == PasswordVerificationResult.Failed) { return null; }
            employee.Password = _passwordHasher.HashPassword(employee, newPassword);
            _context.Employees.Update(employee);
            var result = await _context.SaveChangesAsync();
            return employee;
        }


    }
}
