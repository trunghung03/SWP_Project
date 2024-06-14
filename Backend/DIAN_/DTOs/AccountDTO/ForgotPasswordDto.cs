using System.ComponentModel.DataAnnotations;

namespace DIAN_.DTOs.AccountDTO
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }  = string.Empty;
    }
}
