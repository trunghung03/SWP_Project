using Microsoft.AspNetCore.Identity;
using UserApplication.Helpers;

namespace UserApplication.Model
{
    public class AppUser : IdentityUser
    {
        
        public Roles Role { get; set; }
    }
}
