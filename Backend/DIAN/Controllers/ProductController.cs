using DIAN_.DTOs.ProductDTOs;
using DIAN_.Helper;
using DIAN_.Models;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                var productModel = await _goodsService.CreateProductAsync(productDTO); // This should return a ProductDTO

                // Assuming productModel already is a ProductDTO and has an Id property
                if (productModel == null || productModel.ProductId == 0) // Adjust the condition based on how you identify a valid product
                {
                    return BadRequest("Product creation failed.");
                }

                // Since productModel is already a ProductDTO, no need to convert
                return CreatedAtAction(nameof(GetById), new { id = productModel.ProductId }, productModel);
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

    }
}
