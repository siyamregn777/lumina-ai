import cors from 'cors';
import { config } from '../config/index.js';

export const corsMiddleware = cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

    if (!origin  || allowedOrigins.includes(origin))
       return callback(null, true);
    
    if (config.allowedOrigins.indexOf(origin) === -1) {
      console.warn(`CORS blocked: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200
});