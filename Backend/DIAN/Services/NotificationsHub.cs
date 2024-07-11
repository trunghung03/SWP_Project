using DIAN_.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

public class NotificationsHub : Hub<INotificationClient>
{
    private readonly IConnectionService _connectionService;
    private ILogger<NotificationsHub> _logger;
    private static ConcurrentDictionary<int, string> customerConnectionMap = new ConcurrentDictionary<int, string>();
    private readonly INotificationRepository _notificationRepository;

    public NotificationsHub(INotificationRepository notificationRepository, IConnectionService connection,
        ILogger<NotificationsHub> logger)
    {
        _notificationRepository = notificationRepository;
        _connectionService = connection;
        _logger = logger;
    }

    public static string GetConnectionIdForCustomer(int customerId)
    {
        customerConnectionMap.TryGetValue(customerId, out var connectionId);
        return connectionId;
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation("Connection established");
        var httpContext = Context.GetHttpContext();
        int customerId = int.Parse(httpContext.Request.Query["customerId"]);
        _logger.LogInformation($"Customer {customerId} connected");
        var connectionId = Context.ConnectionId;
        _logger.LogInformation($"Connection ID: {connectionId}");

        // Check if the customer is already connected
        var existingConnectionId = GetConnectionIdForCustomer(customerId);
        if (!string.IsNullOrEmpty(existingConnectionId))
        {
            _logger.LogInformation($"Customer {customerId} already connected with Connection ID: {existingConnectionId}");
        }

        _connectionService.AddConnection(customerId, connectionId);
        customerConnectionMap.AddOrUpdate(customerId, connectionId, (key, oldValue) => connectionId);

        await _notificationRepository.UpdateDeliveryStatusAsync(customerId, true);

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var httpContext = Context.GetHttpContext();
        int customerId = int.Parse(httpContext.Request.Query["customerId"]);
        var connectionId = Context.ConnectionId;
        _logger.LogInformation($"Customer {customerId} disconnected");
        _connectionService.RemoveConnection(customerId, connectionId);
        _logger.LogInformation($"Connection removed from memory");
        await base.OnDisconnectedAsync(exception);
    }

}
