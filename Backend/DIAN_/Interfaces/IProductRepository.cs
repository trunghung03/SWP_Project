using DIAN_.DTOs;
using DIAN_.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IProductRepository
    {
        Task<List<ProductListDTO>> GetListAsync();
    }
}
