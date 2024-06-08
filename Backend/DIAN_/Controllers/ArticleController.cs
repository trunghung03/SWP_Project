using DIAN_.DTOs.ArticleDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using DIAN_.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DIAN_.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleController(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetArticleById(int id)
        {
            try
            {
                var article = await _articleRepository.GetArticleByIdAsync(id);
                if (article == null)
                {
                    return NotFound("No article found with the given id");
                }

                var articleDto = article.ToArticleDetailDto();
                return Ok(articleDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
                var articles = await _articleRepository.GetAllAsync();
                if (articles.Count == 0)
                {
                    return NotFound("No articles found");
                }
                return Ok(articles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{title}")]
        public async Task<IActionResult> GetArticleByTitle(string title)
        {
            try
            {
                var articles = await _articleRepository.GetArticleByTitleAsync(title);
                if (articles == null || articles.Count == 0)
                {
                    return NotFound("No articles found with the given title");
                }

                var articleDtos = articles.Select(a => a.ToArticleDetailDto()).ToList();
                return Ok(articleDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("addcontent")]
        public async Task<IActionResult> CreateArticle([FromBody] CreateArticleRequestDto articleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingArticles = await _articleRepository.GetArticleByTitleAsync(articleDto.Title);
                if (existingArticles.Any(a => a.Title == articleDto.Title))
                {
                    return BadRequest("Article already exists");
                }

                var articleModel = articleDto.ToArticleFromCreate();
                await _articleRepository.CreateArticleAsync(articleModel);
                return CreatedAtAction(nameof(GetArticleByTitle), new { id = articleModel.ContentId }, articleModel.ToArticleDetailDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateArticle([FromRoute] int id, [FromBody] UpdateArticleRequestDto articleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var article = await _articleRepository.UpdateArticleAsync(id, articleDto.ToArticleFromUpdate(id));
                if (article == null)
                {
                    return NotFound("Article does not exist");
                }
                return Ok(article.ToDisplayArticleFromUpdate());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteArticle([FromRoute] int id)
        {
            try
            {
                var article = await _articleRepository.DeleteArticleAsync(id);
                if (article == null)
                {
                    return NotFound("Article does not exist");
                }
                return Ok(article.ToArticleDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
