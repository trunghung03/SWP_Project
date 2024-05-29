using DIAN_.DTOs.Account;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApplication.Dtos.Account;

namespace DIAN_.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        public EmployeeRepository(ApplicationDbContext context) 
        {
            _context = context;
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

        public async Task<Employee?> LoginAsync(LoginDto loginDto)
        {

            var employee = await _context.Employees.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (employee == null) { return null; }

            if (employee.Password != loginDto.Password) { return null; }

            return employee;
        }

        public async Task<Employee?> RegisterAsync(RegisterEmployeeDto user)
        {
            if (_context.Employees.Any(_context => _context.Email == user.Email)) { return null; }

            var employee = new Employee
            {
                Email = user.Email,
                Password = user.Password,
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
            employee.Password = employeeDto.Password;
            employee.LastName = employeeDto.LastName;
            employee.FirstName = employeeDto.FirstName;
            employee.Address = employeeDto.Address;
            employee.PhoneNumber = employeeDto.PhoneNumber;
            employee.Role = employeeDto.Role;
            employee.Status = employeeDto.Status;

            await _context.SaveChangesAsync();
            return employee;
        }
    }
}
