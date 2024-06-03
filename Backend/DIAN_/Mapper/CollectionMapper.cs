using DIAN_.DTOs.CategoryDTO;
using DIAN_.DTOs.CollectionDTO;
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
                Status = updateCollectionDTO.Status ?? true,
            };
        }

        public static CollectionDTO ToCollectionDTO(this Collection collection)
        {
            return new CollectionDTO
            {
                CollectionId = collection.CollectionId,
                Name = collection.Name,
                Description = collection.Description,
                Products = collection.Products.Select(p => p.ToProductListDTO(p.MainDiamond)).ToList()
            };
        }
    }
}
