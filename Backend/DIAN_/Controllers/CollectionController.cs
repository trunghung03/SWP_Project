using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/collection")]
    public class CollectionController : ControllerBase
    {
        private readonly ICollectionRepository _collectionRepository;
        public CollectionController(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); };

            var collections = await _collectionRepository.GetAllAsync();
            var collectionsDto = collections.Select(collection => collection.ToCollectionDTO());
            return Ok(collectionsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var collection = await _collectionRepository.GetByIdAsync(id);
            if (collection == null) return NotFound();

            return Ok(collection);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCollectionDTO collectionDTO)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var collection = await _collectionRepository.CreateAsync(collectionDTO.FromCreateDtoToCollection());

            if (collection == null) { return BadRequest("Duplicate category! Please try again!"); }

            return CreatedAtAction(nameof(GetById), new { id = collection.CollectionId }, collection); ;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCollectionDTO collectionDTO)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var collection = await _collectionRepository.UpdateAsync(id, collectionDTO.FromUpdateDtoToCollection());

            if (collection == null) { return BadRequest("Error! Please try again!"); }

            return Ok(collection);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var collection = await _collectionRepository.DeleteAsync(id);
            if (collection == null) return NotFound();

            return Ok(collection);
        }
    }
}
