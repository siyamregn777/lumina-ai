
import React from 'react';
import Hero from '../components/Hero';
import { FEATURES, TESTIMONIALS, PRICING_PLANS } from '../constants';
import { ChevronRight, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      <Hero />
      
      {/* Logos Section */}
      <section className="py-20 bg-gray-200 ml-8 mr-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">Trusted by fast-growing teams</p>
          <div className="flex  flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Stripe', 'Airbnb', 'Netflix', 'Shopify', 'Slack', 'Vercel'].map(logo => (
              <span key={logo} className="text-2xl font-bold text-black hover:text-slate-900 cursor-default">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4" id="features">
        <div className="text-center mb-16">
          <h2 className="text-indigo-600 font-bold tracking-tight mb-2 text-sm uppercase">Features</h2>
          <h3 className="text-4xl font-bold text-slate-900 font-heading">Everything you need to scale</h3>
          <p className="text-slate-500 mt-4 text-lg">Powerful tools built for high-performance teams.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all group">
              <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                <div className="group-hover:text-white transition-colors">{feature.icon}</div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              <Link to="/features" className="mt-6 inline-flex items-center text-indigo-600 font-semibold text-sm hover:underline group">
                Learn more
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 font-heading leading-tight">Setting up in three <br/><span className="text-indigo-400">simple steps</span></h2>
              
              <div className="space-y-10">
                {[
                  { step: "01", title: "Connect your sources", desc: "Integrate your data pools from 200+ native connectors including SQL, S3, and Salesforce." },
                  { step: "02", title: "Train your engine", desc: "Our AI automatically structures your data and builds a custom semantic model for your business." },
                  { step: "03", title: "Get instant answers", desc: "Ask questions in plain English and receive real-time, visualized insights on your custom dashboard." }
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-6">
                    <span className="text-3xl font-black text-indigo-500 opacity-50">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/20 rounded-full blur-[100px]" />
              <img 
                src="https://picsum.photos/seed/tech/800/800" 
                alt="Setup visualization" 
                className="relative z-10 rounded-3xl border border-slate-700 shadow-2xl animate-subtle-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-16 font-heading">Don't just take our word for it</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-slate-50 p-10 rounded-3xl text-left border border-slate-100">
              <div className="flex items-center space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-xl text-slate-700 font-medium mb-8 leading-relaxed italic">"{t.content}"</p>
              <div className="flex items-center space-x-4">
                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-bold text-slate-900">{t.author}</h4>
                  <p className="text-slate-500 text-sm">{t.role} at {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is there a free trial?", a: "Yes! We offer a 14-day free trial of our Pro plan with no credit card required. You can downgrade to the free plan at any time." },
              { q: "How secure is my data?", a: "Security is our top priority. We use AES-256 encryption at rest, SOC2 compliant infrastructure, and regular independent security audits." },
              { q: "Can I cancel anytime?", a: "Absolutely. No long-term contracts. You can cancel your subscription with one click from your billing dashboard." }
            ].map((item, idx) => (
              <details key={idx} className="group bg-white p-6 rounded-2xl border border-slate-200 open:ring-1 open:ring-indigo-500 transition-all duration-300">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center text-lg">
                  {item.q}
                  <span className="transition group-open:rotate-180">
                    <ChevronRight className="w-5 h-5 text-indigo-500" />
                  </span>
                </summary>
                <p className="text-slate-600 mt-4 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-8 font-heading">Ready to unlock your data?</h2>
              <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">Join 10,000+ teams who use Lumina AI to make smarter, faster business decisions every single day.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/register" className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center group">
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  Schedule a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
