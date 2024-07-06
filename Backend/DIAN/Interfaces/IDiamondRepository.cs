﻿using DIAN_.DTOs.DiamondDto;
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
        Task<List<Diamond>> GetAll(); //not paging
        Task<Diamond> AddDiamondAsync(Diamond diamond);
        Task<Diamond?> UpdateDiamondAsync(Diamond diamondModel, int id);
        Task<Diamond?> DeleteDiamondAsync(int id);
        Task<Diamond?> UpdateAmountAvailable(Diamond diamondModel, int id);
        Task<List<Diamond>> GetDiamondsBy4cAsync(decimal carat, string cut, string color, string clarity);

        Task<List<Diamond>> GetDiamondsByProductIdAsync(int productId);
        Task<List<Diamond>> GetDiamondsByCaratAsync(decimal minCarat, decimal maxCarat);

        Task<Diamond?> UpdateProductId(UpdateProductIdForDiamondDto updateProductIdForDiamondDto, int id);
        //Task<Diamond?> UpdateDiamondCertificate(Diamond diamondModel, int id);
    }
}
