using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly ApplicationDbContext _context;

        public CompanyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<decimal?> GetMarkupPriceAsync()
        {
            return await _context.Companies.Select(c => c.MarkupPrice).FirstOrDefaultAsync();
                
        }
    }
}
