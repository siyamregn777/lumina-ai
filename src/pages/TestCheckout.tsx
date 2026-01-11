// pages/TestCheckout.tsx
import React, { useState } from 'react';

const TestCheckout: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testBackend = async () => {
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      console.log('Testing API URL:', apiUrl);
      
      const response = await fetch(`${apiUrl}/api/health`);
      const data = await response.json();
      
      setResult(data);
      console.log('Health check result:', data);
    } catch (err: any) {
      setError(err.message);
      console.error('Test error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Backend Connection Test</h1>
      
      <button
        onClick={testBackend}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Backend Response:</h2>
          <pre className="bg-white p-2 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Environment Variables:</h2>
        <pre className="bg-gray-800 text-white p-4 rounded">
          VITE_API_URL: {import.meta.env.VITE_API_URL}<br/>
          Current Origin: {window.location.origin}<br/>
          Backend Health: http://localhost:3001/api/health
        </pre>
      </div>
    </div>
  );
};

export default TestCheckout;