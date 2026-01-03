
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Rocket, Mail, Lock, User as UserIcon, ArrowRight, Check } from 'lucide-react';
import { User, UserRole, SubscriptionPlan } from '../types';
import { APP_NAME } from '../constants';

interface RegisterPageProps {
  onLogin: (user: User) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get('plan') || SubscriptionPlan.FREE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: UserRole.USER,
        subscription: plan as SubscriptionPlan,
      };
      onLogin(mockUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Right form section */}
      <div className="flex-grow p-8 md:p-24 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8 md:hidden">
              <div className="bg-indigo-600 p-1 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading">{APP_NAME}</span>
            </Link>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-heading">Create your account</h2>
            <p className="text-slate-500">Starting your journey with the {plan} plan.</p>
          </div>

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

            <div className="flex items-center space-x-2 py-2">
              <input type="checkbox" required className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
              <label className="text-sm text-slate-500">
                I agree to the <a href="#" className="text-indigo-600 font-bold hover:underline">Terms</a> and <a href="#" className="text-indigo-600 font-bold hover:underline">Privacy Policy</a>
              </label>
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

      {/* Left info section */}
      <div className="hidden lg:flex w-[450px] bg-slate-50 border-l border-slate-200 p-12 flex-col justify-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 font-heading">What happens next?</h3>
        <div className="space-y-8">
          {[
            { title: "Dashboard Access", desc: "Get instant access to your personalized AI insights playground." },
            { title: "Data Integration", desc: "Our team will help you connect your first data pool via a 15-min call." },
            { title: "Team Invitation", desc: "Invite up to 5 collaborators to your workspace immediately." }
          ].map((item, idx) => (
            <div key={idx} className="flex space-x-4">
              <div className="bg-indigo-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 bg-white border border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-600 italic mb-4 leading-relaxed">
            "The onboarding process was seamless. I had my first AI-powered report ready in under 10 minutes."
          </p>
          <div className="flex items-center space-x-3">
            <img src="https://picsum.photos/seed/ceo/40/40" className="w-8 h-8 rounded-full" />
            <span className="text-xs font-bold text-slate-900">David Miller, CEO at TechFlow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
