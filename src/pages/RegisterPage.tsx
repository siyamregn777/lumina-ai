
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Rocket, Mail, Lock, User as UserIcon, ArrowRight, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { APP_NAME } from '../../constants';
import { SubscriptionPlan, UserRole } from '../types/types';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedPlan = searchParams.get('plan') || SubscriptionPlan.STARTER;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: UserRole.USER,
            subscription: selectedPlan,
          },
          // This ensures email confirmation is sent
          emailRedirectTo: `${window.location.origin}`,
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (authData.user) {
        console.log('User created:', authData.user.id);
        
        // Check if email needs confirmation
        if (authData.user.identities && authData.user.identities.length === 0) {
          // Email confirmation needed
          setError('Registration successful! Please check your email to verify your account.');
          
          // You can also manually create the user in your table for pending confirmation
          const { error: dbError } = await supabase
            .from('users')
            .insert({
              id: authData.user.id,
              email: email,
              full_name: name,
              role: UserRole.USER,
              subscription: selectedPlan,
              created_at: new Date().toISOString(),
              email_confirmed: false, // Add this column to your table
            });

          if (dbError && !dbError.message.includes('duplicate key')) {
            console.error('DB insert error:', dbError);
          }
          
          // Show success message but don't navigate
          setTimeout(() => {
            navigate('/login?message=check-email');
          }, 3000);
          return;
        }
        
        // Email already confirmed (shouldn't happen with new signups usually)
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-grow p-8 md:p-24 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-heading">Create your account</h2>
            <p className="text-slate-500">Starting your journey with the {selectedPlan} plan.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-3.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account? <Link to="/login" className="font-bold text-indigo-600 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
