using DIAN_.DTOs;
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
        private readonly DIANContext _context;
        private readonly IProductRepository _productRepo;
        public ProductController(DIANContext context, IProductRepository productRepo)
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

            return CreatedAtAction(nameof(GetById), new { id = ProductModel.ProId }, ProductModel.ToProductDTO());
        }
        [HttpPut]
        [Route("{id}")]
        public async  Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateProductRequestDTO updateDTO)
        {
            var ProductModel = await _context.Products.FirstOrDefaultAsync(x => x.ProId == id);
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
            ProductModel.ProCode = updateDTO.ProCode;

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

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var productModel = await _context.Products.FirstOrDefaultAsync(p => p.ProId == id);
            if (productModel == null) 
            {
                return NotFound();
            }
           //Set productModel.Status == 0;
            await _context.SaveChangesAsync();
            return  NoContent();


        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetDetail([FromRoute] int id)
        {
            var product = await _context.Products
                                  .Include(p => p.MainDiamond)
                                  .FirstOrDefaultAsync(p => p.ProId == id);

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
