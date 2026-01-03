
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight text-slate-900">{APP_NAME}</span>
            </Link>
            <p className="text-slate-500 max-w-xs mb-8">
              The intelligent infrastructure for modern business analytics. Built for scale, security, and simplicity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/features" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/docs" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Documentation</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">About Us</a></li>
              <li><Link to="/blog" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Blog</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Careers</a></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {APP_NAME} Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              All systems operational
            </div>
            <span className="text-slate-400 text-sm">Made with ❤️ in SF</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
