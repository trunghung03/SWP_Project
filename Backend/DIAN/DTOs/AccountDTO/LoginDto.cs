using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Account
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        //[StringLength(20, MinimumLength = 6)]
        //[DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
