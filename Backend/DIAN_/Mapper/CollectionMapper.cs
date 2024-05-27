using DIAN_.DTOs.CategoryDTO;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class CollectionMapper
    {
        public static Collection FromCreateDtoToCollection(this CreateCollectionDTO collectionDto) 
        {
            return new Collection()
            {
                Name = collectionDto.Name,
                Description = collectionDto.Description,
                Status = true,
            };
        }

        public static Collection FromUpdateDtoToCollection(this UpdateCollectionDTO updateCollectionDTO)
        {
            return new Collection()
            {
                Name = updateCollectionDTO.Name,
                Description = updateCollectionDTO.Description,
                Status = (bool) updateCollectionDTO.Status,
            };
        }
    }
}
