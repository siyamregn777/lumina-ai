import Stripe from 'stripe';
import { config } from '../config/index.js';

export class StripeService {
  constructor() {
    if (!config.stripe.secretKey) {
      throw new Error('Stripe secret key is not configured');
    }
    this.stripe = new Stripe(config.stripe.secretKey);
  }

  getPriceId(planId, billingCycle) {
    console.log('Getting price for:', { planId, billingCycle });
    
    // Convert planId to match your Stripe product names
    const priceMap = {
      'STARTER': {  // Starter/free plan
        MONTHLY: config.stripe.starterPriceId,
        YEARLY: config.stripe.starterPriceId,
      },
      'PROFESSIONAL': {  // Changed from 'pro' to 'PROFESSIONAL'
        MONTHLY: config.stripe.proMonthlyPriceId,
        YEARLY: config.stripe.proYearlyPriceId,
      },
      'ENTERPRISE': {
        MONTHLY: config.stripe.enterpriseMonthlyPriceId,
        YEARLY: config.stripe.enterpriseYearlyPriceId,
      },
    };

    const priceId = priceMap[planId]?.[billingCycle];
    
    if (!priceId) {
      console.error('Available price IDs:', {
        STARTER: config.stripe.starterPriceId,
        PRO_MONTHLY: config.stripe.proMonthlyPriceId,
        PRO_YEARLY: config.stripe.proYearlyPriceId,
        ENTERPRISE_MONTHLY: config.stripe.enterpriseMonthlyPriceId,
        ENTERPRISE_YEARLY: config.stripe.enterpriseYearlyPriceId,
      });
      throw new Error(`Invalid plan/billing: ${planId}/${billingCycle}. Available: STARTER, PROFESSIONAL, ENTERPRISE`);
    }

    return priceId;
  }

  async createCheckoutSession(data) {
    const { userId, planId, billingCycle, userEmail, successUrl, cancelUrl } = data;
    
    const priceId = this.getPriceId(planId, billingCycle);
    console.log('Using price ID:', priceId);

    const session = await this.stripe.checkout.sessions.create({
      customer_email: userEmail,
      client_reference_id: userId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { 
        userId, 
        planId, 
        billingCycle,
        userEmail 
      },
    });

    return session;
  }

  async verifySession(sessionId) {
    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    });

    console.log('Session retrieved:', {
      id: session.id,
      payment_status: session.payment_status,
      metadata: session.metadata
    });

    if (session.payment_status !== 'paid') {
      throw new Error(`Payment not completed: ${session.payment_status}`);
    }

    return {
      session,
      userId: session.metadata?.userId,
      planId: session.metadata?.planId,
      billingCycle: session.metadata?.billingCycle,
      userEmail: session.metadata?.userEmail,
      subscriptionId: session.subscription?.id,
      customerId: session.customer?.id,
      amountPaid: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      paymentStatus: session.payment_status,
      status: session.status,
      subscriptionStatus: session.subscription?.status
    };
  }

  async constructWebhookEvent(rawBody, signature, endpointSecret) {
    return Stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret
    );
  }
}