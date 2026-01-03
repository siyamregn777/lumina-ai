// types.ts
import { ReactNode } from 'react';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  ENTERPRISE = 'ENTERPRISE'
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
  CUSTOM = 'CUSTOM'
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM'
}

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  TRIAL = 'TRIAL',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  UPGRADING = 'UPGRADING',
  DOWNGRADING = 'DOWNGRADING'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: SubscriptionPlan;
  billingCycle: BillingCycle;
  planStatus: PlanStatus;
  avatar?: string;
  company?: string;
  jobTitle?: string;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  nextBillingDate?: Date;
  trialEndDate?: Date;
  credits: number;
  maxCredits: number;
  usage: UserUsage;
  features: UserFeatures;
}

export interface UserUsage {
  aiQueries: number;
  documentsUploaded: number;
  storageUsed: number;
  apiCalls: number;
  teamMembers: number;
}

export interface UserFeatures {
  hasAdvancedAnalytics: boolean;
  hasPrioritySupport: boolean;
  hasCustomBranding: boolean;
  hasAPIAccess: boolean;
  hasSSO: boolean;
  hasOnPremise: boolean;
  hasCustomModels: boolean;
  hasSLA: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  plan: SubscriptionPlan;
}

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  availableIn: SubscriptionPlan[];
}

export interface PricingPlan {
  id: string;  // Changed from SubscriptionPlan to string to match your pricing page
  name: string;
  description: string;
  price: number;
  yearlyPrice: number;
  interval: 'month' | 'year';
  features: string[];
  limitations: PlanLimitations;
  cta: string;
  ctaLink: string;
  highlighted?: boolean;
  mostPopular?: boolean;
  isFree?: boolean;
  recommendedFor: string;
  iconName: string;
  trialDays: number;
  upgradePath?: string[];
  discount?: PlanDiscount;
}

export interface PlanLimitations {
  maxQueries: number;
  maxDocuments: number;
  storageLimit: number; // in MB
  maxTeamMembers: number;
  dataRetentionDays: number;
  supportType: 'community' | 'email' | 'priority' | 'dedicated';
  apiAccess: boolean;
  customModels: boolean;
  sso: boolean;
  sla: boolean;
  onPremise: boolean;
}

export interface PlanDiscount {
  percentage: number;
  description: string;
  commitmentYears: number;
  yearlySavings: number;
}

export interface RecursiveDiscount {
  years: number;
  discountPercentage: number;
  effectiveMonthlyPrice: number;
  totalSavings: number;
  isBestValue?: boolean;
}

export interface PricingTier {
  id: SubscriptionPlan;
  tierLevel: number;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: TierFeature[];
  limitations: TierLimitations;
  cta: PricingCTA;
  metadata: TierMetadata;
}

export interface TierFeature {
  name: string;
  description: string;
  included: boolean;
  limit?: number;
  unit?: string;
}

export interface TierLimitations {
  maxAIQueries: number;
  maxTeamMembers: number;
  storageLimit: string;
  supportLevel: 'basic' | 'standard' | 'priority' | 'enterprise';
  dataRetention: string;
  apiRateLimit?: number;
  customModels: boolean;
  sso: boolean;
  sla: string;
}

export interface PricingCTA {
  text: string;
  variant: 'free' | 'primary' | 'secondary' | 'outline';
  link: string;
  requiresContact?: boolean;
}

export interface TierMetadata {
  color: string;
  icon: string;
  recommendedFor: string[];
  upgradeFrom?: SubscriptionPlan[];
  downgradeTo?: SubscriptionPlan[];
  trialDays: number;
  freeCredits?: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  status: PlanStatus;
  startDate: Date;
  endDate?: Date;
  renewalDate?: Date;
  price: number;
  discount?: number;
  paymentMethod?: string;
  invoiceHistory: Invoice[];
  nextInvoice?: InvoicePreview;
  features: SubscriptionFeatures;
}

export interface SubscriptionFeatures {
  aiQueries: FeatureLimit;
  storage: FeatureLimit;
  teamMembers: FeatureLimit;
  apiAccess: boolean;
  prioritySupport: boolean;
  customModels: boolean;
  analytics: string[];
  integrations: string[];
}

export interface FeatureLimit {
  current: number;
  limit: number;
  unit: string;
  resetDate?: Date;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl?: string;
}

export interface InvoicePreview {
  date: Date;
  amount: number;
  discount?: number;
  tax?: number;
  total: number;
}

export interface PricingComparison {
  feature: string;
  free: boolean | string | number;
  professional: boolean | string | number;
  enterprise: boolean | string | number;
  tooltip?: string;
}

// New interfaces for discount calculations
export interface DiscountSchedule {
  years: number;
  averageDiscount: number;
  effectiveMonthlyPrice: number;
  totalCost: number;
  savings: number;
}

export interface PricingCalculatorInput {
  monthlyQueries: number;
  teamSize: number;
  storageNeeded: number; // in GB
  needPrioritySupport: boolean;
  needCustomModels: boolean;
  commitmentYears: number;
}

export interface PricingCalculatorResult {
  recommendedPlan: SubscriptionPlan;
  monthlyCost: number;
  yearlyCost: number;
  savingsPercentage: number;
  featuresIncluded: string[];
  missingFeatures: string[];
  upgradeSuggestions: string[];
}

// Interface for the pricing page state
export interface PricingPageState {
  billingCycle: BillingCycle;
  selectedTier: SubscriptionPlan;
  commitmentYears: number;
  showYearlyComparison: boolean;
  isAnnual: boolean;
  discountMultiplier: number;
}

// Interface for plan upgrade/downgrade
export interface PlanChangeRequest {
  fromPlan: SubscriptionPlan;
  toPlan: SubscriptionPlan;
  billingCycle: BillingCycle;
  immediate: boolean;
  prorated: boolean;
  reason?: string;
}

// Usage statistics for user dashboard
export interface UsageStatistics {
  currentMonth: MonthlyUsage;
  previousMonth: MonthlyUsage;
  trends: UsageTrend[];
  projections: UsageProjection[];
}

export interface MonthlyUsage {
  queries: number;
  documents: number;
  storage: number;
  apiCalls: number;
  cost: number;
}

export interface UsageTrend {
  month: string;
  queries: number;
  cost: number;
  growth: number;
}

export interface UsageProjection {
  month: string;
  projectedQueries: number;
  projectedCost: number;
  recommendedPlan?: SubscriptionPlan;
}

// For the pricing calculator component
export interface PlanRecommendation {
  plan: SubscriptionPlan;
  confidence: number; // 0-100
  monthlyPrice: number;
  yearlyPrice: number;
  savings: number;
  reasons: string[];
  missingFeatures: string[];
}

// For displaying plan comparison
export interface PlanComparisonRow {
  feature: string;
  free: string | boolean | number;
  professional: string | boolean | number;
  enterprise: string | boolean | number;
  tooltip?: string;
  highlight?: boolean;
}

// For the upgrade modal
export interface UpgradeOptions {
  fromPlan: SubscriptionPlan;
  toPlans: Array<{
    plan: SubscriptionPlan;
    monthlyPrice: number;
    yearlyPrice: number;
    savings: number;
    featuresGained: string[];
    recommended: boolean;
  }>;
  proratedAmount?: number;
  nextBillingDate?: Date;
}

// For tracking user's plan eligibility
export interface PlanEligibility {
  canUpgrade: boolean;
  canDowngrade: boolean;
  canCancel: boolean;
  canPause: boolean;
  requirements: string[];
  restrictions: string[];
}

// Legacy interface for backward compatibility (if needed)
export interface LegacyPricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  cta: string;
  highlighted?: boolean;
}

// Simple User interface for basic usage
export interface SimpleUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: SubscriptionPlan;
  avatar?: string;
}

// Simple PricingPlan for basic usage
export interface SimplePricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  cta: string;
  highlighted?: boolean;
}