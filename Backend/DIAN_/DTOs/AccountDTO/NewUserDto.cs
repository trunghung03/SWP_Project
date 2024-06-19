using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class NewUserDto
    {
        [Required]
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
