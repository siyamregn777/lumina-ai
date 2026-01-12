import React from 'react';

const ProductPerformance = () => {
  const products = [
    { name: 'Pro Widget X', revenue: '$0', growth: '+0%', color: 'bg-blue-500' },
    { name: 'Basic Widget', revenue: '$0', growth: '+0%', color: 'bg-green-500' },
    { name: 'Premium Kit', revenue: '$0', growth: '+0%', color: 'bg-purple-500' },
    { name: 'Add-on Pack', revenue: '$0', growth: '+0%', color: 'bg-yellow-500' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h3 className="font-bold text-slate-900 text-lg mb-6">Product Performance</h3>
      <div className="space-y-6">
        {products.map((product, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${product.color}`} />
              <span className="text-sm font-medium text-slate-900">{product.name}</span>
            </div>
            <div className="flex items-center space-x-8">
              <span className="text-sm text-slate-900">{product.revenue}</span>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">
                {product.growth}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPerformance;