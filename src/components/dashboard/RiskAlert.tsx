import React from 'react';
import { AlertTriangle } from 'lucide-react';

const RiskAlert = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-red-50 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-50 text-red-600">
          High Risk
        </span>
      </div>
      <h4 className="text-sm font-medium text-slate-500 mb-1">Risk Alert</h4>
      <p className="text-2xl font-bold text-slate-900">0 Issues</p>
      <p className="text-xs text-slate-400 mt-2">0 require immediate attention</p>
      <button className="w-full mt-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100">
        View Details
      </button>
    </div>
  );
};

export default RiskAlert;