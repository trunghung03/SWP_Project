using DIAN_.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
namespace DIAN_.Services
{
    public class NotificationsHub : Hub<INotificationClient>
    {
        private static ConcurrentDictionary<int, string> customerConnectionMap = new ConcurrentDictionary<int, string>();
        //public override async Task OnConnectedAsync()
        //{
        //    var userid = Context.User.Claims.FirstOrDefault(c => c.Type == "CustomerId").Value;
        //    await Clients.Client(Context.ConnectionId)
        //        .ReceiveNotification($"Thank you for joining us! {Context.User?.Identity?.Name}");
        //    await base.OnConnectedAsync();
        //}
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            int customerId = int.Parse(httpContext.Request.Query["customerId"]);

            // Map the customer ID to the current connection ID
            customerConnectionMap.AddOrUpdate(customerId, Context.ConnectionId, (key, oldValue) => Context.ConnectionId);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(System.Exception exception)
        {
            // Find the customer ID that matches the disconnecting connection ID
            var customerId = customerConnectionMap.FirstOrDefault(kvp => kvp.Value == Context.ConnectionId).Key;

            // Remove the mapping
            customerConnectionMap.TryRemove(customerId, out _);

            await base.OnDisconnectedAsync(exception);
        }
        public static string GetConnectionIdForCustomer(int customerId)
        {
            customerConnectionMap.TryGetValue(customerId, out var connectionId);
            return connectionId;
        }
        public async Task NotifyCustomer(int customerId, string message)
        {
            var connectionId = GetConnectionIdForCustomer(customerId);
            if (connectionId != null)
            {
                await Clients.Client(connectionId).ReceiveNotification(message);
            }
        }

    }

}
