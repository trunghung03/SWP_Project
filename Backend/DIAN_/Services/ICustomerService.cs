using DIAN_.DTOs.AccountDTO;
using DIAN_.Models;
using Microsoft.AspNetCore.Identity;

namespace DIAN_.Services
{
    public interface ICustomerService
    {
        Task<Customer?> ConfirmResetPassword(ResetPasswordDto confirmDto);
        Task<bool> ResetPasswordRequestAsync(ForgotPasswordDto resetPasswordDto);


    }
}
