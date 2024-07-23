using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface ICompanyRepository
    {
        Task<decimal?> GetMarkupPriceAsync();
    }
}
