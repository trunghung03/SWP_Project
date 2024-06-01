using DIAN_.Models;
using DIAN_.DTOs.ProductDTOs;
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
        public ProductController(ApplicationDbContext context, IProductRepository productRepo)
        {
            _productRepo = productRepo;
            _context = context;
        }
       
        [HttpGet ("list")]
        public async Task<IActionResult> GetList()
        {
            var products = await _productRepo.GetListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductRequestDTO productDTO)
        {
            // Check if the MainDiamondId exists
            var mainDiamondExists = await _productRepo.ExistsMainDiamondAsync(productDTO.MainDiamondId);
            if (!mainDiamondExists)
            {
                return BadRequest("The specified MainDiamondId does not exist.");
            }

            // Check if the ProCode already exists
            var proCodeExists = await _productRepo.ExistsProCodeAsync(productDTO.ProductCode);
            if (proCodeExists)
            {
                return BadRequest($"The ProCode '{productDTO.ProductCode}' already exists.");
            }

            var product = productDTO.ToProductFromCreateDTO();
            var createdProduct = await _productRepo.CreateAsync(product);

            return CreatedAtAction(nameof(GetById), new { id = createdProduct.ProductId }, createdProduct);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateProductRequestDTO updateDTO)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            var productDTO = new ProductDTO
            {
                ProductId = id, // Ensure the ID is set correctly
                Name = updateDTO.Name,
                Description = updateDTO.Description,
                Price = updateDTO.Price,
                LaborPrice = updateDTO.LaborPrice,
                ImageLinkList = updateDTO.ImageLinkList,
                ChargeUp = updateDTO.ChargeUp,
                MainDiamondId = updateDTO.MainDiamondId,
                SubDiamondAmount = updateDTO.SubDiamondAmount,
                ProductCode = updateDTO.ProductCode,
                MainDiamondAmount = updateDTO.MainDiamondAmount,
                ShellAmount = updateDTO.ShellAmount,
                CollectionId= updateDTO.CollectionId,
                
            };

            var updatedProduct = await _productRepo.UpdateAsync(productDTO);
            return Ok(updatedProduct);
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productRepo.GetAllAsync();
            return Ok(products);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await _productRepo.DeleteAsync(id);
            return NoContent();
        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetDetail([FromRoute] int id)
        {
            var productDetail = await _productRepo.GetDetailAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }
            return Ok(productDetail);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetByName([FromQuery] string name)
        {
            var products = await _productRepo.GetByNameAsync(name);
            return Ok(products);
        }



    }
}
