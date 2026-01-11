import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from current directory
dotenv.config({ path: path.join(__dirname, '.env') });

// DEBUG: Check if env vars are loaded
console.log('=== ENV CHECK ===');
console.log('STRIPE_SECRET_KEY loaded:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_PRO_MONTHLY_PRICE_ID loaded:', !!process.env.STRIPE_PRO_MONTHLY_PRICE_ID);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Current directory:', __dirname);
console.log('==================');


// server.js - Fixed CORS configuration
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();

// Get environment variables
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isProduction = process.env.NODE_ENV === 'production';

// SIMPLIFIED CORS CONFIGURATION
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins in development
    if (!isProduction) {
      return callback(null, true);
    }
    
    // In production, restrict to specific domains
    const allowedOrigins = [
      'https://lumina-ai-green.vercel.app',
      'https://lumina-ai.vercel.app',
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Health check endpoint - FIXED
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Lumina AI Backend',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    // Don't stringify the function, just show allowed logic
    corsPolicy: isProduction ? 'restricted' : 'open'
  });
});

// IMPORTANT: Add middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
  console.log('Headers:', req.headers);
  next();
});

// In your server.js, update the create-checkout-session endpoint:
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('=== CREATE CHECKOUT SESSION REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    
    const { userId, planId, billingCycle, userEmail, successUrl, cancelUrl } = req.body;

    console.log('Plan ID received:', planId);
    console.log('Billing Cycle received:', billingCycle);
    console.log('Type of planId:', typeof planId);
    console.log('planId value:', planId);

    // Get origin from request headers
    const origin = req.headers.origin;
    console.log('Request Origin:', origin);

    // Always use the origin from request for local development
    const baseUrl = origin || 'http://localhost:3000';
    
    console.log('Using base URL:', baseUrl);

    // DEBUG: Show what's in priceMap
    console.log('=== PRICE MAP DEBUG ===');
    const priceMap = {
      pro: {
        monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
      },
      enterprise: {
        monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
      },
    };
    
    console.log('Price Map keys:', Object.keys(priceMap));
    console.log('Price Map structure:', priceMap);
    console.log('Environment variable check:');
    console.log('STRIPE_PRO_MONTHLY_PRICE_ID exists:', !!process.env.STRIPE_PRO_MONTHLY_PRICE_ID);
    console.log('STRIPE_PRO_YEARLY_PRICE_ID exists:', !!process.env.STRIPE_PRO_YEARLY_PRICE_ID);
    console.log('STRIPE_ENTERPRISE_MONTHLY_PRICE_ID exists:', !!process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID);
    console.log('STRIPE_ENTERPRISE_YEARLY_PRICE_ID exists:', !!process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID);

    // Check if planId exists in priceMap
    if (!priceMap[planId]) {
      console.error(`❌ planId "${planId}" not found in priceMap`);
      console.error(`Available planIds: ${Object.keys(priceMap).join(', ')}`);
      return res.status(400).json({ 
        error: `Invalid plan or billing cycle. Plan "${planId}" not found. Available: ${Object.keys(priceMap).join(', ')}` 
      });
    }

    // Check if billingCycle exists for this plan
    if (!priceMap[planId][billingCycle]) {
      console.error(`❌ billingCycle "${billingCycle}" not found for plan "${planId}"`);
      console.error(`Available billing cycles for ${planId}: ${Object.keys(priceMap[planId]).join(', ')}`);
      return res.status(400).json({ 
        error: `Invalid billing cycle "${billingCycle}" for plan "${planId}". Available: ${Object.keys(priceMap[planId]).join(', ')}` 
      });
    }

    const priceId = priceMap[planId][billingCycle];
    console.log('✅ Using Price ID:', priceId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Use the URLs provided by frontend OR construct from origin
    const sessionSuccessUrl = successUrl || `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
    const sessionCancelUrl = cancelUrl || `${baseUrl}/pricing`;

    console.log('Redirect URLs:', { 
      success: sessionSuccessUrl, 
      cancel: sessionCancelUrl 
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      client_reference_id: userId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: sessionSuccessUrl,
      cancel_url: sessionCancelUrl,
      metadata: { userId, planId, billingCycle },
    });

    console.log('✅ Session created:', session.id);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('❌ Stripe session creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
🚀 Backend server started
📡 Port: ${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
💳 Stripe: ${stripeKey ? 'Configured' : 'Missing'}
📋 Health check: http://localhost:${PORT}/api/health
🔓 CORS: ${isProduction ? 'Restricted' : 'Open for development'}
`);
});