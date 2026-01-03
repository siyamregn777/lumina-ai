// config.ts
/**
 * Application Configuration
 * These values are pulled from environment variables.
 * In a production build, these should be injected by your CI/CD or hosting provider.
 */
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
    prices: {
      monthly: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID || 'price_default_monthly',
      yearly: import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID || 'price_default_yearly',
    },
  },
};

// Simple validation to warn in console if keys are missing
if (!config.supabase.url || !config.supabase.anonKey) {
  console.warn("Lumina AI: Supabase configuration is missing. Check your .env file.");
}
if (!config.stripe.publishableKey) {
  console.warn("Lumina AI: Stripe publishable key is missing. Check your .env file.");
}