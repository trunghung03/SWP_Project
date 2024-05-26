using DIAN_.Models;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Controllers
{
    [Route("api/[controller]")]
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
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product.ToProductDTO());
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductRequestDTO product)
        {
            // Check if the MainDiamondId exists
            var mainDiamondExists = await _context.Diamonds.AnyAsync(d => d.DiamondId == product.MainDiamondId);
            if (!mainDiamondExists)
            {
                return BadRequest("The specified MainDiamondId does not exist.");
            }
            var proCodeExists = await _context.Products.AnyAsync(p => p.ProductCode == product.ProCode);
            if (proCodeExists)
            {
                return BadRequest($"The ProCode '{product.ProCode}' already exists.");
            }
            var ProductModel = product.ToProductFromCreateDTO();
            await _context.Products.AddAsync(ProductModel);
            try
            {
            await   _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                var errorMessage = ex.InnerException?.Message ?? ex.Message;
                // Log the detailed error message
                Console.WriteLine($"An error occurred while saving changes: {errorMessage}");

                // Optionally log the stack trace and inner exception details
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                    Console.WriteLine($"Stack Trace: {ex.InnerException.StackTrace}");
                }

                throw; // Optionally rethrow the exception if you want to handle it higher up
            }

            return CreatedAtAction(nameof(GetById), new { id = ProductModel.ProductId }, ProductModel.ToProductDTO());
        }
        [HttpPut]
        [Route("{id}")]
        public async  Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateProductRequestDTO updateDTO)
        {
            var ProductModel = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
            if (ProductModel == null)
            {
                return NotFound();
            }
            ProductModel.Name = updateDTO.Name;
            ProductModel.Description = updateDTO.Description;
            ProductModel.Price = updateDTO.Price;
            ProductModel.LaborPrice = updateDTO.LaborPrice;
            ProductModel.ImageLinkList = updateDTO.ImageLinkList;
            ProductModel.ChargeUp  = updateDTO.ChargeUp;
            ProductModel.MainDiamondId = updateDTO.MainDiamondId;
            ProductModel.SubDiamondAmount   = updateDTO.SubDiamondAmount;
            ProductModel.ProductCode = updateDTO.ProCode;
            ProductModel.MainDiamondAmount = updateDTO.MainDiamondAmount;
            ProductModel.ShellAmount = updateDTO.ShellAmount;

            await _context.SaveChangesAsync();
            return Ok(ProductModel.ToProductDTO());
        }
        [HttpGet ("all")]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                                   .Include(p => p.MainDiamond) 
                                   .Select(p => p.ToProductDTO())
                                   .ToListAsync();

            return Ok(products);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var productModel = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);
            if (productModel == null)
            {
                return NotFound();
            }

            // Set productModel.Status to false to mark it as deleted
            productModel.Status = false;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                var errorMessage = ex.InnerException?.Message ?? ex.Message;
                // Log the detailed error message
                Console.WriteLine($"An error occurred while saving changes: {errorMessage}");

                // Optionally log the stack trace and inner exception details
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                    Console.WriteLine($"Stack Trace: {ex.InnerException.StackTrace}");
                }

                throw; // Optionally rethrow the exception if you want to handle it higher up
            }

            return NoContent();
        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetDetail([FromRoute] int id)
        {
            var product = await _context.Products
                                  .Include(p => p.MainDiamond)
                                  .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            var mainDiamond = product.MainDiamond;

            // Retrieve all diamond colors from the database
            var subDiamondColors = await _context.Diamonds.Select(d => d.Color).ToListAsync();

            var productDetailDTO = product.ToProductDetailDTO(mainDiamond, subDiamondColors);

            return Ok(productDetailDTO);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetByName([FromQuery] string name)
        {
            var products = await _context.Products
                                   .Where(p => p.Name.Contains(name))
                                   .Select(p => p.ToProductListDTO())
                                   .ToListAsync();

            return Ok(products);
        }



    }
}
