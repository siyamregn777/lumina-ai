import React, { useState } from 'react';
import { CreditCard, Receipt, Settings, Shield, Bell } from 'lucide-react';

const BillingSettings = ({ user }) => {
  const [subscriptionPlan, setSubscriptionPlan] = useState(user.subscription);
  const [notifications, setNotifications] = useState({
    email: true,
    billing: true,
    reports: false,
    insights: true
  });

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['Up to 10,000 data points', 'Basic AI insights', 'Weekly reports', 'Email support'],
      current: subscriptionPlan === 'Starter'
    },
    {
      name: 'Pro',
      price: '$79',
      period: '/month',
      features: ['Unlimited data points', 'Advanced AI insights', 'Daily reports', 'Priority support', 'Custom dashboards'],
      current: subscriptionPlan === 'Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: ['Custom AI models', 'Dedicated support', 'SLA guarantee', 'On-premise deployment', 'Custom integrations'],
      current: subscriptionPlan === 'Enterprise'
    }
  ];

  const paymentHistory = [
    { date: '2024-01-15', amount: '$79.00', status: 'Paid', invoice: 'INV-2024-001' },
    { date: '2023-12-15', amount: '$79.00', status: 'Paid', invoice: 'INV-2023-012' },
    { date: '2023-11-15', amount: '$29.00', status: 'Paid', invoice: 'INV-2023-011' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Billing & Settings</h2>
        <p className="text-slate-500">Manage your subscription, payments, and account settings</p>
      </div>

      {/* Subscription Plans */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <CreditCard className="w-6 h-6 text-slate-400" />
          <h3 className="text-lg font-bold text-slate-900">Subscription Plan</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-2xl p-6 relative ${
                plan.current
                  ? 'border-indigo-500 ring-2 ring-indigo-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-bold text-slate-900 text-xl mb-2">{plan.name}</h4>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-slate-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSubscriptionPlan(plan.name)}
                className={`w-full py-3 rounded-xl font-bold ${
                  plan.current
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-3">
            <Receipt className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900">Payment History</h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Invoice</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paymentHistory.map((payment, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-900">{payment.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{payment.amount}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-600">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900">{payment.invoice}</td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-indigo-600 font-bold hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-6">Payment Method</h3>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Visa ending in 4242</p>
                  <p className="text-sm text-slate-500">Expires 12/2025</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 font-bold hover:underline">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900">Account Settings</h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
            {/* Profile Info */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Profile Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue="Acme Inc."
                    className="w-full border border-slate-200 rounded-lg px-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-5 h-5 text-slate-400" />
                <h4 className="font-bold text-slate-900">Notifications</h4>
              </div>
              <div className="space-y-3">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
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
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-5 h-5 text-slate-400" />
                <h4 className="font-bold text-slate-900">Security</h4>
              </div>
              <button className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700">
                Change Password
              </button>
            </div>

            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;