using System.Collections.Concurrent;

namespace DIAN_.Helper
{
    public class ConnectionMapping<T> where T : notnull
    {
        private readonly ConcurrentDictionary<T, ConcurrentBag<string>> _connections =
            new ConcurrentDictionary<T, ConcurrentBag<string>>();

        public int Count => _connections.Count;

        public ConcurrentDictionary<T, ConcurrentBag<string>> GetConnections()
        {
           return _connections;
        }
        public void Add(T key, string connectionId)
        {
            _connections.AddOrUpdate(key,
                _ => new ConcurrentBag<string> { connectionId},
                (_, connections) =>
                {
                    connections.Add(connectionId);
                    return connections;
                });
        }
        public IEnumerable<string> GetConnections(T key)
        {
            return _connections.TryGetValue(key, out var connections) ? connections : Enumerable.Empty<string>();
        }
        public void Remove(T key, string connectionId)
        {
            if (!_connections.TryGetValue(key, out var connections)) return;
            var newConnections = new ConcurrentBag<string>(connections.Where(cid => cid != connectionId));
            if (newConnections.IsEmpty)
            {
                _connections.TryRemove(key, out _);
                return;
            }
            else
            {
                _connections[key] = newConnections;
            }
        }
    }
}
