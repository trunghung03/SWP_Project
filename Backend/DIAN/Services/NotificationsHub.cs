using DIAN_.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

public class NotificationsHub : Hub<INotificationClient>
{
    private static ConcurrentDictionary<int, string> customerConnectionMap = new ConcurrentDictionary<int, string>();
    private readonly INotificationRepository _notificationRepository;

    public NotificationsHub(INotificationRepository notificationRepository)
    {
        _notificationRepository = notificationRepository;
    }

    public override async Task OnConnectedAsync()
    {
       
        var httpContext = Context.GetHttpContext(); 
        int customerId = int.Parse(httpContext.Request.Query["customerId"]);
        
        customerConnectionMap.AddOrUpdate(customerId, Context.ConnectionId, (key, oldValue) => Context.ConnectionId);

        // Check for and send any undelivered notifications
        var undeliveredNotifications = await _notificationRepository.GetUndeliveredNotifications(customerId);
        foreach (var notification in undeliveredNotifications)
        {
            await Clients.Client(Context.ConnectionId).ReceiveNotification(notification.Message);
            notification.IsDelivered = true;
            await _notificationRepository.UpdateNotification(notification);
        }

        await base.OnConnectedAsync();
    }
    public static string GetConnectionIdForCustomer(int customerId)
    {
        customerConnectionMap.TryGetValue(customerId, out var connectionId);
        return connectionId;
    }

    //public override Task OnConnectedAsync()
    //{
    //    var connectionId = Context.ConnectionId;
    //    // Handle connection logic (e.g., storing connectionId)
    //    return base.OnConnectedAsync();
    //}

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var customerId = customerConnectionMap.FirstOrDefault(kvp => kvp.Value == Context.ConnectionId).Key;
        customerConnectionMap.TryRemove(customerId, out _);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task NotifyCustomer(int customerId, string message)
    {
        if (customerConnectionMap.TryGetValue(customerId, out var connectionId))
        {
            await Clients.Client(connectionId).ReceiveNotification(message);
        }
    }
}
