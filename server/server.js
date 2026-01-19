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
app.get('/api/check-db', async (req, res) => {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
    
    console.log('Checking database connection...');
    
    // Try multiple approaches
    const results = {
      connection: 'Testing...',
      tableExists: false,
      userCount: 0,
      sampleUsers: []
    };
    
    // 1. Try to get user count
    try {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        results.connection = `Error: ${error.message}`;
        results.tableExists = false;
      } else {
        results.connection = '✅ Connected successfully';
        results.tableExists = true;
        results.userCount = count || 0;
      }
    } catch (error) {
      results.connection = `Exception: ${error.message}`;
    }
    
    // 2. Try to get some users if table exists
    if (results.tableExists) {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, subscription, created_at')
        .limit(5);
      
      if (!error && data) {
        results.sampleUsers = data;
      }
    }
    
    // 3. Try to insert a test record
    if (results.tableExists) {
      const testId = `test-${Date.now()}`;
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: testId,
          email: `test-${Date.now()}@test.com`,
          subscription: 'TEST',
          created_at: new Date().toISOString()
        });
      
      results.canInsert = !insertError;
      
      // Clean up
      if (!insertError) {
        await supabase.from('users').delete().eq('id', testId);
      }
    }
    
    res.json({
      success: true,
      ...results,
      supabaseUrl: process.env.SUPABASE_URL,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database check error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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