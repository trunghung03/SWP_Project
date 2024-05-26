﻿using DIAN_.DTOs.Account;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using UserApplication.Dtos.Account;

namespace DIAN_.Interfaces
{
    public interface ICustomerRepository
    {
        Task<Customer?> LoginAsync(LoginDto loginDto);
        Task<Customer?> RegisterAsync(RegisterUserDto user);
        Task<List<Customer>> GetAllAsync();
        Task<Customer?> GetByEmailAsync(string email);
        Task<Customer?> GetByIdAsync(int id);
        Task<Customer?> UpdateAsync(int id, UpdateUserDto customerDto);
        Task<Customer?> DeleteAsync(int id);
    }
}