// pages/CheckoutSuccess.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Verify the session with your backend
    const verifySession = async () => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      if (sessionId) {
        // Verify payment with your backend
        await fetch(`${import.meta.env.VITE_API_URL}/api/verify-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
      }
    };

    verifySession();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your subscription has been activated. You'll receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;