using DIAN_.DTOs.CategoryDTO;
using DIAN_.DTOs.CollectionDTO;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> GetAll(string role)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var collections = await _collectionRepository.GetAllAsync(role);
                var collectionsDto = collections.Select(collection => collection.ToCollectionDTO());
                return Ok(collectionsDto);
            }
            catch(Exception)
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

                var collection = await _collectionRepository.GetByIdAsync(id);
                if (collection == null) return NotFound();

                return Ok(collection);
            }
            catch(Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCollectionDTO collectionDTO)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var collection = await _collectionRepository.CreateAsync(collectionDTO.FromCreateDtoToCollection());

               // if (collection != null) { return BadRequest("Duplicate category! Please try again!"); }

                return CreatedAtAction(nameof(GetById), new { id = collection.CollectionId }, collection);
            }
            catch(Exception)
            {
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateCollectionDTO collectionDTO)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); }

                var collection = await _collectionRepository.UpdateAsync(id, collectionDTO.FromUpdateDtoToCollection());

                if (collection == null) { return BadRequest("Error! Please try again!"); }

                return Ok(collection);
            }
            catch(Exception)
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

                var collection = await _collectionRepository.DeleteAsync(id);
                if (collection == null) return NotFound();

                return Ok(collection);
            }
            catch(Exception)
            {
                throw;
            }
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCollectionStatus(int id)
        {
            try
            {
                if (!ModelState.IsValid) { return BadRequest(ModelState); };

                var result = await _collectionRepository.UpdateCollectionStatus(id);
                if (result)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("newest")]
        public async Task<IActionResult> GetNewestCollection()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var collection = await _collectionRepository.GetNewestCollectionAsync();
                if (collection == null)
                {
                    return NotFound();
                }

                var collectionDto = collection.ToNewestCollectionDTO();
                return Ok(collectionDto);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("searchAllFields")]
        public async Task<IActionResult> SearchCollection([FromQuery] string query)
        {
            try
            {
                var searchCriteria = new CollectionSearch
                {
                    Query = query
                };

                var collections = await _collectionRepository.SearchCollectionAsync(searchCriteria);

                if (!collections.Any())
                {
                    return NotFound("No Collections match the search criteria.");
                }

                var collDTOs = collections.Select(cl => cl.ToCollectionDTO()).ToList();
                return Ok(collDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
