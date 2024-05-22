using System.ComponentModel.DataAnnotations;

namespace UserApplication.Dtos.Claims
{
    public class CreateClaimDto
    {
        [Required]
        public string ClaimType { get; set; }
        [Required]
        public string ClaimValue { get; set; }
    }
}
