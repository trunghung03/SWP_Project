using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetUndeliveredNotifications(int customerId);
        Task UpdateNotification(Notification notification);
        Task AddNotification(Notification notification);

    }
}
