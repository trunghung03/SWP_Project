namespace DIAN_.Interfaces
{
    public interface INotificationClient
    {
        Task ReceiveNotification(string message);   
    }
}
