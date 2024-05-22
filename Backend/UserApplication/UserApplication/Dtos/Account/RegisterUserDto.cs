using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class RegisterUserDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
