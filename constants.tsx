
import React from 'react';
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Cpu, 
  Layers 
} from 'lucide-react';
import { Feature, PricingPlan, SubscriptionPlan, Testimonial } from './types';

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
  },
  {
    title: "Real-time Analytics",
    description: "Track performance metrics with millisecond precision using our distributed ledger technology.",
    icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Global Infrastructure",
    description: "Deployed across 40+ regions worldwide for ultra-low latency and 99.99% uptime.",
    icon: <Globe className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Enterprise Security",
    description: "End-to-end encryption with SOC2 compliance and automated threat detection.",
    icon: <Shield className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Smart Automations",
    description: "Trigger workflows based on business events with no-code logic builders.",
    icon: <Zap className="w-6 h-6 text-indigo-600" />,
  },
  {
    title: "Seamless Integrations",
    description: "Connect with Slack, Salesforce, and 2000+ other apps via our robust API.",
    icon: <Layers className="w-6 h-6 text-indigo-600" />,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: SubscriptionPlan.FREE,
    name: "Starter",
    price: 0,
    interval: 'month',
    features: ["5 Reports per month", "Community support", "Basic analytics", "1 User"],
    cta: "Get Started Free",
  },
  {
    id: SubscriptionPlan.MONTHLY,
    name: "Pro Monthly",
    price: 49,
    interval: 'month',
    features: ["Unlimited Reports", "Priority email support", "Advanced AI models", "5 Users", "API Access"],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    id: SubscriptionPlan.YEARLY,
    name: "Pro Yearly",
    price: 399,
    interval: 'year',
    features: ["All Pro features", "Dedicated account manager", "Custom integrations", "Unlimited users", "SLA support"],
    cta: "Choose Yearly",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Sarah Chen",
    role: "CTO",
    company: "NextGen Media",
    content: "Lumina AI has completely transformed how we handle data. Our decision-making speed has increased by 40%.",
    image: "https://picsum.photos/seed/sarah/100/100",
  },
  {
    id: "2",
    author: "Markus Vögel",
    role: "Product Lead",
    company: "CloudScale",
    content: "The easiest integration process I've ever experienced. We were up and running in less than 2 hours.",
    image: "https://picsum.photos/seed/markus/100/100",
  },
];
