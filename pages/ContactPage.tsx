
import React from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-extrabold text-slate-900 mb-6 font-heading">Get in touch</h1>
            <p className="text-xl text-slate-500 mb-12 max-w-md">
              Have questions about Lumina AI? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-50 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Us</h4>
                  <p className="text-slate-500">support@lumina.ai</p>
                  <p className="text-slate-500">sales@lumina.ai</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-50 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Us</h4>
                  <p className="text-slate-500">+1 (555) 000-0000</p>
                  <p className="text-slate-400 text-sm mt-1">Mon-Fri from 8am to 5pm PST</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-50 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Our Office</h4>
                  <p className="text-slate-500">123 Market St, Suite 400</p>
                  <p className="text-slate-500">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">How can we help?</label>
                <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>General Inquiry</option>
                  <option>Sales & Pricing</option>
                  <option>Technical Support</option>
                  <option>Partnership Request</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center">
                Send Message
                <Send className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
