using DIAN_.DTOs.CategoryDTO;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class CategoryMapper
    {
        public static Category FromCreateDtoToModel(this CreateCategoryDTO categoryDto)
        {
            return new Category
            {
                Name = categoryDto.Name,
                Status = true,
            };
        }

        public static Category FromUpdateDtoToModel(this UpdateCategoryDTO categoryDto)
        {
            return new Category
            {
                Name = categoryDto.Name,
                Status = (bool) categoryDto.Status,
            };
        }
    }
}
