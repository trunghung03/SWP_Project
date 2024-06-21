using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class RegisterUserDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, ErrorMessage = "Password must be between 6 and 100 characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? FirstName { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }

        public long? Points { get; set; }
    }
}
