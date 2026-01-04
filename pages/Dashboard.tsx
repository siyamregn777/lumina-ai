import React from 'react';
import { User } from '../types';
import { 
  BarChart3, 
  Settings, 
  CreditCard, 
  Zap, 
  Database, 
  Users, 
  Bell, 
  Search,
  MessageSquare,
  FileText,
  TrendingUp,
  Upload,
  ChevronRight,
  Home
} from 'lucide-react';
import { Routes, Route, Link, useLocation, Outlet, useNavigate } from 'react-router-dom';

interface DashboardProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard/ai-chat')) return 'ai-chat';
    if (path.includes('/dashboard/data-upload')) return 'data-upload';
    if (path.includes('/dashboard/insights')) return 'insights';
    if (path.includes('/dashboard/reports')) return 'reports';
    if (path.includes('/dashboard/billing')) return 'billing';
    if (path.includes('/dashboard/subscription')) return 'subscription';
    return 'overview';
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-2 text-indigo-600 font-black text-xl mb-12">
            <Zap className="w-8 h-8 fill-indigo-600" />
            <span>ANALYTICA</span>
          </div>
          
          <nav className="space-y-1">
            {[
              { id: 'overview', name: 'Dashboard Overview', icon: BarChart3, path: '/dashboard' },
              { id: 'ai-chat', name: 'AI Chat Panel', icon: MessageSquare, path: '/dashboard/ai-chat' },
              { id: 'data-upload', name: 'Data Upload', icon: Upload, path: '/dashboard/data-upload' },
              { id: 'insights', name: 'Insights', icon: TrendingUp, path: '/dashboard/insights' },
              { id: 'reports', name: 'Reports', icon: FileText, path: '/dashboard/reports' },
              { id: 'subscription', name: 'Subscription & Account', icon: CreditCard, path: '/dashboard/subscription' },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <Users className="w-5 h-5 text-slate-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-4 flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-50"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-grow flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search data, insights, reports..." 
              className="w-full bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2" />
            <button className="flex items-center space-x-2 text-sm font-bold text-slate-700 hover:text-slate-900">
              <span>English</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          </div>
        </header>

        {/* Content Area - Using Outlet for nested routes */}
        <div className="p-8 md:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet /> {/* This renders the nested route components */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;