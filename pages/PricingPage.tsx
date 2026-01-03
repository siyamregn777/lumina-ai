
import React from 'react';
import { PRICING_PLANS } from '../constants';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  return (
    <div className="bg-[#fafafa] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 text-center mb-20">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 font-heading">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Choose the plan that fits your business stage. No hidden fees, ever.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative bg-white rounded-3xl p-10 border transition-all duration-300 flex flex-col ${
              plan.highlighted 
                ? 'border-indigo-600 shadow-2xl shadow-indigo-100 scale-105 z-10' 
                : 'border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            {plan.highlighted && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">Most Popular</span>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-5xl font-extrabold text-slate-900">${plan.price}</span>
                <span className="text-slate-500 font-medium">/{plan.interval}</span>
              </div>
            </div>

            <ul className="space-y-5 mb-12 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-3 text-slate-600">
                  <Check className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to={plan.id === 'FREE' ? '/register' : `/register?plan=${plan.id}`}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all text-center ${
                plan.highlighted 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto px-4 mt-20 bg-indigo-50 border border-indigo-100 rounded-3xl p-10 text-center">
        <h4 className="text-2xl font-bold text-slate-900 mb-2">Need an enterprise solution?</h4>
        <p className="text-slate-600 mb-8">We offer custom plans for organizations with 50+ users and specific security requirements.</p>
        <Link to="/contact" className="inline-flex items-center text-indigo-600 font-bold hover:underline">
          Contact our sales team
          <Check className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default PricingPage;
