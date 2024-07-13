using DIAN_.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

public class NotificationsHub : Hub<INotificationClient>
{
    private readonly IConnectionService _connectionService;
    private ILogger<NotificationsHub> _logger;
    private static ConcurrentDictionary<int, string> customerConnectionMap = new ConcurrentDictionary<int, string>();
    private static ConcurrentDictionary<int, string> staffConnectionMap = new ConcurrentDictionary<int, string>();
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

    public static string GetConnectionIdForDeliveryStaff(int staffId)
    {
        staffConnectionMap.TryGetValue(staffId, out var connectionId);
        return connectionId;
    }

    public override async Task OnConnectedAsync()
    {
        _logger.LogInformation("Connection established");
        var httpContext = Context.GetHttpContext();
        var connectionId = "";
        string recipientRole = httpContext.Request.Query["role"];
        if (recipientRole == "customer")
        {
            int customerId = int.Parse(httpContext.Request.Query["customerId"]);
             connectionId = Context.ConnectionId;
            _connectionService.AddConnection(customerId, connectionId);
            customerConnectionMap.AddOrUpdate(customerId, connectionId, (key, oldValue) => connectionId);
            await _notificationRepository.UpdateDeliveryStatusAsync(customerId, recipientRole, true);
        }
        if (recipientRole == "DeliveryStaff")
        {
            int deliveryStaffId = int.Parse(httpContext.Request.Query["employeeId"]);
            connectionId = Context.ConnectionId;
            _connectionService.AddConnection(deliveryStaffId, connectionId);
            staffConnectionMap.AddOrUpdate(deliveryStaffId, connectionId, (key, oldValue) => connectionId);
            await _notificationRepository.UpdateDeliveryStatusAsync(deliveryStaffId, recipientRole, true);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var httpContext = Context.GetHttpContext();
        string recipientRole = httpContext.Request.Query["role"];
        var connectionId = "";
        if ( recipientRole == "Customer") {             
            int customerId = int.Parse(httpContext.Request.Query["customerId"]);
            connectionId = Context.ConnectionId;
            _logger.LogInformation($"Customer {customerId} disconnected");
            _connectionService.RemoveConnection(customerId, connectionId);
            _logger.LogInformation($"Connection removed from memory");
        }
        if (recipientRole == "DeliveryStaff") {             
            int deliveryStaffId = int.Parse(httpContext.Request.Query["employeeId"]);
            connectionId = Context.ConnectionId;
            _logger.LogInformation($"Delivery staff {deliveryStaffId} disconnected");
            _connectionService.RemoveConnection(deliveryStaffId, connectionId);
            _logger.LogInformation($"Connection removed from memory");
        }
        await base.OnDisconnectedAsync(exception);
    }

}
