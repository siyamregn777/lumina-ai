import React from 'react';
import { TrendingUp, AlertTriangle, Lightbulb, BarChart } from 'lucide-react';

const InsightsPage = () => {
  const insights = [
    {
      id: 1,
      type: 'trend',
      title: 'Weekend Sales Surge',
      description: 'Sales increase by 25% on Saturdays compared to weekdays',
      impact: 'High',
      confidence: '95%',
      recommendation: 'Increase marketing spend on Fridays',
      data: [65, 70, 75, 80, 85, 120, 115]
    },
    {
      id: 2,
      type: 'anomaly',
      title: 'Unexpected Churn Spike',
      description: 'Customer churn increased by 40% in the Northeast region',
      impact: 'Critical',
      confidence: '88%',
      recommendation: 'Investigate regional service issues',
      data: [5, 5, 6, 5, 7, 40, 6]
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Underperforming Product',
      description: 'Product C shows 60% lower sales than similar products',
      impact: 'Medium',
      confidence: '92%',
      recommendation: 'Consider product optimization or promotion',
      data: [120, 115, 110, 105, 100, 95, 90]
    }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'anomaly': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'opportunity': return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      default: return <BarChart className="w-5 h-5 text-blue-600" />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">AI Insights</h2>
        <p className="text-slate-500">Automatically detected trends, anomalies, and opportunities</p>
      </div>

      {/* Insights Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  {getInsightIcon(insight.type)}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                  {insight.impact} Impact
                </span>
              </div>
              <span className="text-sm font-bold text-slate-500">{insight.confidence} confidence</span>
            </div>

            <h3 className="font-bold text-slate-900 text-lg mb-3">{insight.title}</h3>
            <p className="text-slate-600 mb-6">{insight.description}</p>

            {/* Mini Chart */}
            <div className="flex items-end h-16 space-x-1 mb-6">
              {insight.data.map((value, idx) => (
                <div
                  key={idx}
                  className="flex-grow bg-indigo-100 rounded-t"
                  style={{ height: `${(value / 150) * 100}%` }}
                />
              ))}
            </div>

            {/* AI Explanation */}
            <div className="p-4 bg-slate-50 rounded-xl mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">AI Explanation:</span>
              </div>
              <p className="text-sm text-slate-600">
                This pattern was detected using time-series analysis and compares against historical averages and seasonal trends.
              </p>
            </div>

            {/* Recommendation */}
            <div className="border-t border-slate-100 pt-4">
              <p className="text-sm font-bold text-slate-900 mb-2">Recommendation:</p>
              <p className="text-sm text-slate-700">{insight.recommendation}</p>
            </div>

            <button className="w-full mt-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-sm">
              View Detailed Analysis
            </button>
          </div>
        ))}
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-white rounded-xl">
            <Lightbulb className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">AI-Generated Summary</h3>
            <p className="text-slate-600">Executive overview of this month's performance</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-slate-700">
            Overall performance shows <span className="font-bold text-green-600">positive growth trends</span> with a 12.5% increase in revenue month-over-month.
          </p>
          <p className="text-slate-700">
            <span className="font-bold text-red-600">Key areas for attention:</span> Customer churn in the Northeast region requires immediate investigation.
          </p>
          <p className="text-slate-700">
            <span className="font-bold text-yellow-600">Opportunity identified:</span> Weekend sales show significant potential for increased marketing focus.
          </p>
          <p className="text-slate-700">
            <span className="font-bold text-blue-600">Next steps recommended:</span> Focus on regional customer retention strategies and optimize weekend promotions.
          </p>
        </div>

        <div className="flex space-x-4 mt-8">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
            Export Insights
          </button>
          <button className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50">
            Schedule Weekly Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;