using DIAN_.DTOs.Account;
using DIAN_.DTOs.AccountDTO;
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

        Task<string?> GetCustomerEmail(int id);
        Task<Customer?> GetByIdAsync(int id);
        Task<Customer?> UpdateAsync(string email, UpdateUserDto customerDto);
        Task<Customer?> UpdateCustomerPoint(int id, UpdateCustomerPointDto customerDto);
        Task<Customer?> DeleteAsync(string email);

        Task<List<Customer>>? SearchByNameAsyncs(string name);
        Task<bool> ResetPasswordRequestAsync(ResetPasswordDto resetPasswordDto);

        Task<bool> ResetPassworConfirmdAsync(Customer customer, string token, string newPassword);

        Task<Customer?> ChangePassword(Customer customer, string oldPassword, string newPassword);
    }
}
