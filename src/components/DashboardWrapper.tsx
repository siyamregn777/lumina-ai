import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import DashboardOverview from './dashboard/DashboardOverview';
import { supabase } from '../lib/supabase';

const DashboardWrapper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const checkSession = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (sessionId) {
        // Verify Stripe payment
        await verifyStripePayment(sessionId);
        
        // Remove the session_id from URL without refreshing
        window.history.replaceState({}, '', '/dashboard');
      }
      
      // Get user data
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkSession();
  }, [searchParams]);

  const verifyStripePayment = async (sessionId: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/api/verify-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update user subscription in Supabase
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'active',
              subscription_plan: data.planId || 'pro',
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);
        }
        
        setMessage('🎉 Payment successful! Your subscription has been activated.');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setMessage('⚠️ Unable to verify payment. Please check your account status.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">{message}</p>
        </div>
      )}
      <DashboardOverview user={user} />
    </>
  );
};

export default DashboardWrapper;