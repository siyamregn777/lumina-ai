
import React from 'react';
import { 
  ShieldAlert, 
  Users, 
  CreditCard, 
  Settings, 
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center space-x-2 text-red-500 mb-2">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">Administrator Context</span>
            </div>
            <h1 className="text-4xl font-extrabold font-heading">System Overview</h1>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Total MRR', value: '$242,500', icon: TrendingUp, color: 'text-green-400' },
            { label: 'Active Subscriptions', value: '1,284', icon: CreditCard, color: 'text-indigo-400' },
            { label: 'Avg. Churn Rate', value: '1.2%', icon: Users, color: 'text-red-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-4xl font-black font-heading tracking-tight">{stat.value}</p>
              <div className="mt-4 flex items-center text-xs font-bold text-green-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last month
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/10">
            <h3 className="text-xl font-bold font-heading">Recent Registrations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-4">User</th>
                  <th className="px-8 py-4">Plan</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Date Joined</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: 'Alex Thompson', email: 'alex@startup.io', plan: 'Pro Monthly', status: 'Active', date: '20 mins ago' },
                  { name: 'Elena Gilbert', email: 'elena@v-corp.com', plan: 'Free', status: 'Active', date: '1 hour ago' },
                  { name: 'Sarah Miller', email: 'sarah@design-co.uk', plan: 'Pro Yearly', status: 'Active', date: '5 hours ago' },
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5">
                      <div className="font-bold">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium">{user.plan}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-black uppercase rounded">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm text-slate-400">{user.date}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
