import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sendRequest = async () => {
    setLoading(true);
    try {
        const res = await fetch(`${process.env.API_URL}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, url, body }),
      });
      const result = await res.json();
      setResponse(JSON.stringify(result, null, 2));
      fetchLogs();
    } catch (e) {
      setResponse('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    const res = await fetch(`${process.env._API_URL}history?page=${page}&limit=5`);
    const result = await res.json();
    setLogs(result.logs);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  return (
    <div className="app p-4">      
      <div className="mb-4 flex space-x-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border p-2 rounded"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          className="border p-2 flex-1 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        {(method === 'POST' || method === 'PUT') && (
          <textarea
            className="border p-2 flex-1 rounded"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Request body"
          />
        )}
        <button
          onClick={sendRequest}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <pre className="bg-gray-100 p-4 rounded mb-4 overflow-auto h-40 font-mono text-sm">
        {response}
      </pre>

      <h2 className="text-xl mb-2">Request History</h2>
      <ul className="space-y-2 mb-4 max-h-64 overflow-auto">
        {logs.map((log) => (
          <li key={log.id} className="border p-2 rounded">
            <div><strong>{log.method}</strong> {log.url}</div>
            <pre className="font-mono text-xs truncate">
              {log.response?.slice(0, 200)}
            </pre>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;