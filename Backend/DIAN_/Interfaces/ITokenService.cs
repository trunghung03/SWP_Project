using DIAN_.Models;
using UserApplication.Helpers;

namespace UserApplication.Interfaces
{
    public interface ITokenService
    {
        string CreateCustomerToken(Customer user);
        string CreateEmployeeToken(Employee employee);
    }
}
