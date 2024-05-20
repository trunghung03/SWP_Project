using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        [Required] 
        public string Password { get; set; }
    }
}
