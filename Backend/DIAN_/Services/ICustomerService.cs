using DIAN_.DTOs.AccountDTO;

namespace DIAN_.Services
{
    public interface ICustomerService
    {
        Task<bool> ConfirmResetPasswordAsync(ResetPasswordDto confirmDto);
        Task<bool> ResetPasswordRequestAsync(ForgotPasswordDto resetPasswordDto);
    }
}
