import React from 'react';
import { FEATURES } from '../../constants';
import { CheckCircle2, Cpu, Globe, Shield, Zap, Layers, BarChart3 } from 'lucide-react';

const FeaturesPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="pt-24 pb-16 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 font-heading">Powerful Capabilities</h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">Explore the deep technical stack and intelligent features that make Lumina AI the market leader.</p>
        </div>
      </section>

      {/* Feature Showcase */}
      {FEATURES.map((feature, i) => (
        <section key={i} className={`py-24 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className={`${i % 2 !== 0 ? 'md:order-last' : ''}`}>
              <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-100">
                {/* Fix: Explicitly cast feature.icon to React.ReactElement<any> to allow overriding the className property via cloneElement */}
                {React.cloneElement(feature.icon as React.ReactElement<any>, { className: 'w-8 h-8 text-white' })}
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 font-heading">{feature.title}</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {feature.description} Lumina AI utilizes cutting-edge neural networks to process information at scale, ensuring your business stays ahead of the competition with predictive modeling and real-time alerts.
              </p>
              <ul className="space-y-4">
                {['Enterprise-grade security', '99.9% availability SLA', 'Custom API webhooks'].map(item => (
                  <li key={item} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/5 rounded-3xl blur-3xl transform -rotate-3" />
              <img 
                src={`https://picsum.photos/seed/feature${i}/800/600`} 
                alt={feature.title} 
                className="relative z-10 rounded-3xl border border-slate-200 shadow-2xl"
              />
            </div>
          </div>
        </section>
      ))}

      {/* Integrations */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 font-heading">Works with your tools</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Lumina AI integrates natively with the tools you already use every day.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
          {['Slack', 'Discord', 'Github', 'Trello', 'Asana', 'Zapier', 'Notion', 'Salesforce'].map(tool => (
            <div key={tool} className="bg-white/10 px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default text-lg font-bold">
              {tool}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;