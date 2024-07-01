using DIAN_.DTOs.AccountDTO;
using DIAN_.Helper;
using DIAN_.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Web;
using UserApplication.Interfaces;

namespace DIAN_.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public CustomerService(ICustomerRepository customerRepository, IEmailService emailService,
            ITokenService tokenService, IConfiguration configuration)
        {
            _customerRepository = customerRepository;
            _tokenService = tokenService;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<bool> ResetPasswordRequestAsync( ForgotPasswordDto resetPasswordDto)
        {
            var user = await _customerRepository.GetByEmailAsync(resetPasswordDto.Email);
            if (user == null) throw new ArgumentException("No account found with the provided email.");

            var token = _tokenService.CreateCustomerToken(user);
            var url = _configuration["ApiBaseUrl:Url"];
            var callbackUrl = $"{url}/reset-password?token={HttpUtility.UrlEncode(token)}&email={HttpUtility.UrlEncode(resetPasswordDto.Email)}";
            var message = new MailResetPassword
            {
                ToEmail = user.Email,
                Subject = "Reset password for Dian Jewelry",
                Body = $"You can reset your password by <a href='{callbackUrl}'>clicking here</a>.",
            };
            await _emailService.SendEmailReset(message);
            return true;
        }

        public async Task<IdentityResult> ConfirmResetPassword(ResetPasswordDto confirmDto)
        {
            var user = await _customerRepository.GetByEmailAsync(confirmDto.Email);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            var token = HttpUtility.UrlDecode(confirmDto.Token);
            var principal = _tokenService.ValidateToken(token);
            if (principal == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Invalid token." });
            }

            var result = await _customerRepository.ResetPassworConfirmdAsync(user, token, confirmDto.ConfirmPassword);
            return result ? IdentityResult.Success : IdentityResult.Failed(new IdentityError { Description = "Failed to reset password." });
        }

    }
}
