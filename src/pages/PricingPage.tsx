// pages/PricingPage.tsx
import React, { useState } from 'react';
import { Check, Zap, Sparkles, Star, TrendingDown, Crown, Gift, Rocket } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  mostPopular?: boolean;
  recommendedFor: string;
  icon: React.ReactNode;
  isFree?: boolean;
  ctaText: string;
  ctaVariant: 'primary' | 'secondary' | 'free';
}

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Base discount for yearly (25%)
  const baseYearlyDiscount = 0.25;
  
  // Recursive discount calculation: Each additional year gets slightly less discount
  const calculateRecursiveDiscount = (years: number): number => {
    if (years <= 1) return baseYearlyDiscount;
    // Diminishing discount: 25% for first year, then 20%, 15%, etc.
    return Math.max(0.10, baseYearlyDiscount - (years - 1) * 0.05);
  };

  // Generate pricing tiers with recursive discounts
  const pricingTiers: PricingTier[] = [
    {
      id: 'STARTER',
      name: 'Starter',
      description: 'Perfect for individuals and small projects getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Up to 500 AI queries/month',
        'Basic analytics dashboard',
        'Community support',
        '1 team member included',
        '500MB storage',
        '7-day data retention',
        'Access to basic AI models',
        'Public API access',
        '10 document uploads/month',
        'Email notifications',
      ],
      recommendedFor: 'Individuals & Hobbyists',
      icon: <Rocket className="w-6 h-6 text-green-500" />,
      isFree: true,
      ctaText: 'Get Started Free',
      ctaVariant: 'free',
    },
    {
      id: 'PROFESSIONAL',
      name: 'Professional',
      description: 'For growing teams and serious projects',
      monthlyPrice: 9,
      yearlyPrice: 9 * 12 * (1 - calculateRecursiveDiscount(2)), // Additional discount for 2nd year
      features: [
        'Up to 10,000 AI queries/month',
        'Advanced analytics & reporting',
        'Priority email & chat support',
        '10 team members included',
        '50GB storage',
        '90-day data retention',
        'Custom dashboards',
        'Full API access',
        'Unlimited document uploads',
        'Webhook integrations',
        'Advanced AI models',
        'Export capabilities (CSV, JSON)',
        'Custom branding options',
        'Scheduled reports',
      ],
      mostPopular: true,
      recommendedFor: 'Startups & Growing Businesses',
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      ctaText: 'Start 14-Day Free Trial',
      ctaVariant: 'primary',
    },
    {
      id: 'ENTERPRISE',
      name: 'Enterprise',
      description: 'For large organizations with mission-critical needs',
      monthlyPrice: 99,
      yearlyPrice: 99 * 12 * (1 - calculateRecursiveDiscount(3)), // Additional discount for 3rd year
      features: [
        'Unlimited AI queries',
        'Enterprise-grade analytics',
        '24/7 phone & dedicated support',
        'Unlimited team members',
        '1TB storage',
        'Unlimited data retention',
        'Custom integrations',
        '99.9% SLA guarantee',
        'On-premise deployment option',
        'Custom AI model training',
        'Single Sign-On (SSO)',
        'Audit logs & compliance reporting',
        'Custom contract terms',
        'Dedicated account manager',
        'Training & onboarding sessions',
        'Quarterly business reviews',
      ],
      recommendedFor: 'Large Organizations & Enterprises',
      icon: <Crown className="w-6 h-6 text-amber-500" />,
      ctaText: 'Contact Sales',
      ctaVariant: 'secondary',
    },
  ];

  // Calculate price based on billing cycle
  const calculatePrice = (tier: PricingTier) => {
    if (tier.isFree) return 0;
    return billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice;
  };

  // Calculate savings percentage (for paid tiers only)
  const calculateSavings = (tier: PricingTier) => {
    if (tier.isFree) return 0;
    const monthlyTotal = tier.monthlyPrice * 12;
    const yearlyTotal = tier.yearlyPrice;
    const savings = ((monthlyTotal - yearlyTotal) / monthlyTotal) * 100;
    return Math.round(savings);
  };

  // Display recursive discount levels
  const discountLevels = [
    { years: 1, discount: calculateRecursiveDiscount(1) * 100 },
    { years: 2, discount: calculateRecursiveDiscount(2) * 100 },
    { years: 3, discount: calculateRecursiveDiscount(3) * 100 },
    { years: 4, discount: calculateRecursiveDiscount(4) * 100, isBestValue: true },
    { years: 5, discount: calculateRecursiveDiscount(5) * 100 },
  ];

  // Handle CTA click with debugging
  // In PricingPage.tsx
const handleCtaClick = (tier: PricingTier) => {
  console.log('CTA Clicked:', {
    tierId: tier.id,
    tierName: tier.name,
    billingCycle,
    isFree: tier.isFree
  });

  if (tier.id === 'STARTER') {
    console.log('Navigating to /register');
    navigate('/register');
  } else if (tier.id === 'PROFESSIONAL') {
    // Pass lowercase 'pro' instead of 'PROFESSIONAL'
    const url = `/checkout?plan=pro&cycle=${billingCycle}`;
    console.log('Navigating to:', url);
    navigate(url);
  } else if (tier.id === 'ENTERPRISE') {
    // Pass lowercase 'enterprise' instead of 'ENTERPRISE'
    const url = `/checkout?plan=enterprise&cycle=${billingCycle}`;
    console.log('Navigating to:', url);
    navigate(url);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 mb-6">
            <Gift className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">Free Starter Plan Available</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Free</span>, Grow <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Powerful</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Begin with our free tier, upgrade as you grow. Save up to 45% with yearly billing and additional long-term discounts.
          </p>
        </div>

        {/* Free Tier Highlight */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-900">Start Absolutely Free</h3>
                <p className="text-gray-700 mt-1">
                  Our Starter plan includes 500 AI queries/month, basic analytics, and community support — no credit card required.
                </p>
              </div>
              <button
                onClick={() => navigate('/register')}
                className="ml-4 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="mt-12 flex justify-center items-center space-x-4">
          <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            <div className="px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
              Save up to 45%
            </div>
          </div>
        </div>

        {/* Recursive Discount Display */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <TrendingDown className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Multi-Year Commitment Discounts</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {discountLevels.map((level) => (
              <div 
                key={level.years} 
                className={`text-center p-4 rounded-xl shadow-sm ${level.isBestValue ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-300' : 'bg-white'}`}
              >
                {level.isBestValue && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      BEST VALUE
                    </span>
                  </div>
                )}
                <div className="text-2xl font-bold text-gray-900">{level.years}</div>
                <div className="text-sm text-gray-600 mt-1">Year{level.years > 1 ? 's' : ''}</div>
                <div className="mt-2 text-lg font-bold text-green-600">
                  {level.discount.toFixed(0)}% OFF
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {level.years === 1 ? 'First year' : `Average per year`}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm mt-4">
            ✨ 4-year commitment offers the best value at 40% average discount per year
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-8">
          {pricingTiers.map((tier) => {
            const price = calculatePrice(tier);
            const savings = calculateSavings(tier);
            const isFree = tier.isFree;
            
            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl border ${
                  tier.mostPopular
                    ? 'border-purple-500 shadow-xl shadow-purple-200'
                    : isFree
                    ? 'border-green-300 shadow-lg shadow-green-100'
                    : 'border-gray-200 shadow-lg'
                } bg-white p-8 flex flex-col h-full`}
              >
                {tier.mostPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {isFree && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      FREE FOREVER
                    </div>
                  </div>
                )}

                {/* Tier Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isFree ? 'bg-green-100' : tier.mostPopular ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      {tier.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                      <p className="text-sm text-gray-600">{tier.recommendedFor}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{tier.description}</p>

                {/* Price Display */}
                <div className="mb-6">
                  {isFree ? (
                    <div>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">$0</span>
                        <span className="text-gray-600 ml-2">forever</span>
                      </div>
                      <div className="mt-2 text-green-600 font-semibold">
                        No credit card required
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">${price.toFixed(billingCycle === 'monthly' ? 0 : 2)}</span>
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      
                      {billingCycle === 'yearly' && savings > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 line-through">
                              ${(tier.monthlyPrice * 12).toFixed(2)}
                            </span>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                              Save {savings}%
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Billed annually • ${(price / 12).toFixed(2)}/month equivalent
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Features List */}
                <div className="flex-grow mb-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className={`w-5 h-5 ${isFree ? 'text-green-500' : 'text-green-500'} mt-0.5 mr-3 flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleCtaClick(tier)}
                    className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all ${
                      tier.ctaVariant === 'free'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                        : tier.ctaVariant === 'primary'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {tier.ctaText}
                  </button>
                  
                  {tier.isFree && (
                    <p className="text-center text-gray-500 text-sm mt-3">
                      No credit card required • Start in seconds
                    </p>
                  )}
                  
                  {tier.id === 'ENTERPRISE' && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        Custom multi-year contracts available with additional volume discounts
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Free vs Paid Comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Why Start with Free?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold">Risk-Free Exploration</h4>
                </div>
                <p className="text-gray-600">
                  Test all core features without any commitment. Get familiar with our platform,
                  integrate with your workflow, and validate the value before upgrading.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <TrendingDown className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold">Gradual Growth Path</h4>
                </div>
                <p className="text-gray-600">
                  Start small, grow as needed. Upgrade seamlessly when you hit limits.
                  Your data and configurations transfer automatically to paid plans.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is the Starter plan really free forever?
              </h3>
              <p className="text-gray-600">
                Yes! Our Starter plan will always be free. You get 500 AI queries per month,
                basic analytics, and community support at no cost, forever. No hidden charges.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens when I exceed the free tier limits?
              </h3>
              <p className="text-gray-600">
                You'll receive notifications when approaching limits. Exceeding queries will pause
                AI functionality until the next month or until you upgrade. You won't be charged
                automatically — we'll guide you through the upgrade process.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do the recursive discounts work for paid plans?
              </h3>
              <p className="text-gray-600">
                Yearly billing gives you 25% off. Commit for 2 years for 22.5% average discount per year,
                3 years for 20% average, and 4 years for 17.5% average. The discount decreases slightly
                each year, offering the best balance of savings and flexibility.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade from Free to Paid anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely! Upgrade anytime from your dashboard. When you upgrade mid-month,
                we'll prorate your first invoice. All your data, settings, and configurations
                will be preserved during the upgrade.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using Lumina AI to drive growth and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Forever
              </button>
              <button
                onClick={() => navigate('/checkout?plan=PROFESSIONAL&cycle=monthly')}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-gray-900 bg-white hover:bg-gray-100"
              >
                Start 14-Day Pro Trial
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              No credit card required • 14-day free trial on paid plans • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;