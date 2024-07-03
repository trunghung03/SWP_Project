using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class NewUserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string AccountType { get; set; }
        [Required]
        public string Token { get; set; }
    }
}
