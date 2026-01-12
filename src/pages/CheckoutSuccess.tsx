import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [message, setMessage] = useState('Verifying your payment...');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string>('');

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        setMessage('No session ID found in URL');
        setErrorDetails('The payment session information is missing.');
        setIsSuccess(false);
        setVerifying(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        console.log('Verifying with API:', `${apiUrl}/api/verify-session`);
        console.log('Session ID:', sessionId);
        
        const response = await fetch(`${apiUrl}/api/verify-session`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ sessionId }),
        });

        console.log('Response status:', response.status);
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response:', text.substring(0, 200));
          throw new Error(`Server returned ${response.status}: ${text.substring(0, 100)}...`);
        }

        const data = await response.json();
        console.log('Verification response:', data);

        if (response.ok && data.success) {
          // Update user subscription
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          
          if (userError) {
            console.error('User error:', userError);
            throw new Error('Unable to fetch user information');
          }
          
          if (user) {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                subscription_status: 'active',
                subscription_plan: data.planId || 'pro',
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id);
              
            if (updateError) {
              console.error('Update error:', updateError);
              // Don't fail the whole process if update fails
              console.warn('Could not update user profile, but payment was successful');
            }
          }

          setMessage('✅ Payment successful! Your subscription is now active.');
          setIsSuccess(true);
          
          // Redirect to dashboard after 5 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 5000);
        } else {
          setMessage(`❌ Payment verification failed`);
          setErrorDetails(data.error || 'Unknown error');
          setIsSuccess(false);
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        setMessage('❌ Error verifying payment');
        setErrorDetails(error.message || 'Unknown error occurred');
        setIsSuccess(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {verifying ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Processing Payment...</h1>
            <p className="text-gray-600 mb-6">{message}</p>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful! 🎉</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              You will be redirected to your dashboard in 5 seconds...
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Go to Dashboard Now
              </button>
              <button
                onClick={() => navigate('/account/billing')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                View Billing Details
              </button>
            </div>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Verification Failed</h1>
            <p className="text-gray-600 mb-4">{message}</p>
            {errorDetails && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-center text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Details:</span>
                </div>
                <p className="text-sm text-red-600">{errorDetails}</p>
              </div>
            )}
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/support')}
                className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
              >
                Contact Support
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;