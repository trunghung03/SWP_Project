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
                CollectionId = collectionDto.CollectionId,
                Name = collectionDto.Name,
                Description = collectionDto.Description,
                Status = true,
                CollectionImage = collectionDto.ImageLink
            };
        }

        public static Collection FromUpdateDtoToCollection(this UpdateCollectionDTO updateCollectionDTO)
        {
            return new Collection()
            {
                Name = updateCollectionDTO.Name,
                Description = updateCollectionDTO.Description,
                Status = updateCollectionDTO.Status ?? true,
                CollectionImage = updateCollectionDTO.ImageLink
            };
        }

        public static CollectionDTO ToCollectionDTO(this Collection collection)
        {
            return new CollectionDTO
            {
                CollectionId = collection.CollectionId,
                Name = collection.Name,
                Description = collection.Description,
                Status = collection.Status,
                ImageLink = collection.CollectionImage,
                Products = collection.Products.Select(p => p.ToProductListDTO()).ToList() //required main diamond attribute
            };
        }


        public static NewestCollectionDTO ToNewestCollectionDTO(this Collection collection)
        {
            return new NewestCollectionDTO
            {
                CollectionId = collection.CollectionId,
                Name = collection.Name
            };
        }
    }
}
