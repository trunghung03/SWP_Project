using System.ComponentModel.DataAnnotations;
using UserApplication.Helpers;

namespace DIAN_.DTOs.Account
{
    public class RegisterEmployeeDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public Roles Role { get; set; }
    }
}
