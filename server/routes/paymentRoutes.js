import express from 'express';
import { paymentController } from '../controllers/paymentController.js';
import { validatePaymentData } from '../middleware/auth.js';

const router = express.Router();

// Create checkout session
router.post('/create-checkout-session', validatePaymentData, paymentController.createCheckoutSession);

// Verify payment session
router.post('/verify-session', paymentController.verifySession);

// Get user subscription status
router.get('/subscription/:userId', paymentController.getUserSubscription);

// Stripe webhook (requires raw body)
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

export default router;