using DIAN_.DTOs.CategoryDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/collections")]
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
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var collections = await _collectionRepository.GetAllAsync();
                var collectionsDto = collections.Select(collection => collection.ToCollectionDTO());
                return Ok(collectionsDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var collection = await _collectionRepository.GetByIdAsync(id);
                if (collection == null)
                {
                    return NotFound();
                }

                return Ok(collection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCollectionDTO collectionDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var collection = await _collectionRepository.CreateAsync(collectionDTO.FromCreateDtoToCollection());

                if (collection == null)
                {
                    return BadRequest("Duplicate category! Please try again!");
                }

                return CreatedAtAction(nameof(GetById), new { id = collection.CollectionId }, collection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCollectionDTO collectionDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var collection = await _collectionRepository.UpdateAsync(id, collectionDTO.FromUpdateDtoToCollection());

                if (collection == null)
                {
                    return BadRequest("Error! Please try again!");
                }

                return Ok(collection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var collection = await _collectionRepository.DeleteAsync(id);
                if (collection == null)
                {
                    return NotFound();
                }

                return Ok(collection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
