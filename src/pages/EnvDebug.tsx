// src/pages/EnvDebug.tsx
import React, { useState, useEffect } from 'react';

const EnvDebug: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    // Get all env vars
    const vars: any = {};
    Object.keys(import.meta.env).forEach(key => {
      if (key.startsWith('VITE_')) {
        vars[key] = import.meta.env[key];
      }
    });
    setEnvVars(vars);

    // Test backend connection
    const testBackend = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/health`);
        if (response.ok) {
          const data = await response.json();
          setBackendStatus(`✅ Connected: ${data.environment}`);
        } else {
          setBackendStatus('❌ Failed to connect');
        }
      } catch (error) {
        setBackendStatus(`❌ Error: ${error.message}`);
      }
    };

    testBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Environment Debug</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Frontend Environment</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Current URL:</span>
                <span className="font-mono text-sm">{window.location.href}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Build Mode:</span>
                <span className="font-mono text-sm">{import.meta.env.MODE}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Backend Status:</span>
                <span className={backendStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                  {backendStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            <div className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium">{key}:</span>
                  <span className="font-mono text-sm truncate max-w-xs">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-x-4">
            <button
              onClick={async () => {
                const apiUrl = import.meta.env.VITE_API_URL;
                try {
                  const response = await fetch(`${apiUrl}/api/health`);
                  const data = await response.json();
                  alert(JSON.stringify(data, null, 2));
                } catch (error) {
                  alert(`Error: ${error.message}`);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Test Backend Connection
            </button>
            
            <button
              onClick={() => {
                console.log('Environment:', import.meta.env);
                console.log('All VITE_ vars:');
                Object.keys(import.meta.env).forEach(key => {
                  if (key.startsWith('VITE_')) {
                    console.log(`${key}:`, import.meta.env[key]);
                  }
                });
                alert('Check browser console for details');
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Log Environment to Console
            </button>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Troubleshooting</h3>
          <ul className="list-disc pl-5 text-yellow-700 space-y-1">
            <li>If VITE_API_URL is not set, the frontend will use localhost</li>
            <li>After adding env vars in Vercel, you must redeploy</li>
            <li>Check that your backend URL is correct: https://lumina-ai-y4hx.onrender.com</li>
            <li>Make sure CORS is properly configured in backend</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EnvDebug;