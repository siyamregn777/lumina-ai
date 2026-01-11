import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Eye, X, Check } from 'lucide-react';

const DataUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [googleSheetsConnected, setGoogleSheetsConnected] = useState(false);

  const handleFileUpload = (file) => {
    // Simulate file processing
    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    });

    // Simulate data preview
    setPreviewData({
      headers: ['Date', 'Product', 'Revenue', 'Quantity', 'Region'],
      rows: [
        ['2024-01-01', 'Widget A', '$1,200', '12', 'North'],
        ['2024-01-02', 'Widget B', '$850', '8', 'South'],
        ['2024-01-03', 'Widget A', '$1,100', '11', 'East'],
        ['2024-01-04', 'Widget C', '$950', '9', 'West'],
        ['2024-01-05', 'Widget A', '$1,350', '14', 'North']
      ]
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const connectGoogleSheets = () => {
    // Simulate Google Sheets connection
    setGoogleSheetsConnected(true);
    setPreviewData({
      headers: ['Month', 'Revenue', 'Expenses', 'Profit'],
      rows: [
        ['January', '$15,000', '$8,000', '$7,000'],
        ['February', '$16,500', '$8,500', '$8,000'],
        ['March', '$18,200', '$9,000', '$9,200'],
        ['April', '$17,800', '$8,800', '$9,000']
      ]
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Data Upload</h2>
        <p className="text-slate-500">Upload CSV files or connect Google Sheets for analysis</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* CSV Upload */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Upload CSV</h3>
          </div>

          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-700 mb-2">
              <span className="font-bold text-indigo-600">Drop your CSV file here</span> or
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) handleFileUpload(e.target.files[0]);
                }}
              />
              <span className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-bold cursor-pointer">
                Browse Files
              </span>
            </label>
            <p className="text-sm text-slate-400 mt-4">Supports .csv files up to 10MB</p>
          </div>

          {uploadedFile && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-bold text-slate-900">{uploadedFile.name}</p>
                  <p className="text-sm text-slate-500">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Uploaded
                  </p>
                </div>
              </div>
              <Check className="w-5 h-5 text-green-600" />
            </div>
          )}
        </div>

        {/* Google Sheets Integration */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Connect Google Sheets</h3>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-slate-50 rounded-xl">
              <h4 className="font-bold text-slate-900 mb-2">Benefits:</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Automatic data synchronization</li>
                <li>• Real-time updates</li>
                <li>• Multiple sheet support</li>
                <li>• Scheduled imports</li>
              </ul>
            </div>

            <button
              onClick={connectGoogleSheets}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-3 ${
                googleSheetsConnected
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {googleSheetsConnected ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Connected to Google Sheets</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-5 h-5" />
                  <span>Connect Google Account</span>
                </>
              )}
            </button>

            {googleSheetsConnected && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-600">
                  Currently connected to: <span className="font-bold">sales-data-2024@sheets.google.com</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Preview */}
      {previewData && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Eye className="w-6 h-6 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900">Data Preview</h3>
            </div>
            <button className="text-sm text-indigo-600 font-bold hover:underline">
              Process Data →
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {previewData.headers.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {previewData.rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-6 py-4 text-sm text-slate-900">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4">Showing 5 of 1,240 rows • 5 columns</p>
        </div>
      )}
    </div>
  );
};

export default DataUpload;