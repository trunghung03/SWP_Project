using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetUndeliveredNotifications(int customerId);
        Task UpdateNotification(Notification notification);
        Task AddNotification(Notification notification);

        Task<Notification> GetConnectionIDByCustomerId(int customerId);

        Task<IEnumerable<Notification>> RemoveNotification(Notification notification);

        Task<IEnumerable<Notification>> UpdateConnectionID(int customerId, string connectionId);

        Task<IEnumerable<Notification>> GetAllNotifications(int customerId);

    }
}
