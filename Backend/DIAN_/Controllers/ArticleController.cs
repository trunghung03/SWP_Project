using DIAN_.DTOs.ArticleDTO;
using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [Route("api/article")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
       private readonly IArticleRepository _articleRepository;

        public ArticleController(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            //try
            //{
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var article = await _articleRepository.GetAllAsync();
                if (article.Count == 0)
                {
                    return NotFound("Warranty does not exist");
                }
                return Ok(article);
            //}
            //catch (Exception ex)
            //{
            //    return StatusCode(500, "Internal server error");
            //}

        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetArticleById([FromRoute] int id)
        {
            //try
            //{
                var article = await _articleRepository.GetArticleByIdAsync(id);
                if (article == null)
                {
                    return NotFound("Content does not exist");
                }
               return Ok(article.ToArticleDto());
            //}
            //catch (Exception ex)
            //{
            //    return StatusCode(500, "Internal server error");
            //}
        }

        [HttpGet("{title}")]
        public async Task<IActionResult> GetArticleByTitle(string title)
        {
           // try
            //{
                var article = await _articleRepository.GetArticleByTitleAsync(title);
                if (article == null)
                {
                    return NotFound("Title does not exist");
                }
                return Ok(article.ToArticleDto());
           // }
            //catch (Exception ex)
            //{
            //    return StatusCode(500, "Internal server error");
            //}
        }

        [HttpPost("addcontent")]
        public async Task<IActionResult> CreateArticle([FromBody] CreateArticleRequestDto articleDto)
        {
            //try
            //{
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var existingContent = await _articleRepository.GetArticleByTitleAsync(articleDto.Title);
                if (existingContent != null)
                {
                    return BadRequest("Article already exists");
                }

                var articleModel = articleDto.ToArticleFromCreate();
                await _articleRepository.CreateArticleAsync(articleModel);
                return CreatedAtAction(nameof(GetArticleById), new { id = articleModel.ContentId }, articleModel.ToArticleDetailDto());
            //}
            //catch (Exception ex)
            //{
            //    return StatusCode(500, "Internal server error");
            //}
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateArticle([FromRoute] int id, [FromBody] UpdateArticleRequestDto warrantyDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var warranty = await _articleRepository.UpdateArticleAsync(id, warrantyDto.ToArticleFromUpdate(id));
                if (warranty == null)
                {
                    return NotFound("Warranty does not exist");
                }
                return Ok(warranty.ToArticleDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteArticle([FromRoute] int id, [FromBody] UpdateArticleRequestDto articleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var warranty = await _articleRepository.DeleteArticleAsync(id);
                if (warranty == null)
                {
                    return NotFound("Warranty does not exist");
                }
                return Ok(warranty.ToArticleDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
