using DIAN_.DTOs.CategoryDTO;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class CategoryMapper
    {
        public static CategoryDetailDto ToCategoryDetailDTO(this Category category, Size size, List<string> sizes)
        {
            return new CategoryDetailDto
            {
                Name = category.Name,
                Size = sizes,
            };
        }
    }
}


