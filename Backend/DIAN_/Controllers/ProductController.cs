using DIAN_.Models;
using DIAN_.DTOs.ProductDTOs;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DIAN_.Helper;
using DIAN_.DTOs.PromotionDto;
using DIAN_.Repository;

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
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var products = await _productRepo.GetListAsync();

                return Ok(products);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var product = await _productRepo.GetByIdAsync(id);
                if (product == null)
                {
                    return NotFound();
                }
                return Ok(product);
            }catch(Exception)
            {
                throw;
            }
        }

        /* [HttpPost]
         public async Task<IActionResult> Create([FromForm] CreateProductRequestDTO productDTO)
         {
             try
             {
                 var imageLinks = new List<string>();
                 var savePath = @"C:\Users\Admin\Documents\SWP_Project\Backend\DIAN_\Images";

                 if (productDTO.ImageFiles != null && productDTO.ImageFiles.Count > 0)
                 {
                     foreach (var file in productDTO.ImageFiles)
                     {
                         var fileName = Path.GetFileName(file.FileName);
                         var filePath = Path.Combine(savePath, fileName);
                         using (var stream = new FileStream(filePath, FileMode.Create))
                         {
                             await file.CopyToAsync(stream);
                         }
                         // Assuming the URL path structure
                         var fileUrl = $"/images/{fileName}";
                         imageLinks.Add(fileUrl); // Store file URL
                     }
                 }

                 // Join the image links with a semicolon
                 var imageLinkList = string.Join(";", imageLinks);

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

                 var product = productDTO.ToProductFromCreateDTO(imageLinkList);
                 var createdProduct = await _productRepo.CreateAsync(product);

                 return CreatedAtAction(nameof(GetById), new { id = createdProduct.ProductId }, createdProduct);
             }catch(Exception)
             {
                 throw;
             }
         }*/
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProductRequestDTO productDTO)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
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
                return Ok(product);
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

                return Ok(new { data = products, pagination });
            }
            catch (Exception ex)
            {
                // Log the exception here
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);
                await _productRepo.DeleteAsync(id);
                return NoContent();
            }catch(Exception)
            {
                throw;
            }
        }
        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetDetail([FromRoute] int id)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);
                var productDetail = await _productRepo.GetDetailAsync(id);
                if (productDetail == null)
                {
                    return NotFound();
                }
                return Ok(productDetail);
            }catch(Exception)
            {
                throw;
            }
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetByName([FromQuery] string name)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);
                var products = await _productRepo.GetByNameAsync(name);
                return Ok(products);
            }catch(Exception)
            {
                throw;
            }
        }
    }
}
