import express from 'express';
import { config } from '../config/index.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Lumina AI Backend',
    environment: config.nodeEnv,
    frontend: config.frontendUrl,
    timestamp: new Date().toISOString(),
    allowedOrigins: config.allowedOrigins
  });
});

router.get('/test', (req, res) => {
  res.json({
    message: 'Backend is working!',
    environment: config.nodeEnv,
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

export default router;