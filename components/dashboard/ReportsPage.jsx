import React, { useState } from 'react';
import { FileText, Download, Mail, Calendar, Filter, Printer } from 'lucide-react';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportType, setReportType] = useState('weekly');
  const [emailAddress, setEmailAddress] = useState('');

  const reports = [
    {
      id: 1,
      title: 'Weekly Sales Report',
      type: 'weekly',
      generated: '2024-01-15',
      size: '2.4 MB',
      status: 'ready',
      preview: ['Revenue: $45,230', 'Growth: +8.2%', 'Top Product: Widget X']
    },
    {
      id: 2,
      title: 'Monthly Performance',
      type: 'monthly',
      generated: '2024-01-01',
      size: '5.1 MB',
      status: 'ready',
      preview: ['Total Revenue: $189,450', 'Customer Growth: +12%', 'Region: All']
    },
    {
      id: 3,
      title: 'Q4 Financial Analysis',
      type: 'quarterly',
      generated: '2023-12-31',
      size: '8.7 MB',
      status: 'ready',
      preview: ['Profit Margin: 42%', 'YoY Growth: +15.3%', 'Expenses: -2.1%']
    }
  ];

  const generateReport = () => {
    // Simulate report generation
    const newReport = {
      id: Date.now(),
      title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
      type: reportType,
      generated: new Date().toISOString().split('T')[0],
      size: 'Processing...',
      status: 'generating',
      preview: ['Generating report...']
    };

    // Simulate processing delay
    setTimeout(() => {
      alert(`Report generated successfully!${emailAddress ? ` Sent to ${emailAddress}` : ''}`);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
          <p className="text-slate-500">Generate, download, and share performance reports</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700">
          <Printer className="w-4 h-4" />
          <span>Print Report</span>
        </button>
      </div>

      {/* Report Generator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Generate New Report</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Report Type</label>
            <div className="flex space-x-2">
              {['weekly', 'monthly', 'quarterly'].map((type) => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={`px-4 py-3 rounded-lg font-bold text-sm flex-1 ${
                    reportType === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Date Range</label>
            <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-600">
                {reportType === 'weekly' ? 'Last 7 days' : 
                 reportType === 'monthly' ? 'Last 30 days' : 'Last 90 days'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Send to Email</label>
            <input
              type="email"
              placeholder="optional@email.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={generateReport}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center space-x-3"
          >
            <FileText className="w-5 h-5" />
            <span>Generate PDF Report</span>
          </button>
          <button className="px-8 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 flex items-center space-x-3">
            <Filter className="w-5 h-5" />
            <span>Customize Report</span>
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg">Recent Reports</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {reports.map((report) => (
            <div key={report.id} className="px-8 py-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <FileText className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{report.title}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-slate-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Generated: {report.generated}
                      </span>
                      <span className="text-sm text-slate-500">Size: {report.size}</span>
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">
                        {report.status}
                      </span>
                    </div>
                    <div className="flex space-x-4 mt-3">
                      {report.preview.map((item, idx) => (
                        <span key={idx} className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                    title="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-200">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
        <h3 className="font-bold text-slate-900 text-lg mb-6">Report Templates</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Executive Summary', color: 'bg-blue-100' },
            { name: 'Sales Performance', color: 'bg-green-100' },
            { name: 'Customer Analytics', color: 'bg-purple-100' },
            { name: 'Financial Review', color: 'bg-yellow-100' }
          ].map((template, idx) => (
            <div key={idx} className={`${template.color} rounded-2xl p-6 hover:shadow-lg transition-shadow`}>
              <FileText className="w-8 h-8 text-slate-600 mb-4" />
              <h4 className="font-bold text-slate-900 mb-2">{template.name}</h4>
              <p className="text-sm text-slate-600 mb-4">Pre-formatted report template</p>
              <button className="text-sm font-bold text-slate-700 hover:underline">
                Use Template →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;