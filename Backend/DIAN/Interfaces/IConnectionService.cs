using System.Collections.Concurrent;

namespace DIAN_.Interfaces
{
    public interface IConnectionService
    {
        List<string> GetConnectionId(int customerId);
        void AddConnection(int customerId, string connectionId);

        void RemoveConnection(int customerId, string connectionId);

        ConcurrentDictionary<int, ConcurrentBag<string>> GetConnections();

        Task SaveConnectionToDatabase(int customerId, string connectionId);
    }
}
