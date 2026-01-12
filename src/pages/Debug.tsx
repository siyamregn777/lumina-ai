import React, { useState, useEffect } from 'react';

const DebugPage: React.FC = () => {
  const [env, setEnv] = useState<any>({});
  const [backendStatus, setBackendStatus] = useState('');

  useEffect(() => {
    // Collect environment variables
    const envVars: any = {};
    Object.keys(import.meta.env).forEach(key => {
      if (key.startsWith('VITE_')) {
        envVars[key] = import.meta.env[key];
      }
    });
    setEnv(envVars);

    // Test backend
    fetch(`${import.meta.env.VITE_API_URL || 'https://lumina-ai-y4hx.onrender.com'}/api/health`)
      .then(r => r.json())
      .then(data => {
        setBackendStatus(`✅ Connected to ${data.environment} backend`);
      })
      .catch(err => {
        setBackendStatus(`❌ Error: ${err.message}`);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
        <pre className="bg-white p-4 rounded overflow-auto">
          {JSON.stringify(env, null, 2)}
        </pre>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Backend Status</h2>
        <p className={backendStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}>
          {backendStatus}
        </p>
      </div>

      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Quick Tests</h2>
        <div className="space-x-4">
          <button
            onClick={() => {
              console.log('=== DEBUG LOG ===');
              console.log('API URL:', import.meta.env.VITE_API_URL);
              console.log('All env:', import.meta.env);
              alert('Check browser console (F12)');
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Log to Console
          </button>
          
          <button
            onClick={async () => {
              const response = await fetch('https://lumina-ai-y4hx.onrender.com/api/health');
              const data = await response.json();
              alert(`Backend: ${JSON.stringify(data, null, 2)}`);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Test Backend
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;