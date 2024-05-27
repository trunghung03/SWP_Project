using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Mvc;
using System.Formats.Asn1;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var categories = await _categoryRepository.GetAllAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null) return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryDTO categoryDTO)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var category = await _categoryRepository.CreateAsync(categoryDTO.FromCreateDtoToModel());

            if (category == null) { return  BadRequest("Duplicate category! Please try again!"); }

            return Ok(category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCategoryDTO categoryDTO)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var category = await _categoryRepository.UpdateAsync(id, categoryDTO.FromUpdateDtoToModel());

            if (category == null) { return BadRequest("Error! Please try again!"); }

            return Ok(category);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var category = await _categoryRepository.DeleteAsync(id);
            if (category == null) return NotFound();

            return Ok(category);
        }
    }
}
