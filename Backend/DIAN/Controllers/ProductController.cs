using DIAN_.DTOs.ProductDTOs;
using DIAN_.Helper;
using DIAN_.Models;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DIAN_.Repository;

namespace DIAN_.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IProductRepository _productRepo;
        private readonly IGoodsService _goodsService;
        public ProductController(ApplicationDbContext context, IProductRepository productRepo, IGoodsService goodsService)
        {
            _productRepo = productRepo;
            _context = context;
            _goodsService = goodsService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetList()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var products = await _productRepo.GetListAsync();

                var productDTOs = products.Select(p => p.ToProductListDTO()).ToList();
                return Ok(productDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("diamondproduct")]
        public async Task<IActionResult> GetListDiamondProduct()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var products = await _productRepo.GetDiamondProduct();

                var productDTOs = products.Select(p => p.ToProductListDTO()).ToList();
                return Ok(productDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("product-detail/{productId}")]
        public async Task<IActionResult> GetProductDetail([FromRoute] int productId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productDetail = await _productRepo.GetProductDetail(productId);
                if (productDetail == null)
                {
                    return NotFound();
                }
                return Ok(productDetail);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var product = await _productRepo.GetByIdAsync(id);
                if (product == null)
                {
                    return NotFound();
                }
                return Ok(product.ToProductDTO());
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductRequestDTO productDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productModel = await _goodsService.CreateProductAsync(productDTO); 

                if (productModel == null || productModel.ProductId == 0)
                {
                    return BadRequest("Product creation failed.");
                }
                return CreatedAtAction(nameof(GetById), new { id = productModel.ProductId }, productModel);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("checkstock")]
        public async Task<IActionResult> CheckStock([FromQuery] int productId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var stockAvailable = await _goodsService.CheckStockAvailable(productId);
                if (!stockAvailable)
                {
                    return BadRequest("Not enough stock");
                }
                return Ok("Available");
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateProductRequestDTO updateDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var product = await _productRepo.UpdateProductAsync(updateDTO.ToProductFromUpdateDTO(id), id);
                if (product == null)
                {
                    return NotFound("Promotion does not exist");
                }
                return Ok(product.ToProductDTO());
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll([FromQuery] ProductQuery query)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var (products, totalItems) = await _productRepo.GetAllAsync(query);

                if (!products.Any())
                {
                    return NotFound("Product does not exist");
                }

                var pagination = new
                {
                    currentPage = query.PageNumber,
                    pageSize = query.PageSize,
                    totalPages = (int)Math.Ceiling((double)totalItems / query.PageSize),
                    totalCount = totalItems
                };

                return Ok(new { data = products.Select(p => p.ToProductDTO()), pagination });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                await _productRepo.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetDetail([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productDetail = await _productRepo.GetDetailAsync(id);
                if (productDetail == null)
                {
                    return NotFound();
                }
                return Ok(productDetail.ToProductDetailDTO(new List<string>()));
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet("search")]
        public async Task<IActionResult> GetByName([FromQuery] string name)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var products = await _productRepo.GetByNameAsync(name);
                var productDTOs = products.Select(p => p.ToProductListDTO()).ToList();
                return Ok(productDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("has-sufficient-diamonds-for-product")]
        public async Task<IActionResult> HasSufficientDiamondsForProduct([FromQuery] int productId)
        {
            try
            {
                var result = await _productRepo.HasSufficientDiamondsForProduct(productId);
                return Ok(new { available = result });
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("are-diamonds-sufficient-for-all")]
        public async Task<IActionResult> AreDiamondsSufficientForAllProducts([FromQuery] int diamondAttributeId)
        {
            try
            {
                var result = await _productRepo.AreDiamondsSufficientForAllProducts(diamondAttributeId);
                return Ok(new { available = result });
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet("code/{code}")]
        public async Task<IActionResult> GetByCode([FromRoute] string code)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var products = await _productRepo.GetProductByCode(code);
                if (products == null || !products.Any())
                {
                    return NotFound();
                }
                var productDTOs = products.Select(product => product.ToProductDTO()).ToList();
                return Ok(productDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("newest")]
        public async Task<IActionResult> GetLast8Products()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var products = await _productRepo.GetLast8ProductsAsync();
                if (products == null || !products.Any())
                {
                    return NotFound();
                }

                // Assuming ToProductListDTO does not require the diamond object as a parameter
                var productDTOs = products.Select(p => p.ToProductListDTO()).ToList();

                return Ok(productDTOs);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("searchAllFields")]
        public async Task<IActionResult> SearchProductsAsync([FromQuery] string query)
        {
            try
            {
                var searchCriteria = new ProductSearch
                {
                    Query = query
                };

                var products = await _productRepo.SearchProductsAsync(searchCriteria);

                if (!products.Any())
                {
                    return NotFound("No products match the search criteria.");
                }

                var productDTOs = products.Select(product => product.ToProductDTO()).ToList();
                return Ok(productDTOs);
            }
            catch (Exception ex)
            {
                // Log exception here if necessary
                return StatusCode(500, "Internal server error");
            }
        }


    }
}
