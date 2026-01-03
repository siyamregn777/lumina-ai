// server.js
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

// Load backend environment variables
dotenv.config({ path: '.env.server' });

console.log('🚀 Starting backend server...');
console.log('📋 Environment check:');
console.log('- STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Loaded' : '❌ Missing');
console.log('- PORT:', process.env.PORT || 3001);

// Validate Stripe key
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ ERROR: STRIPE_SECRET_KEY is missing from .env.server');
  process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  console.error('❌ ERROR: STRIPE_SECRET_KEY should start with "sk_"');
  process.exit(1);
}

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Stripe checkout endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('\n🛒 Creating checkout session...');
    console.log('Request body:', req.body);
    
    const { userId, planId, billingCycle, userEmail } = req.body;
    
    // Price mapping - updated with your actual Price IDs
    const priceMap = {
      starter: process.env.STRIPE_STARTER_PRICE_ID,
      pro: {
        monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID,
      },
      enterprise: {
        monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
        yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
      },
    };
    
    let priceId;
    if (planId === 'starter') {
      priceId = priceMap.starter;
    } else {
      priceId = priceMap[planId]?.[billingCycle];
    }
    
    if (!priceId) {
      console.error('❌ Price ID not found for:', { planId, billingCycle });
      return res.status(400).json({ 
        error: `Price not configured for plan: ${planId} (${billingCycle})` 
      });
    }
    
    console.log('💰 Using Price ID:', priceId);
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      client_reference_id: userId,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: planId === 'starter' ? 'payment' : 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pricing`,
      metadata: {
        userId,
        planId,
        billingCycle,
      },
    });
    
    console.log('✅ Checkout session created:', session.id);
    console.log('🔗 Checkout URL:', session.url);
    
    res.json({ 
      sessionId: session.id,
      url: session.url 
    });
    
  } catch (error) {
    console.error('❌ Stripe API error:', error.message);
    res.status(500).json({ 
      error: error.message,
      type: error.type,
      code: error.code
    });
  }
});

// Test endpoint
app.get('/api/test-stripe', async (req, res) => {
  try {
    const products = await stripe.products.list({ limit: 5 });
    const prices = await stripe.prices.list({ limit: 10 });
    
    res.json({
      status: 'Stripe connection successful',
      products: products.data.map(p => ({ id: p.id, name: p.name })),
      prices: prices.data.map(p => ({ 
        id: p.id, 
        product: p.product,
        unit_amount: p.unit_amount,
        currency: p.currency,
        type: p.type
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Stripe Checkout API',
    version: '1.0.0'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/test-stripe`);
  console.log(`   POST http://localhost:${PORT}/api/create-checkout-session`);
  console.log(`\n🎯 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔐 Stripe mode: ${process.env.STRIPE_SECRET_KEY.includes('test') ? 'TEST' : 'LIVE'}`);
});