using DIAN_.DTOs;
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
        public ProductController(DIANContext context)
        {
            _context = context;
        }
       
        [HttpGet ("list")]
        public IActionResult GetList()
        {
            var products = _context.Products.ToList().Select(p => p.ToProductListDTO());

            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }


        [HttpPost]
        public IActionResult Create([FromBody] CreateProductRequestDTO product)
        {
            // Check if the MainDiamondId exists
            var mainDiamondExists = _context.Diamonds.Any(d => d.DiamondId == product.MainDiamondId);
            if (!mainDiamondExists)
            {
                return BadRequest("The specified MainDiamondId does not exist.");
            }

            var ProductModel = product.ToProductFromCreateDTO();
            _context.Products.Add(ProductModel);
            try
            {
                _context.SaveChanges();
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
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateProductRequestDTO updateDTO)
        {
            var ProductModel = _context.Products.FirstOrDefault(x => x.ProId == id);
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

            _context.SaveChanges();
            return Ok(ProductModel.ToProductDTO());
        }
        [HttpGet ("all")]
        public IActionResult GetAll()
        {
            var products = _context.Products
                                   .Include(p => p.MainDiamond) // Optional if you want to include related Diamond entity
                                   .Select(p => p.ToProductDTO())
                                   .ToList();

            return Ok(products);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var productModel = _context.Products.FirstOrDefault(p => p.ProId == id);
            if (productModel == null) 
            {
                return NotFound();
            }
           //Set productModel.Status == 0;
            _context.SaveChanges();
            return  NoContent();


        }
        [HttpGet("detail/{id}")]
        public IActionResult GetDetail([FromRoute] int id)
        {
            var product = _context.Products
                                  .Include(p => p.MainDiamond)
                                  .FirstOrDefault(p => p.ProId == id);

            if (product == null)
            {
                return NotFound();
            }

            var mainDiamond = product.MainDiamond;

            // Retrieve all diamond colors from the database
            var subDiamondColors = _context.Diamonds.Select(d => d.Color).ToList();

            var productDetailDTO = product.ToProductDetailDTO(mainDiamond, subDiamondColors);

            return Ok(productDetailDTO);
        }




    }
}
