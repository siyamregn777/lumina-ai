
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { APP_NAME } from '../constants';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2 mb-12">
            <div className="bg-white p-1.5 rounded-lg">
              <Rocket className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight">{APP_NAME}</span>
          </Link>
          <h1 className="text-5xl font-extrabold font-heading mb-6 leading-tight">Welcome to the future of business intelligence.</h1>
          <p className="text-xl text-indigo-100 max-w-md">Join over 10,000 teams building the next generation of products with Lumina AI.</p>
        </div>
      </div>

      <div className="flex-grow p-8 md:p-24 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-heading">Sign In</h2>
            <p className="text-slate-500">Enter your credentials to access your dashboard.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-sm font-bold text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-12 py-4 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
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
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-slate-500 text-sm">
            Don't have an account? <Link to="/register" className="font-bold text-indigo-600 hover:underline">Create one for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
