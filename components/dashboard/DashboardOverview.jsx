import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Package } from 'lucide-react';
import RiskAlert from '../dashboard/RiskAlert';
import RevenueMetrics from '../dashboard/RevenueMetrics';
import ProductPerformance from '../dashboard/ProductPerformance';

const DashboardOverview = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 mt-1">Real-time insights and performance metrics</p>
        </div>
        <div className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">
              +12.5%
            </span>
          </div>
          <h4 className="text-sm font-medium text-slate-500 mb-1">Total Revenue</h4>
          <p className="text-2xl font-bold text-slate-900">$124,580</p>
          <p className="text-xs text-slate-400 mt-2">vs last month: $110,750</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-600">
              +8.2%
            </span>
          </div>
          <h4 className="text-sm font-medium text-slate-500 mb-1">Monthly Growth %</h4>
          <p className="text-2xl font-bold text-slate-900">8.2%</p>
          <p className="text-xs text-slate-400 mt-2">Target: 10%</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-purple-50 text-purple-600">
              Top Seller
            </span>
          </div>
          <h4 className="text-sm font-medium text-slate-500 mb-1">Best Performing Product</h4>
          <p className="text-2xl font-bold text-slate-900">Pro Widget X</p>
          <p className="text-xs text-slate-400 mt-2">Revenue: $42,150</p>
        </div>

        <RiskAlert />
      </div>

      {/* AI Quick Insights */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white rounded-lg">
            <AlertTriangle className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">AI Quick Insights</h3>
        </div>
        <div className="space-y-3">
          <p className="text-slate-700">• Sales increased by 15% on weekends</p>
          <p className="text-slate-700">• Customer acquisition cost decreased by 8% this month</p>
          <p className="text-slate-700">• High churn risk detected for Product B</p>
          <button className="text-sm text-indigo-600 font-bold hover:underline mt-2">
            View detailed insights →
          </button>
        </div>
      </div>

      {/* Product Performance Chart */}
      <ProductPerformance />

      {/* Revenue Metrics Over Time */}
      <RevenueMetrics />
    </div>
  );
};

export default DashboardOverview;