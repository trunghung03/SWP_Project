﻿using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface IDiamondAttributeRepository
    {
        Task<IEnumerable<Diamondattribute>> GetDiamondAttributesAsync();
        Task<Diamondattribute> GetDiamondAttributeByIdAsync(int diamondAttributeId);
        Task<Diamondattribute> CreateDiamondAttributeAsync(Diamondattribute diamondAttribute);
        Task<Diamondattribute> UpdateDiamondAttributeAsync(Diamondattribute diamondAttribute);
        Task<Diamondattribute> DeleteDiamondAttributeAsync(Diamondattribute diamondAttribute);

        Task<Diamondattribute?> GetDiamondAttributeIdByDetailsAsync(string shape, string color, string clarity, string cut, decimal carat);
    }
}
