
import React, { useState } from 'react';
import { User, SubscriptionPlan } from '../types';
import { 
  BarChart3, 
  Settings, 
  CreditCard, 
  Zap, 
  Database, 
  Users, 
  Bell, 
  Search,
  ExternalLink,
  Plus
} from 'lucide-react';

interface DashboardProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Active Workflows', value: '12', change: '+2', icon: Zap },
    { name: 'Data Points Processed', value: '1.2M', change: '+18%', icon: Database },
    { name: 'Team Members', value: '8', change: '0', icon: Users },
    { name: 'Avg. Response Time', value: '24ms', change: '-4ms', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'billing':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-slate-900">Subscription & Billing</h2>
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Current Plan: {user.subscription}</h3>
                  <p className="text-slate-500 text-sm">Next billing cycle: May 12, 2024</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700">
                  Upgrade Plan
                </button>
              </div>
              <div className="border-t border-slate-100 pt-8 grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Payment Method</p>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium">Visa ending in 4242</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Plan Price</p>
                  <span className="text-sm font-medium">$49.00 / month</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Billing Email</p>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'overview':
      default:
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Greeting */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">Welcome back, {user.name.split(' ')[0]} 👋</h2>
                <p className="text-slate-500 mt-1">Here's what's happening with your projects today.</p>
              </div>
              <button className="hidden sm:flex items-center bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <stat.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      stat.change.includes('+') ? 'bg-green-50 text-green-600' : 
                      stat.change === '0' ? 'bg-slate-50 text-slate-400' : 'bg-red-50 text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">{stat.name}</h4>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg">Active Projects</h3>
                  <button className="text-sm text-indigo-600 font-bold hover:underline">View All</button>
                </div>
                <div className="p-0">
                  {[
                    { name: 'Revenue Forecast Q3', status: 'Processing', date: '2 mins ago', color: 'indigo' },
                    { name: 'Customer Churn Analysis', status: 'Completed', date: '45 mins ago', color: 'green' },
                    { name: 'Ad Spend Optimization', status: 'Failed', date: '2 hours ago', color: 'red' },
                  ].map((project, i) => (
                    <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full bg-${project.color}-500`} />
                        <div>
                          <p className="font-bold text-slate-900">{project.name}</p>
                          <p className="text-xs text-slate-500">{project.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`text-[10px] uppercase font-black px-2 py-1 rounded bg-${project.color}-50 text-${project.color}-600`}>
                          {project.status}
                        </span>
                        <button className="text-slate-400 hover:text-slate-900">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-indigo-600 text-white rounded-3xl p-8 shadow-xl shadow-indigo-200 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="bg-white/20 p-3 rounded-2xl w-fit mb-6">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Lumina Pro</h3>
                  <p className="text-indigo-100 mb-8 leading-relaxed">Upgrade to Pro for unlimited data points and priority AI modeling.</p>
                </div>
                <Link to="/pricing" className="bg-white text-indigo-600 text-center py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all relative z-10">
                  Explore Pro
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-2 text-indigo-600 font-black text-xl mb-12">
            <Zap className="w-8 h-8 fill-indigo-600" />
            <span>DASHBOARD</span>
          </div>
          
          <nav className="space-y-1">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'workflows', name: 'Workflows', icon: Zap },
              { id: 'team', name: 'Team members', icon: Users },
              { id: 'billing', name: 'Billing', icon: CreditCard },
              { id: 'settings', name: 'Settings', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
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
              placeholder="Search data, workflows..." 
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

        {/* Content Area */}
        <div className="p-8 md:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock sub-component since we can't export it separately in this file format
const Link = ({ to, children, className }: any) => <a href={`#${to}`} className={className}>{children}</a>;
const ChevronRight = ({ className }: any) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default Dashboard;
