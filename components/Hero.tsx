
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8 animate-subtle-float">
            <span className="bg-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
            <span className="text-indigo-600 text-sm font-medium"> AI-generated ideas, refined into real products</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 font-heading">
            Automate your business <br />
            <span className="gradient-text">with Intelligent AI</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Lumina AI connects to your existing data sources and provides instant, 
            enterprise-grade insights using our next-gen predictive engine.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center shadow-lg shadow-indigo-200 group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
              <Play className="mr-2 w-5 h-5 fill-indigo-600 text-indigo-600" />
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>

        {/* Product Preview */}
        <div className="mt-20 relative mx-auto max-w-5xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition-opacity" />

          <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <div className="bg-white border border-slate-200 rounded-md px-4 py-1 text-[10px] text-slate-400 font-medium w-64 text-center">
                app.lumina.ai/dashboard
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <h3 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
                  Your AI Insights
                </h3>
                <p className="text-lg md:text-xl mt-2 drop-shadow-md max-w-lg">
                  See your data smarter, faster, and in real time.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
