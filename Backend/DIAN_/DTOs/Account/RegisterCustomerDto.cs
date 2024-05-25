using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class RegisterCustomerDto
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
