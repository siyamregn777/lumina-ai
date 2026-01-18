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