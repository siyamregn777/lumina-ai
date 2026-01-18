import React from 'react';
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Cpu, 
  Layers 
} from 'lucide-react';
import { Feature, PricingPlan, SubscriptionPlan, Testimonial } from './src/types/types';

export const APP_NAME = "Lumina AI";

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Docs", path: "/docs" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export const FEATURES: Feature[] = [
  {
    title: "AI Business Intelligence",
    description: "Our proprietary LLM models analyze your data in real-time to provide actionable insights.",
    icon: <Cpu className="w-6 h-6 text-indigo-600" />,
    availableIn: [
      SubscriptionPlan.STARTER,
      SubscriptionPlan.PROFESSIONAL,
      SubscriptionPlan.ENTERPRISE,
    ],
  },
  {
    title: "Real-time Analytics",
    description: "Track performance metrics with millisecond precision using our distributed ledger technology.",
    icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
    availableIn: [
      SubscriptionPlan.STARTER,
      SubscriptionPlan.PROFESSIONAL,
      SubscriptionPlan.ENTERPRISE,
    ],
  },
  {
    title: "Global Infrastructure",
    description: "Deployed across 40+ regions worldwide for ultra-low latency and 99.99% uptime.",
    icon: <Globe className="w-6 h-6 text-indigo-600" />,
    availableIn: [
      SubscriptionPlan.STARTER,
      SubscriptionPlan.PROFESSIONAL,
      SubscriptionPlan.ENTERPRISE,
    ],
  },
  {
    title: "Enterprise Security",
    description: "End-to-end encryption with SOC2 compliance and automated threat detection.",
    icon: <Shield className="w-6 h-6 text-indigo-600" />,
    availableIn: [
      SubscriptionPlan.STARTER,
      SubscriptionPlan.PROFESSIONAL,
      SubscriptionPlan.ENTERPRISE,
    ],
  },
  {
    title: "Smart Automations",
    description: "Trigger workflows based on business events with no-code logic builders.",
    icon: <Zap className="w-6 h-6 text-indigo-600" />,
    availableIn: [
      SubscriptionPlan.STARTER,
      SubscriptionPlan.PROFESSIONAL,
      SubscriptionPlan.ENTERPRISE,
    ],
  },
  {
    title: "Seamless Integrations",
    description: "Connect with Slack, Salesforce, and 2000+ other apps via our robust API.",
    icon: <Layers className="w-6 h-6 text-indigo-600" />,
    availableIn: [
      SubscriptionPlan.STARTER,
      SubscriptionPlan.PROFESSIONAL,
      SubscriptionPlan.ENTERPRISE,
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: SubscriptionPlan.STARTER,
    name: "Starter",
    description: "Perfect for individuals getting started with AI analytics.",
    price: 0,
    yearlyPrice: 0,
    interval: 'month',
    features: [
      "5 Reports per month",
      "Community support",
      "Basic analytics",
      "1 User",
    ],
    limitations: {
      maxQueries: 50,
      maxDocuments: 5,
      storageLimit: 500,
      maxTeamMembers: 1,
      dataRetentionDays: 7,
      supportType: 'community',
      apiAccess: false,
      customModels: false,
      sso: false,
      sla: false,
      onPremise: false,
    },
    cta: "Get Started Free",
    ctaLink: "/signup",
    highlighted: false,
    mostPopular: false,
    isFree: true,
    recommendedFor: "Individuals & students",
    iconName: "zap",
    trialDays: 0,
  },

  {
    id: SubscriptionPlan.PROFESSIONAL,
    name: "Pro Monthly",
    description: "Advanced AI features for growing teams.",
    price: 49,
    yearlyPrice: 399,
    interval: 'month',
    features: [
      "Unlimited Reports",
      "Priority email support",
      "Advanced AI models",
      "5 Users",
      "API Access",
    ],
    limitations: {
      maxQueries: 5000,
      maxDocuments: 500,
      storageLimit: 20000,
      maxTeamMembers: 5,
      dataRetentionDays: 90,
      supportType: 'priority',
      apiAccess: true,
      customModels: true,
      sso: false,
      sla: false,
      onPremise: false,
    },
    cta: "Start Pro Trial",
    ctaLink: "/signup?plan=pro",
    highlighted: true,
    mostPopular: true,
    isFree: false,
    recommendedFor: "Startups & small teams",
    iconName: "cpu",
    trialDays: 14,
    upgradePath: [SubscriptionPlan.ENTERPRISE],
    discount: {
      percentage: 20,
      description: "Save more with annual billing",
      commitmentYears: 1,
      yearlySavings: 189,
    },
  },

  {
    id: SubscriptionPlan.PROFESSIONAL,
    name: "Pro Yearly",
    description: "Best value for teams committed long-term.",
    price: 399,
    yearlyPrice: 399,
    interval: 'year',
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Custom integrations",
      "Unlimited users",
      "SLA support",
    ],
    limitations: {
      maxQueries: 10000,
      maxDocuments: 1000,
      storageLimit: 50000,
      maxTeamMembers: 50,
      dataRetentionDays: 365,
      supportType: 'dedicated',
      apiAccess: true,
      customModels: true,
      sso: true,
      sla: true,
      onPremise: false,
    },
    cta: "Choose Yearly",
    ctaLink: "/signup?plan=pro_yearly",
    highlighted: false,
    mostPopular: false,
    isFree: false,
    recommendedFor: "Scaling businesses",
    iconName: "layers",
    trialDays: 14,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Sarah Chen",
    role: "CTO",
    company: "NextGen Media",
    content:
      "Lumina AI has completely transformed how we handle data. Our decision-making speed has increased by 40%.",
    image: "https://picsum.photos/seed/sarah/100/100",
    rating: 5,
    plan: SubscriptionPlan.PROFESSIONAL,
  },
  {
    id: "2",
    author: "Markus Vögel",
    role: "Product Lead",
    company: "CloudScale",
    content:
      "The easiest integration process I've ever experienced. We were up and running in less than 2 hours.",
    image: "https://picsum.photos/seed/markus/100/100",
    rating: 5,
    plan: SubscriptionPlan.PROFESSIONAL,
  },
];
