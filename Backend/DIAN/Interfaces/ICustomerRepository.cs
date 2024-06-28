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
        Task<Customer?> GetByIdAsync(int id);
        Task<Customer?> UpdateAsync(string email, UpdateUserDto customerDto);
        Task<Customer?> UpdateCustomerPoint(int id, UpdateCustomerPointDto customerDto);
        Task<Customer?> DeleteAsync(string email);

        Task<Customer?> SearchByNameAsyncs(string fisrstName);
        Task<bool> ResetPasswordRequestAsync(ResetPasswordDto resetPasswordDto);

        Task<bool> ResetPassworConfirmdAsync(Customer user, string token, string newPassword);
    }
}
