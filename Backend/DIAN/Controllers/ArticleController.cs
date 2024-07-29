using DIAN_.DTOs.ArticleDTO;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Mvc;

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
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var article = await _articleRepository.GetArticleByIdAsync(id);

                if (article == null)
                {
                    return NotFound(new { message = "No article found with the given id" });
                }

                var articleDto = article.ToArticleDetailDto();

                return Ok(articleDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while processing your request" });
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
            catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("{title}")]
        public async Task<IActionResult> GetArticleByTitle(string title)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var articles = await _articleRepository.GetArticleByTitleAsync(title);
                if (articles == null || articles.Count == 0)
                {
                    return NotFound("No articles found with the given title");
                }

                // Assuming you have a ToArticleDetailDto extension method
                var articleDtos = articles.Select(a => a.ToArticleDetailDto()).ToList();

                return Ok(articleDtos);
            }
            catch(Exception)
            {
                throw;
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
                var createdArticle = await _articleRepository.CreateArticleAsync(articleModel);
                return CreatedAtAction(nameof(GetArticleById), new { id = createdArticle.ContentId }, createdArticle.ToArticleDetailDto());
            }
            catch(Exception)
            {
                throw;
            }
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> UpdateArticleById([FromRoute] int id, [FromBody] UpdateArticleRequestDto articleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var existingArticles = await _articleRepository.GetArticleByIdAsync(id);

                var article = await _articleRepository.UpdateArticleAsync(id, articleDto.ToArticleFromUpdate(id));
                if (article == null)
                {
                    return NotFound("Cannot update content due to duplicate title.");
                }
                return Ok(article.ToArticleDetailDto());
            }
            catch(Exception)
            {
                throw;
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> DeleteArticle([FromRoute] int id)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var article = await _articleRepository.DeleteArticleAsync(id);
                if (article == null)
                {
                    return NotFound("Article does not exist");
                }
                return Ok(article.ToArticleDetailDto());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("employee-name/{id:int}")]
        public async Task<IActionResult> GetEmployeeNameByArticleId(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var employeeName = await _articleRepository.GetEmployeeNameByArticleIdAsync(id);
                if (employeeName == null)
                {
                    return NotFound("No article found with the given id or employee not found");
                }

                return Ok(employeeName);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
