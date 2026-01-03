
/**
 * Application Configuration
 * These values are pulled from environment variables.
 * In a production build, these should be injected by your CI/CD or hosting provider.
 */
export const config = {
  supabase: {
    url: (process.env.VITE_SUPABASE_URL as string) || '',
    anonKey: (process.env.VITE_SUPABASE_ANON_KEY as string) || '',
  },
  stripe: {
    publishableKey: (process.env.VITE_STRIPE_PUBLISHABLE_KEY as string) || '',
    prices: {
      monthly: (process.env.VITE_STRIPE_MONTHLY_PRICE_ID as string) || 'price_default_monthly',
      yearly: (process.env.VITE_STRIPE_YEARLY_PRICE_ID as string) || 'price_default_yearly',
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
