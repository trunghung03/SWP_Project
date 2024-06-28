using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/categories")]
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
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var categories = await _categoryRepository.GetAllAsync();

                return Ok(categories);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var category = await _categoryRepository.GetByIdAsync(id);
                if (category == null) return NotFound();

                return Ok(category);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCategoryDTO categoryDTO)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var category = await _categoryRepository.CreateAsync(categoryDTO.FromCreateDtoToCategory());

                if (category == null) { return BadRequest("Duplicate category! Please try again!"); }

                return CreatedAtAction(nameof(GetById), new { id = category.CategoryId }, category);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCategoryDTO categoryDTO)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var category = await _categoryRepository.UpdateAsync(id, categoryDTO.FromUpdateDtoToCategory());

                if (category == null) { return BadRequest("Error! Please try again!"); }

                return Ok(category);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var category = await _categoryRepository.DeleteAsync(id);
                if (category == null) return NotFound();

                return Ok(category);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
