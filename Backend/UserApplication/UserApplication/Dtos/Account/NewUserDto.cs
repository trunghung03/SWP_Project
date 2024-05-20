using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class NewUserDto
    {
        [Required(ErrorMessage = "First name is required")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        public string Token { get; set; }
    }
}
