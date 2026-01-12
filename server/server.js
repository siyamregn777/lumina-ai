import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

dotenv.config({ 
  path: path.join(__dirname, envFile) 
});

console.log('=== SERVER STARTUP ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Loading from:', envFile);
console.log('Frontend URL:', process.env.FRONTEND_URL);
console.log('Port:', process.env.PORT);
console.log('Stripe configured:', !!process.env.STRIPE_SECRET_KEY);
console.log('=====================');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// CORS Configuration
const allowedOrigins = isProduction
  ? [
      'https://lumina-ai-green.vercel.app',
      'https://lumina-ai.vercel.app',
    ]
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000'
    ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.warn(`CORS blocked: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Lumina AI Backend',
    environment: process.env.NODE_ENV,
    frontend: process.env.FRONTEND_URL,
    timestamp: new Date().toISOString(),
    allowedOrigins: allowedOrigins
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is working!',
    environment: process.env.NODE_ENV,
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Stripe checkout endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('Creating checkout session for:', req.body.userEmail);
    
    const { userId, planId, billingCycle, userEmail, successUrl, cancelUrl } = req.body;

    // Determine base URL for redirects
    let baseUrl;
    if (successUrl) {
      try {
        baseUrl = new URL(successUrl).origin;
      } catch (error) {
        baseUrl = process.env.FRONTEND_URL;
      }
    } else {
      baseUrl = req.headers.origin || process.env.FRONTEND_URL;
    }

    console.log('Base URL for redirects:', baseUrl);

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

    const priceId = priceMap[planId]?.[billingCycle];
    if (!priceId) {
      console.error(`Invalid plan/billing: ${planId}/${billingCycle}`);
      return res.status(400).json({ 
        error: 'Invalid plan or billing cycle',
        availablePlans: Object.keys(priceMap)
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Use provided URLs or construct from baseUrl
    const finalSuccessUrl = successUrl || `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancelUrl || `${baseUrl}/pricing`;

    console.log('Success URL:', finalSuccessUrl);
    console.log('Cancel URL:', finalCancelUrl);

    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      client_reference_id: userId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: { userId, planId, billingCycle },
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('❌ Stripe error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint (for future use)
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!endpointSecret) {
    console.log('⚠️ Webhook secret not configured');
    return res.status(400).send('Webhook secret not configured');
  }

  let event;

  try {
    event = Stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Webhook received: ${event.type}`);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout completed for:', session.customer_email);
      // TODO: Update user subscription in your database
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
🚀 Lumina AI Backend Server
────────────────────────────
📡 Port: ${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
🔗 Frontend: ${process.env.FRONTEND_URL}
💳 Stripe: ${process.env.STRIPE_SECRET_KEY ? '✅ Configured' : '❌ Missing'}
📋 Health: http://localhost:${PORT}/api/health
🔓 CORS: ${isProduction ? 'Restricted to production domains' : 'Open for development'}
────────────────────────────
`);
});