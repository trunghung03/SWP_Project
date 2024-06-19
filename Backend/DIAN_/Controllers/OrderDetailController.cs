using DIAN_.DTOs.OrderDetailDto;
using DIAN_.Interfaces;
using DIAN_.Mapper;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/orderdetails")]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        public OrderDetailController(IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);
                var details = await _orderDetailRepository.GetAllAsync();
                return Ok(details);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByOrderDetailId(int id)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);
                var detail = await _orderDetailRepository.GetByIdAsync(id);
                if (detail == null) return NotFound();
                return Ok(detail);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpGet("order/{id}")]
        public async Task<IActionResult> GetByOrderId(int id)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var details = await _orderDetailRepository.GetByOrderIdAsync(id);
                if (details == null) return NotFound();
                return Ok(details);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDetailDto orderDetailDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var orderDetail = await _orderDetailRepository.CreateAsync(orderDetailDto.FromCreateToOrderDetail());
                if (orderDetail == null) return NotFound();
                return CreatedAtAction(nameof(GetByOrderDetailId), new { id = orderDetail.OrderDetailId }, orderDetail);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(UpdateOrderDetailDto orderDetailDto, int id)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var orderDetail = await _orderDetailRepository.UpdateAsync(orderDetailDto.FromUpdateToOrderDetail(), id);
                if (orderDetail == null) return NotFound();
                return Ok(orderDetail);
            }catch(Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                var orderDetail = await _orderDetailRepository.DeleteAsync(id);
                if (orderDetail == null) return NotFound();
                return NoContent();
            }catch(Exception)
            {
                throw;
            }
        }
    }
}
