
using DIAN_.DTOs.ProductDiamondDto;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using DIAN_.Repository;
using Microsoft.AspNetCore.Mvc;
using static iText.StyledXmlParser.Jsoup.Select.Evaluator;

namespace DIAN_.Controllers
{
    [Route("api/productdiamonds")]
    [ApiController]
    public class ProductDiamondController : ControllerBase
    {
        private readonly IProductDiamondRepository _productDiamondRepository;

        public ProductDiamondController(IProductDiamondRepository productDiamondRepository)
        {
            _productDiamondRepository = productDiamondRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetProductDiamond()
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productDiamonds = await _productDiamondRepository.GetAllAsync();
                if (productDiamonds.Count == 0)
                {
                    return NotFound("Product and diamond does not exist");
                }
                var productDiamondDtos = productDiamonds.Select(p => p.ToProductDiamondDto());
                return Ok(productDiamondDtos);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("{productId}")]
        public async Task<IActionResult> GetProductDiamondById([FromRoute] int productId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productDiamond = await _productDiamondRepository.GetByProductIdAsync(productId);
                if (productDiamond == null)
                {
                    return NotFound("Product and diamond do not exist");
                }
                return Ok(productDiamond.ToProductDiamondDto());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateProductDiamond([FromBody] CreateProductDiamondRequestDto createProductDiamondRequestDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productDiamond = createProductDiamondRequestDto.ToProductDiamondFromCreate();
                var result = await _productDiamondRepository.CreateAsync(productDiamond);
                return Ok(result.ToProductDiamondDto());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProductDiamond([FromRoute] int productId, [FromBody] UpdateProductDiamondRequestDto updateProductDiamondRequestDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productDiamond = await _productDiamondRepository.UpdateAsync(productId, updateProductDiamondRequestDto.ToProductDiamondFromUpdate(productId));
                if (productDiamond == null)
                {
                    return NotFound("Promotion does not exist");
                }
                return Ok(productDiamond.ToProductDiamondDto());
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProductDiamond([FromRoute] int productId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var productDiamond = await _productDiamondRepository.DeleteAsync(productId);
                if (productDiamond == null)
                {
                    return NotFound("Product and diamond does not exist"); 
                }
                return Ok(productDiamond.ToProductDiamondDto());
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
