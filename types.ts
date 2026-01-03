
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: SubscriptionPlan;
  avatar?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  cta: string;
  highlighted?: boolean;
}
