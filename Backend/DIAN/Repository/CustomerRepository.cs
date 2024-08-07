﻿using DIAN_.DTOs.Account;
using DIAN_.DTOs.AccountDTO;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using UserApplication.Dtos.Account;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace DIAN_.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher<Customer> _passwordHasher;
        public CustomerRepository(ApplicationDbContext context, IConfiguration configuration, IPasswordHasher<Customer> passwordHasher)
        {
            _context = context;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
        }
        public async Task<Customer?> DeleteAsync(string email)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
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
        public async Task<List<Customer>> SearchByNameAsyncs(string name)
        {
            var customers = await _context.Customers
                .Where(c => c.FirstName.Contains(name) ||
                            c.LastName.Contains(name) ||
                            (c.FirstName + " " + c.LastName).Contains(name))
                .ToListAsync();

            return customers;
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

            var verificationResult = _passwordHasher.VerifyHashedPassword(customer, customer.Password, loginDto.Password);
            if (verificationResult == PasswordVerificationResult.Failed) { return null; }

            return customer;
        }

        public async Task<Customer?> ChangePassword(Customer customerModel, string oldPassword, string newPassword)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(x => x.Email == customerModel.Email);
            if (customer == null) { return null; }
            var verificationResult = _passwordHasher.VerifyHashedPassword(customer, customer.Password, oldPassword);
            if (verificationResult == PasswordVerificationResult.Failed) { return null; }
            customer.Password = _passwordHasher.HashPassword(customer, newPassword);
            _context.Customers.Update(customer);
            var result = await _context.SaveChangesAsync();
            return customer;
        }

        public async Task<Customer?> RegisterAsync(RegisterUserDto user)
        {
            if (_context.Customers.Any(_context => _context.Email == user.Email)) { return null; }

            var customer = new Customer
            {
                Email = user.Email,
                Password = _passwordHasher.HashPassword(null, user.Password),
                //Password = _passwordHasher.HashPassword(new Customer(), user.Password ?? string.Empty),
                LastName = user.LastName,
                FirstName = user.FirstName,
                Address = user.Address ?? null,
                PhoneNumber = user.PhoneNumber ?? null,
                Points = 0,
                AccountType = user.AccountType,
                Status = true,
            };

            var createdUser = await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task<Customer?> UpdateAsync(string email, UpdateUserDto customerDto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
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

        public async Task<bool> ResetPasswordRequestAsync(ResetPasswordDto resetPasswordDto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == resetPasswordDto.Email);
            if (customer == null)
            {
                return false;
            }
            customer.Password = _passwordHasher.HashPassword(customer, resetPasswordDto.Password);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ResetPassworConfirmdAsync(Customer user, string token, string newPassword)
        {
            var customer = await _context.Customers.Where(c => c.Email == user.Email).FirstOrDefaultAsync();
            if (customer == null) return false;
            customer.Password = _passwordHasher.HashPassword(customer, newPassword);
            _context.Customers.Update(customer);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async  Task<string?> GetCustomerEmail(int id)
        {
            return await _context.Customers
                                 .Where(c => c.CustomerId == id)
                                 .Select(c => c.Email)
                                 .FirstOrDefaultAsync();
        }

        public async Task<List<string>> GetAllCustomerEmail()
        {
            return await _context.Customers
                                 .Where(c => c.Status == true)
                                 .Select(c => c.Email)
                                 .ToListAsync();
        }
    }
}
