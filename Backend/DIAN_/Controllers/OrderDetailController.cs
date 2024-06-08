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
            var details = await _orderDetailRepository.GetAllAsync();
            return Ok(details);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByOrderDetailId(int id)
        {
            var detail = await _orderDetailRepository.GetByIdAsync(id);
            if (detail == null) return NotFound();
            return Ok(detail);
        }

        [HttpGet("order/{id}")]
        public async Task<IActionResult> GetByOrderId(int id)
        {
            var details = await _orderDetailRepository.GetByOrderIdAsync(id);
            if (details == null) return NotFound();
            return Ok(details);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrderDetailDto orderDetailDto)
        {
            var orderDetail = await _orderDetailRepository.CreateAsync(orderDetailDto.FromCreateToOrderDetail());
            if (orderDetail == null) return NotFound();
            return CreatedAtAction(nameof(GetByOrderDetailId), new { id = orderDetail.OrderDetailId }, orderDetail);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(UpdateOrderDetailDto orderDetailDto, int id)
        {
            var orderDetail = await _orderDetailRepository.UpdateAsync(orderDetailDto.FromUpdateToOrderDetail(), id);
            if (orderDetail == null) return NotFound();
            return Ok(orderDetail);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var orderDetail = await _orderDetailRepository.DeleteAsync(id);
            if (orderDetail == null) return NotFound();
            return NoContent();
        }
    }
}
