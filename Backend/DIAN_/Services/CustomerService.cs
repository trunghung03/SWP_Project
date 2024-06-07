using DIAN_.DTOs.AccountDTO;
using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
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
        public CustomerService(ICustomerRepository customerRepository, ITokenService tokenService, IConfiguration configuration)
        {
            _customerRepository = customerRepository;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        public async Task<IdentityResult> ResetPasswordAsync(Customer user, string token, string newPassword)
        {
            // Validate the token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["SecretKey"]); // Replace "SecretKey" with the actual key in your configuration

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // Set clock skew to zero so tokens expire exactly at token expiration time
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                // If token is valid, reset the password
                if (jwtToken != null)
                {
                    var result = await _customerRepository.ResetPasswordAsync(user, token, newPassword);
                    return result ? IdentityResult.Success : IdentityResult.Failed(new IdentityError { Description = "Failed to update the password." });
                }
                else
                {
                    return IdentityResult.Failed(new IdentityError { Description = "Invalid token." });
                }
            }
            catch
            {
                // Token validation failed
                return IdentityResult.Failed(new IdentityError { Description = "Token validation failed." });
            }
        }

        public async Task<bool> ConfirmResetPasswordAsync(ResetPasswordDto confirmDto)
        {
            var user = await _customerRepository.GetByEmailAsync(confirmDto.Email);
            if (user == null) return false;

            var token = HttpUtility.UrlDecode(confirmDto.Token);
            var result = await _customerRepository.ResetPasswordAsync(user, token, confirmDto.ConfirmPassword);

            return result;
        }
        public async Task<bool> ResetPasswordRequestAsync(ForgotPasswordDto resetPasswordDto)
        {
            var user = await _customerRepository.GetByEmailAsync(resetPasswordDto.Email);
            if (user == null) throw new ArgumentException("No account found with the provided email.");
            var token = _tokenService.CreateCustomerToken(user);
            var callbackUrl = $"http://localhost:3000/reset-password?token={HttpUtility.UrlEncode(token)}&email={HttpUtility.UrlEncode(resetPasswordDto.Email)}";
            var message = new MailRequest
            {
                ToEmail = user.Email,
                Subject = "Reset password token",
                Body = $"Please reset your password by <a href='{callbackUrl}'>clicking here</a>.",
            };
            await _emailService.SendEmailAsync(message);
            return true;
        }

    }
}
