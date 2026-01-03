// pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [plan, setPlan] = useState<{ id: string; name: string; price: number; billingCycle: 'monthly' | 'yearly' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect to login if not authenticated
        navigate('/login', { state: { from: location.pathname } });
        return;
      }
      setUser(user);
    };

    // Get plan details from query params
    const params = new URLSearchParams(location.search);
    const planId = params.get('plan');
    const billingCycle = params.get('cycle') as 'monthly' | 'yearly' || 'monthly';

    if (!planId) {
      navigate('/pricing');
      return;
    }

    // Define plan details based on planId
    const plans = {
      starter: { id: 'starter', name: 'Starter', price: 0, isFree: true },
      pro: { 
        id: 'pro', 
        name: 'Professional', 
        monthlyPrice: 9, 
        yearlyPrice: 9 * 12 * 0.75, // 25% discount
        isFree: false 
      },
      enterprise: { 
        id: 'enterprise', 
        name: 'Enterprise', 
        monthlyPrice: 99, 
        yearlyPrice: 99 * 12 * 0.75, // 25% discount
        isFree: false 
      }
    };

    const selectedPlan = plans[planId as keyof typeof plans];
    if (!selectedPlan) {
      navigate('/pricing');
      return;
    }

    setPlan({
      id: selectedPlan.id,
      name: selectedPlan.name,
      price: billingCycle === 'monthly' 
        ? (selectedPlan as any).monthlyPrice 
        : (selectedPlan as any).yearlyPrice,
      billingCycle
    });

    checkUser();
  }, [navigate, location]);

  const handleCheckout = async () => {
    if (!user || !plan) return;

    setLoading(true);
    setError('');

    try {
      // For free plan, just update user subscription in database
      if (plan.id === 'starter' || plan.price === 0) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            subscription_plan: plan.id,
            subscription_status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
        
        navigate('/dashboard', { 
          state: { message: `Successfully subscribed to ${plan.name} plan!` } 
        });
        return;
      }

      // For paid plans, create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          planId: plan.id,
          billingCycle: plan.billingCycle,
          userEmail: user.email,
        }),
      });

      const { sessionId, error: stripeError } = await response.json();
      
      if (stripeError) {
        throw new Error(stripeError);
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');
      
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (redirectError) {
        throw redirectError;
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'An error occurred during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!plan || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  const isFree = plan.id === 'starter' || plan.price === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/pricing"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to pricing
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Your Purchase
              </h1>
              <p className="text-gray-600">
                You're subscribing to the {plan.name} plan
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{plan.name} Plan</p>
                    <p className="text-sm text-gray-600">
                      Billed {plan.billingCycle === 'monthly' ? 'monthly' : 'annually'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ${plan.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      per {plan.billingCycle === 'monthly' ? 'month' : 'year'}
                    </p>
                  </div>
                </div>

                {!isFree && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${plan.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                      <span>Total</span>
                      <span>${plan.price.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{user.email}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Your subscription will be associated with this account
                </p>
              </div>
            </div>

            {/* Security Features */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">14-Day Money Back Guarantee</span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center ${
                isFree
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
              } ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-3" />
                  {isFree ? 'Activate Free Plan' : `Pay $${plan.price.toFixed(2)}`}
                </>
              )}
            </button>

            {!isFree && (
              <p className="text-center text-gray-500 text-sm mt-4">
                You'll be redirected to Stripe to complete your payment securely
              </p>
            )}

            {/* Terms */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By completing your purchase, you agree to our{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
                . Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;