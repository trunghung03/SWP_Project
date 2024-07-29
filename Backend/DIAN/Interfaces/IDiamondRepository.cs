using DIAN_.DTOs.DiamondDto;
using DIAN_.Helper;
using DIAN_.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DIAN_.Interfaces
{
    public interface IDiamondRepository
    {
        Task<Diamond?> GetDiamondByIdAsync(int id);
        Task<List<Diamond>> GetDiamondByShapeAsync(string shape);
        Task<(List<Diamond>, int)> GetAllDiamondsAsync(DiamondQuery query);
        Task<List<Diamond>> GetAllDiamond();
        Task<Diamond> AddDiamondAsync(Diamond diamond);
        Task<Diamond?> UpdateDiamondAsync(Diamond diamondModel, int id);
        Task<Diamond?> DeleteDiamondAsync(int id);
        Task<Diamond?> UpdateDiamondCertificate(Diamond diamondModel, int id);
        Task<Diamondattribute> GetDiamondAttributeByIdAsync(int diamondAttributeId);
        Task<List<Diamond>> GetDiamondsByAttributeIdAsync(int attributeId);
        Task<List<Diamond>> GetDiamondsByAttributeIdForCancelAsync(int attributeId);

        // In IDiamondRepository
        Task<int> CountDiamondsByAttributesAsync(string shape, string color, string clarity, string cut, decimal carat);
        Task<int> CountDiamondsByAttributesAsync(int mainDiamondAttributeId);

        //Task<Diamond?> UpdateDiamondStatus(int diamondId);
        Task<Diamond> UpdateMainDiamondOrderDetailId(int? orderDetailId, int diamondAttributeId);
        Task<Diamond> UpdateMainDiamondOrderDetailIdForCancel(int oldOrderDetailId, int? orderDetailId, int diamondAttributeId);

        Task<List<Diamond>> FindAvailableDiamond(int mainDiamondAttributeId);
        Task<List<Diamond>> SearchDiamondsAsync(DiamondSearchCriteria searchCriteria);

        Task<List<Diamond>> SearchMainDIamondAsync(DiamondSearch search);


    }
}
