using DIAN_.Models;

namespace DIAN_.Interfaces
{
    public interface INotificationRepository
    {
        Task<IEnumerable<Notification>> GetUndeliveredNotifications(int recipientId, string recipientRole);
        //Task UpdateNotification(Notification notification);
        Task AddNotification(Notification notification);

        Task<Notification> GetConnectionIDByRecipientId(int recipientId, string recipientRole);

        Task<IEnumerable<Notification>> RemoveNotification(Notification notification);

        Task<IEnumerable<Notification>> GetAllNotifications(int recipientId, string recipientRole);

        Task<IEnumerable<Notification>> UpdateDeliveryStatusAsync(int recipientId, string recipientRole, bool isDelivered);

    }
}