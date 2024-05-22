using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Claims
{
    public class DeleteClaimDto
    {
        [Required]
        public string ClaimType { get; set; }
        [Required]
        public string ClaimValue { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
