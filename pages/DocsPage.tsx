
import React from 'react';
import { Search, BookOpen, Code, Terminal, Zap, Info } from 'lucide-react';

const DocsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-24 flex flex-col md:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Getting Started</h3>
            <nav className="space-y-1 mb-10">
              <a href="#" className="block px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm">Introduction</a>
              <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Quickstart Guide</a>
              <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Installation</a>
            </nav>

            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">API Reference</h3>
            <nav className="space-y-1">
              <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Authentication</a>
              <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Data Ingestion</a>
              <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Query Engine</a>
              <a href="#" className="block px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition-colors">Webhooks</a>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow pb-32">
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search documentation..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <article className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6 font-heading">Introduction to Lumina AI</h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Welcome to the Lumina AI documentation. Lumina AI is an enterprise-grade business intelligence platform 
              designed to bridge the gap between complex data infrastructure and actionable insights.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors">
                <BookOpen className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Guides</h3>
                <p className="text-slate-500 text-sm">Step-by-step tutorials to get you up and running in minutes.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors">
                <Code className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">API Reference</h3>
                <p className="text-slate-500 text-sm">Comprehensive documentation for our REST and GraphQL APIs.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">Core Concepts</h2>
            <p className="text-slate-600 mb-6">
              Our platform is built around four primary pillars that work together to provide a seamless intelligence layer for your organization.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl mb-8">
              <div className="flex items-center space-x-2 text-indigo-700 font-bold mb-2">
                <Info className="w-5 h-5" />
                <span>Quick Tip</span>
              </div>
              <p className="text-indigo-900 text-sm">
                Most users find the Quickstart Guide the best place to begin. It takes less than 5 minutes to connect your first data source.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center space-x-2 mb-4 border-b border-white/10 pb-4">
                <Terminal className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-400">Installation via NPM</span>
              </div>
              <pre className="text-sm font-mono text-indigo-300">
                <code>npm install @lumina-ai/sdk</code>
              </pre>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default DocsPage;
