import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Receipt, 
  Settings, 
  Shield, 
  Bell, 
  CheckCircle, 
  Download,
  ExternalLink,
  User,
  Building,
  Calendar,
  Clock,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const SubscriptionAccount = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [accountDetails, setAccountDetails] = useState({
    companyName: '',
    timezone: 'UTC',
    language: 'English',
    currency: 'USD'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    billing: true,
    reports: false,
    insights: true,
    security: true,
    marketing: false
  });

  useEffect(() => {
    // Fetch user's invoices from Stripe (you'll need to implement this)
    fetchInvoices();
    // Load account details
    loadAccountDetails();
  }, []);

  const fetchInvoices = async () => {
    // Simulate fetching invoices - replace with actual Stripe API call
    setInvoices([
      { id: 'INV-2024-002', date: '2024-02-15', amount: '$9.00', status: 'Paid', plan: 'Professional' },
      { id: 'INV-2024-001', date: '2024-01-15', amount: '$9.00', status: 'Paid', plan: 'Professional' },
      { id: 'INV-2023-012', date: '2023-12-15', amount: '$9.00', status: 'Paid', plan: 'Professional' },
    ]);
  };

  const loadAccountDetails = async () => {
    // Load saved account details
    const { data } = await supabase
      .from('profiles')
      .select('company_name, timezone, language, currency')
      .eq('id', user.id)
      .single();
    
    if (data) {
      setAccountDetails({
        companyName: data.company_name || '',
        timezone: data.timezone || 'UTC',
        language: data.language || 'English',
        currency: data.currency || 'USD'
      });
    }
  };

  const saveAccountDetails = async () => {
    setLoading(true);
    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        company_name: accountDetails.companyName,
        timezone: accountDetails.timezone,
        language: accountDetails.language,
        currency: accountDetails.currency,
        updated_at: new Date().toISOString()
      });
    setLoading(false);
  };

  const getPlanDetails = (plan) => {
    const plans = {
      free: {
        name: 'Starter',
        price: '$0',
        period: 'month',
        features: ['500 AI queries/month', 'Basic analytics', 'Community support'],
        color: 'bg-green-100 text-green-800',
        nextBilling: 'Never (Free Forever)'
      },
      starter: {
        name: 'Starter',
        price: '$0',
        period: 'month',
        features: ['500 AI queries/month', 'Basic analytics', 'Community support'],
        color: 'bg-green-100 text-green-800',
        nextBilling: 'Never (Free Forever)'
      },
      pro: {
        name: 'Professional',
        price: '$9',
        period: 'month',
        features: ['10,000 AI queries/month', 'Advanced analytics', 'Priority support'],
        color: 'bg-purple-100 text-purple-800',
        nextBilling: 'Mar 15, 2024'
      },
      enterprise: {
        name: 'Enterprise',
        price: '$99',
        period: 'month',
        features: ['Unlimited queries', 'Enterprise analytics', '24/7 support'],
        color: 'bg-amber-100 text-amber-800',
        nextBilling: 'Custom billing'
      }
    };
    return plans[plan] || plans.free;
  };

  const planDetails = getPlanDetails(user.subscription);

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const handleManageSubscription = () => {
    // Redirect to Stripe customer portal
    window.open('https://billing.stripe.com/p/login/test_123', '_blank');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Subscription & Account</h2>
        <p className="text-slate-500">Manage your plan, view invoices, and update account settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Subscription & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Plan Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Current Subscription</h3>
                  <p className="text-slate-500">Active plan and billing information</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${planDetails.color}`}>
                {planDetails.name}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-bold uppercase mb-2">Plan Price</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-slate-900">{planDetails.price}</span>
                  <span className="text-slate-500 ml-1">/{planDetails.period}</span>
                </div>
                {user.subscription !== 'free' && user.subscription !== 'starter' && (
                  <p className="text-sm text-slate-500 mt-1">Billed monthly</p>
                )}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 font-bold uppercase mb-2">Next Billing Date</p>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-lg font-bold text-slate-900">{planDetails.nextBilling}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900">Plan Features:</h4>
              <div className="grid grid-cols-2 gap-3">
                {planDetails.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              {user.subscription === 'free' || user.subscription === 'starter' ? (
                <button
                  onClick={handleUpgrade}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Upgrade Plan</span>
                </button>
              ) : (
                <button
                  onClick={handleManageSubscription}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Manage Subscription</span>
                </button>
              )}
              <Link
                to="/pricing"
                className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View All Plans</span>
              </Link>
            </div>
          </div>

          {/* Payment History */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Receipt className="w-6 h-6 text-slate-400" />
                <h3 className="text-lg font-bold text-slate-900">Payment History</h3>
              </div>
              <button 
                onClick={fetchInvoices}
                className="text-sm text-indigo-600 font-bold hover:underline flex items-center space-x-1"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Invoice</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Plan</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{invoice.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-900">{invoice.date}</td>
                        <td className="px-6 py-4 text-sm text-slate-900">{invoice.plan}</td>
                        <td className="px-6 py-4 text-sm text-slate-900">{invoice.amount}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-indigo-600 font-bold hover:underline flex items-center space-x-1">
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {invoices.length === 0 && (
                <div className="text-center py-12">
                  <Receipt className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No payment history yet</p>
                </div>
              )}
            </div>

            {user.subscription !== 'free' && user.subscription !== 'starter' && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Need to update payment method?</h4>
                    <p className="text-slate-600 text-sm mb-4">
                      Manage your subscription, update payment details, and view billing history in the Stripe customer portal.
                    </p>
                    <button
                      onClick={handleManageSubscription}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700"
                    >
                      Go to Stripe Portal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Account Settings */}
        <div className="space-y-8">
          {/* Account Settings */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900">Account Settings</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-900">{user.email}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1">Contact support to change email</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={accountDetails.companyName}
                  onChange={(e) => setAccountDetails({...accountDetails, companyName: e.target.value})}
                  placeholder="Your company name"
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Timezone</label>
                  <select
                    value={accountDetails.timezone}
                    onChange={(e) => setAccountDetails({...accountDetails, timezone: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="CET">CET</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Language</label>
                  <select
                    value={accountDetails.language}
                    onChange={(e) => setAccountDetails({...accountDetails, language: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>

              <button
                onClick={saveAccountDetails}
                disabled={loading}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-700 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-slate-500">
                      {key === 'email' && 'Receive email notifications'}
                      {key === 'billing' && 'Billing and invoice alerts'}
                      {key === 'reports' && 'Weekly report summaries'}
                      {key === 'insights' && 'AI insights and alerts'}
                      {key === 'security' && 'Security and login alerts'}
                      {key === 'marketing' && 'Product updates and offers'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setNotifications(prev => ({...prev, [key]: !prev[key]}))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-slate-400" />
              <h3 className="text-lg font-bold text-slate-900">Security</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between">
                <span>Change Password</span>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </button>
              
              <button className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">Enabled</span>
              </button>
              
              <button className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-red-600 flex items-center justify-between">
                <span>Delete Account</span>
                <ExternalLink className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAccount;