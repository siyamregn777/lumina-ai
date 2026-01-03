// server.js - Updated for Render deployment
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();

// Get environment variables
const stripeKey = process.env.STRIPE_SECRET_KEY;
const frontendUrl = process.env.FRONTEND_URL || 'https://lumina-ai-green.vercel.app';
const isProduction = process.env.NODE_ENV === 'production';

// Configure CORS for production
const allowedOrigins = [
  'http://localhost:3000',
  'https://lumina-ai-green.vercel.app',
  'https://lumina-ai.vercel.app',
  // Add other domains as needed
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Lumina AI Backend',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Stripe checkout endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('📦 Creating Stripe checkout session...');
    
    const { userId, planId, billingCycle, userEmail } = req.body;
    
    // Price mapping
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
      return res.status(400).json({ error: 'Invalid plan or billing cycle' });
    }
    
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      client_reference_id: userId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${frontendUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/pricing`,
      metadata: { userId, planId, billingCycle },
    });
    
    console.log('✅ Checkout session created:', session.id);
    
    res.json({ 
      sessionId: session.id,
      url: session.url 
    });
    
  } catch (error) {
    console.error('❌ Stripe error:', error);
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
🔗 Frontend: ${frontendUrl}
💳 Stripe: ${stripeKey ? 'Configured' : 'Missing'}
📋 API: http://localhost:${PORT}/api/health
`);
});