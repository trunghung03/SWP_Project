﻿using DIAN_.DTOs.Account;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using UserApplication.Dtos.Account;

namespace DIAN_.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<Employee?> LoginAsync(LoginDto loginDto);
        Task<Employee?> RegisterAsync(RegisterEmployeeDto user);
        Task<List<Employee>> GetAllAsync();
        Task<Employee?> GetByEmailAsync(string email);
        Task<Employee?> GetByIdAsync(int id);
        Task<Employee?> UpdateAsync(int id, UpdateEmployeeDto employeeDto);
        Task<Employee?> DeleteAsync(int id);
        Task<List<Employee>>? SearchByNameAsyncs(string name);
        Task<List<Employee>> GetEmployeeByRole(string role);

        Task<bool> DeactivateAndActivateCustomer(int id);

        Task<bool> DeactivateAndActivateEmployee(int id);

        Task<Employee?> ChangePassword(Employee customer, string oldPassword, string newPassword);
    }
}
