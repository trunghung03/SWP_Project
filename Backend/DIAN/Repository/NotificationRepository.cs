using DIAN_.Interfaces;
using DIAN_.Models;
using Microsoft.EntityFrameworkCore;

namespace DIAN_.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly ApplicationDbContext _context;

        public NotificationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddNotification(Notification notification)
        {
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Notification>> GetAllNotifications(int recipientId, string recipientRole)
        {
            return await _context.Notifications
                .Where(n => n.RecipientId == recipientId && n.RecipientRole == recipientRole)
                .ToListAsync();
        }

        public async Task<Notification> GetConnectionIDByRecipientId(int recipientId, string recipientRole)
        {
            return await _context.Notifications
                .Where(n => n.RecipientId == recipientId && n.RecipientRole == recipientRole)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Notification>> GetUndeliveredNotifications(int recipientId, string recipientRole)
        {
            return await _context.Notifications
                .Where(n => n.RecipientId == recipientId && n.RecipientRole == recipientRole && !n.IsDelivered)
                .ToListAsync();
        }

        public async Task<IEnumerable<Notification>> UpdateDeliveryStatusAsync(int recipientId, string recipientRole, bool isDelivered)
        {
            var notifications = _context.Notifications
                .Where(n => n.RecipientId == recipientId && n.RecipientRole == recipientRole && !n.IsDelivered);

            foreach (var notification in notifications)
            {
                notification.IsDelivered = isDelivered;
            }
            await _context.SaveChangesAsync();
            return await notifications.ToListAsync();
        }


        public Task<IEnumerable<Notification>> RemoveNotification(Notification notification)
        {
            throw new NotImplementedException();
        }
    }

}
