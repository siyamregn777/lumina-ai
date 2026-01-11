import React from 'react';
import { TrendingUp } from 'lucide-react';

const RevenueMetrics = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 text-lg">Revenue Metrics</h3>
        <select className="text-sm border border-slate-200 rounded-lg px-3 py-1">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last quarter</option>
        </select>
      </div>
      <div className="h-64 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
          <p className="text-slate-500">Revenue chart will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueMetrics;