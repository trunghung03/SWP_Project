using DIAN_.DTOs.AccountDTO;
using Microsoft.AspNetCore.Identity;

namespace DIAN_.Services
{
    public interface ICustomerService
    {
        Task<IdentityResult> ConfirmResetPassword(ResetPasswordDto confirmDto);
        Task<bool> ResetPasswordRequestAsync(ForgotPasswordDto resetPasswordDto);


    }
}
