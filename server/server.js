import express from 'express';
import { config } from './config/index.js';
import { corsMiddleware } from './middleware/cors.js';
import { logger } from './utils/logger.js';
import paymentRoutes from './routes/paymentRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(logger.request);

// Add this before your routes
app.post('/api/test-update-direct', async (req, res) => {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const { userId, subscription } = req.body;
    
    console.log('Direct update test:', { userId, subscription });
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { persistSession: false },
        global: {
          headers: {
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
          }
        }
      }
    );
    
    // Direct update
    const { data, error } = await supabase
      .from('users')
      .update({
        subscription: subscription,
        subscription_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select();
    
    if (error) {
      console.error('Direct update error:', error);
      return res.status(500).json({ 
        error: error.message,
        details: error.details,
        hint: error.hint 
      });
    }
    
    res.json({
      success: true,
      message: 'Direct update successful',
      data: data
    });
    
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ error: error.message });
  }
});
// Routes
app.use('/api', healthRoutes);
app.use('/api', paymentRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
🚀 Lumina AI Backend Server
────────────────────────────
📡 Port: ${PORT}
🌐 Environment: ${config.nodeEnv}
🔗 Frontend: ${config.frontendUrl}
💳 Stripe: ${config.stripe.secretKey ? '✅ Configured' : '❌ Missing'}
📋 Health: http://localhost:${PORT}/api/health
────────────────────────────
`);
});

export default app;