using DIAN_.Models;
using System.Security.Claims;
using UserApplication.Helpers;

namespace UserApplication.Interfaces
{
    public interface ITokenService
    {
        string CreateCustomerToken(Customer user);
        string CreateEmployeeToken(Employee employee);
        ClaimsPrincipal ValidateToken(string token);
    }
}
