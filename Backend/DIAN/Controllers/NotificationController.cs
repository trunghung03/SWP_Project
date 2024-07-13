using DIAN_.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DIAN_.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;
        public NotificationController(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }
        //[HttpGet]
        //public async Task<IActionResult> GetConnectionIDByCustomerID(int customerId)
        //{
        //    var connectionId = await _notificationRepository.GetConnectionIDByCustomerId(customerId);
        //    if (connectionId == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(connectionId);
        //}
        [HttpGet("all")]
        public async Task<IActionResult> GetAllNotifications(int recipientId, string role)
        {
            var notifications = await _notificationRepository.GetAllNotifications(recipientId, role);
            if (notifications == null)
            {
                return NotFound();
            }
            return Ok(notifications);
        }
    }
}