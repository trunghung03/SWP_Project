using DIAN_.Helper;
using DIAN_.Interfaces;
using DIAN_.Repository;
using System.Collections.Concurrent;

namespace DIAN_.Services
{
    public class ConnectionService : IConnectionService
    {
        private static readonly ConnectionMapping<int> Connections = new ConnectionMapping<int>();

        private readonly INotificationRepository _notificationRepository;
        public ConnectionService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }
        public void AddConnection(int customerId, string connectionId)
        {
           Connections.Add(customerId, connectionId);
        }

        public List<string> GetConnectionId(int customerId)
        {
            return Connections.GetConnections(customerId).ToList();
        }

        public ConcurrentDictionary<int, ConcurrentBag<string>> GetConnections()
        {
            return Connections.GetConnections();
        }

        public void RemoveConnection(int customerId, string connectionId)
        {
            Connections.Remove(customerId, connectionId);
        }
        public async Task SaveConnectionToDatabase(int customerId, string connectionId)
        {
            await _notificationRepository.UpdateConnectionID(customerId, connectionId);
        }
    }
}
