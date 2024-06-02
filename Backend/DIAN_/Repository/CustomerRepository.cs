using DIAN_.DTOs.Account;
using DIAN_.DTOs.AccountDTO;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserApplication.Dtos.Account;

namespace DIAN_.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;
        public CustomerRepository(ApplicationDbContext context) 
        {
            _context = context;
        }
        public async Task<Customer?> DeleteAsync(int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            if (customer == null) return null;

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<List<Customer>> GetAllAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer?> GetByEmailAsync(string email)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
            if (customer == null) return null;

            return customer;
        }

        public async Task<Customer?> GetByIdAsync(int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            if (customer == null) return null;

            return customer;
        }

        public async Task<Customer?> LoginAsync(LoginDto loginDto)
        {

            var customer = await _context.Customers.FirstOrDefaultAsync(x => x.Email == loginDto.Email);
            if (customer == null) { return null; }

            if (customer.Password != loginDto.Password) { return null; }

            return customer;
        }

        public async Task<Customer?> RegisterAsync(RegisterUserDto user)
        {
            if (_context.Customers.Any(_context => _context.Email == user.Email)) { return null; }

            var customer = new Customer
            {
                Email = user.Email,
                Password = user.Password,
                LastName = user.LastName,
                FirstName = user.FirstName,
                Address = user.Address ?? null,
                PhoneNumber = user.PhoneNumber ?? null,
                Points = 0,
                Status = true,
            };

            var createdUser = await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task<Customer?> UpdateAsync(int id, UpdateUserDto customerDto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            if (customer == null) return null;

            customer.Email = customerDto.Email;
            customer.Password = customerDto.Password;
            customer.LastName = customerDto.LastName;
            customer.FirstName = customerDto.FirstName;
            customer.Address = customerDto.Address;
            customer.PhoneNumber = customerDto.PhoneNumber;
            customer.Points = customerDto.Points;
            customer.Status = customerDto.Status;

            await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer?> UpdateCustomerPoint(int id, UpdateCustomerPointDto customerDto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            if (customer == null) return null;

            customer.Points = customerDto.Point;

            await _context.SaveChangesAsync();
            return customer;
        }
    }
}
