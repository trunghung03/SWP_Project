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

        public async Task<IEnumerable<Notification>> GetAllNotifications(int customerId)
        {
            return await _context.Notifications
                .Where(n => n.CustomerId == customerId)
                .ToListAsync();
        }

        public async Task<Notification> GetConnectionIDByCustomerId(int customerId)
        {
            return await _context.Notifications.Where(c => customerId == c.CustomerId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Notification>> GetUndeliveredNotifications(int customerId)
        {
            return await _context.Notifications
                .Where(n => n.CustomerId == customerId && !n.IsDelivered)
                .ToListAsync();
        }

        public Task<IEnumerable<Notification>> RemoveNotification(Notification notification)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Notification>> UpdateConnectionID(int customerId, string connectionId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.CustomerId == customerId)
                .ToListAsync();

            foreach (var notification in notifications)
            {
                notification.ConnectionId = connectionId;
            }

            await _context.SaveChangesAsync();
            return notifications;
        }

        public async Task UpdateNotification(Notification notification)
        {
            _context.Notifications.Update(notification);
            await _context.SaveChangesAsync();
        }

    }

}
