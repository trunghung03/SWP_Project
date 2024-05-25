using Microsoft.AspNetCore.Identity;
using UserApplication.Helpers;

namespace UserApplication.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(IdentityUser user, Roles role);
    }
}
