using DIAN_.Interfaces;
using DIAN_.Models;

namespace DIAN_.Repository
{
    public class DiamondAttributeRepository : IDiamondAttributeRepository
    {
        private readonly ApplicationDbContext _context;

        public DiamondAttributeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Diamondattribute> CreateDiamondAttributeAsync(Diamondattribute diamondAttribute)
        {
            var existingDiamondAttribute = _context.Diamondattributes.FirstOrDefault(x => x.Shape == diamondAttribute.Shape 
            && x.Color == diamondAttribute.Color
            && x.Clarity == diamondAttribute.Clarity 
            && x.Cut == diamondAttribute.Cut 
            && x.Carat == diamondAttribute.Carat);

            if (existingDiamondAttribute != null)
            {
                _context.Diamondattributes.Add(diamondAttribute);
                await _context.SaveChangesAsync();
                return diamondAttribute;
            }
            return null;
        }

        public Task<Diamondattribute> DeleteDiamondAttributeAsync(Diamondattribute diamondAttribute)
        {
            throw new NotImplementedException();
        }

        public async Task<Diamondattribute> GetDiamondAttributeIdByDetailsAsync(string shape, string color, string clarity, string cut, decimal carat)
        {
            var diamondAttribute = _context.Diamondattributes
                .FirstOrDefault(x => x.Shape == shape && x.Color == color && x.Clarity == clarity && x.Cut == cut && x.Carat == carat);
            if (diamondAttribute == null)
            {
                return null;
            }
            return diamondAttribute;

        }

        public Task<IEnumerable<Diamondattribute>> GetDiamondAttributesAsync()
        {
            throw new NotImplementedException();
        }
        public async Task<Diamondattribute> GetDiamondAttributesAsync(int diamondAttributeId)
        {
            var diamondAttribute = _context.Diamondattributes
                .FirstOrDefault(x => x.DiamondAtrributeId == diamondAttributeId);
            if (diamondAttribute == null)
            {
                return null;
            }
            return diamondAttribute;
        }
        public Task<Diamondattribute> UpdateDiamondAttributeAsync(Diamondattribute diamondAttribute)
        {
            throw new NotImplementedException();
        }
    }
}
