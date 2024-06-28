using DIAN_.DTOs.AccountDTO;
using DIAN_.Models;
using Microsoft.AspNetCore.Identity;

namespace DIAN_.Interfaces
{
    public interface ICustomerService
    {
        Task<IdentityResult?> ConfirmResetPassword(ResetPasswordDto confirmDto);
        Task<bool> ResetPasswordRequestAsync(ForgotPasswordDto resetPasswordDto);


    }
}
