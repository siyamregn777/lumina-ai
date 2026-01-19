import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from server root
const serverRoot = path.join(__dirname, '..');
dotenv.config({ path: path.join(serverRoot, '.env.development') });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3001,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    starterPriceId: process.env.STRIPE_STARTER_PRICE_ID,
    proMonthlyPriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    proYearlyPriceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
    enterpriseMonthlyPriceId: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
    enterpriseYearlyPriceId: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
  },
  
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  
  allowedOrigins: (process.env.NODE_ENV === 'production')
    ? [
        'https://lumina-ai-green.vercel.app',
        'https://lumina-ai.vercel.app',
      ]
    : [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000'
      ]
};

// Log config on startup
console.log('=== CONFIGURATION ===');
console.log('Environment:', config.nodeEnv);
console.log('Port:', config.port);
console.log('Frontend URL:', config.frontendUrl);
console.log('Stripe configured:', !!config.stripe.secretKey);
console.log('Supabase URL:', config.supabase.url);
console.log('Supabase Anon Key (first 30 chars):', 
  config.supabase.anonKey ? config.supabase.anonKey.substring(0, 30) + '...' : 'Not found'
);
console.log('Supabase Service Key exists:', !!config.supabase.serviceRoleKey);
console.log('=====================');

export default config;