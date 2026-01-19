import { StripeService } from '../services/stripeService.js';
import { createClient } from '@supabase/supabase-js';
import { config } from '../config/index.js';

// Initialize Supabase client
const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

const stripeService = new StripeService();

async function updateUserSubscription(userId, planId, subscriptionData) {
  try {
    console.log(`=== UPDATE USER SUBSCRIPTION ===`);
    console.log('User ID:', userId);
    console.log('Plan ID:', planId);
    console.log('Subscription Data:', {
      customerId: subscriptionData.customerId,
      subscriptionId: subscriptionData.subscriptionId,
      hasSession: !!subscriptionData.session
    });

    // Map Stripe planId to your SubscriptionPlan enum
    const planMap = {
      'pro': 'PROFESSIONAL',
      'enterprise': 'ENTERPRISE',
      'PROFESSIONAL': 'PROFESSIONAL',
      'ENTERPRISE': 'ENTERPRISE'
    };

    const subscriptionPlan = planMap[planId] || planId;
    console.log('Mapped subscription plan:', subscriptionPlan);

    // First, check if user exists
    console.log('Checking if user exists in database...');
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id, email, subscription, subscription_status')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('❌ User not found in database:', fetchError);
      console.log('Creating new user record...');
      
      // Try to insert new user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: subscriptionData.userEmail || 'unknown@email.com',
          subscription: subscriptionPlan,
          subscription_status: 'active',
          stripe_customer_id: subscriptionData.customerId,
          stripe_subscription_id: subscriptionData.subscriptionId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();

      if (insertError) {
        console.error('❌ Failed to create user:', insertError);
        throw insertError;
      }

      console.log('✅ Created new user record:', newUser);
      return newUser;
    }

    console.log('✅ User found in database:', {
      email: existingUser.email,
      currentSubscription: existingUser.subscription,
      currentStatus: existingUser.subscription_status
    });

    // Prepare update data
    const updateData = {
      subscription: subscriptionPlan,
      subscription_status: 'active',
      stripe_customer_id: subscriptionData.customerId,
      stripe_subscription_id: subscriptionData.subscriptionId,
      updated_at: new Date().toISOString()
    };

    // Add current_period_end if available
    if (subscriptionData.session?.subscription?.current_period_end) {
      updateData.current_period_end = new Date(
        subscriptionData.session.subscription.current_period_end * 1000
      ).toISOString();
    }

    console.log('Attempting update with data:', updateData);

    // Update user in database
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select();

    if (error) {
      console.error('❌ Update failed:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // Try without SELECT to see if it's a SELECT permission issue
      console.log('Trying update without SELECT...');
      const { error: updateOnlyError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);
      
      if (updateOnlyError) {
        console.error('❌ Update only also failed:', updateOnlyError);
        throw updateOnlyError;
      } else {
        console.log('✅ Update succeeded (without SELECT)');
        return [{ id: userId, ...updateData }];
      }
    }

    console.log(`✅ Updated user ${userId} to ${subscriptionPlan} subscription`);
    console.log('Update result:', data);
    return data;
  } catch (error) {
    console.error('❌ Error in updateUserSubscription:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}

export const paymentController = {
  createCheckoutSession: async (req, res) => {
  try {
    console.log('Creating checkout session for:', req.body.userEmail);
    console.log('Full request body:', req.body);
    
    const { userId, planId, billingCycle, userEmail, successUrl, cancelUrl } = req.body;

    // ✅ ACCEPT BOTH UPPERCASE AND LOWERCASE
    const normalizedPlanId = (planId || '').toUpperCase();
    const normalizedBillingCycle = (billingCycle || '').toLowerCase();

    console.log('Normalized values:', {
      originalPlanId: planId,
      normalizedPlanId,
      originalBilling: billingCycle,
      normalizedBillingCycle
    });

    // ✅ VALIDATE: Accept both uppercase and lowercase input
    const validPlans = ['STARTER', 'PROFESSIONAL', 'ENTERPRISE'];
    const validBilling = ['monthly', 'yearly'];
    
    // Check if plan is valid (after normalization)
    if (!validPlans.includes(normalizedPlanId)) {
      return res.status(400).json({
        error: 'Invalid plan',
        message: 'Plan must be STARTER, PROFESSIONAL, or ENTERPRISE (case insensitive)',
        received: planId,
        normalized: normalizedPlanId,
        allowed: validPlans
      });
    }

    if (!validBilling.includes(normalizedBillingCycle)) {
      return res.status(400).json({
        error: 'Invalid billing cycle',
        message: 'Billing cycle must be MONTHLY or YEARLY (case insensitive)',
        received: billingCycle,
        normalized: normalizedBillingCycle,
        allowed: validBilling
      });
    }

    // Handle free plan
    if (normalizedPlanId === 'STARTER') {
      console.log('Handling free STARTER plan signup');
      
      const { error: dbError } = await supabase
        .from('users')
        .update({
          subscription: 'STARTER',
          subscription_status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (dbError) {
        console.error('Failed to update to starter plan:', dbError);
        return res.status(500).json({ error: 'Failed to activate starter plan' });
      }

      return res.json({
        success: true,
        message: 'Starter plan activated successfully',
        planId: 'STARTER'
      });
    }

    // For paid plans, create Stripe checkout
    let baseUrl;
    if (successUrl) {
      try {
        baseUrl = new URL(successUrl).origin;
      } catch (error) {
        baseUrl = req.headers.origin || config.frontendUrl;
      }
    } else {
      baseUrl = req.headers.origin || config.frontendUrl;
    }

    console.log('Base URL for redirects:', baseUrl);
    // In createCheckoutSession function
    const finalSuccessUrl = `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    // const finalSuccessUrl = successUrl || `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancelUrl || `${baseUrl}/pricing`;

    console.log('Success URL:', finalSuccessUrl);
    console.log('Cancel URL:', finalCancelUrl);

    // ✅ Map to Stripe product names (Stripe uses lowercase 'pro' and 'enterprise')
    const stripePlanMap = {
      'PROFESSIONAL': 'pro',
      'ENTERPRISE': 'enterprise'
    };

    const stripePlanId = stripePlanMap[normalizedPlanId];
    if (!stripePlanId) {
      return res.status(400).json({
        error: 'Invalid plan for Stripe',
        message: `Plan ${normalizedPlanId} cannot be processed through Stripe`
      });
    }

    // ✅ Call Stripe service with lowercase values
    const session = await stripeService.createCheckoutSession({
      userId,
      planId: stripePlanId,           // lowercase for Stripe
      billingCycle: normalizedBillingCycle, // already lowercase
      userEmail,
      successUrl: finalSuccessUrl,
      cancelUrl: finalCancelUrl
    });

    console.log(`✅ Checkout session created: ${session.id}`);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('❌ Stripe error:', error.message);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
},

  verifySession: async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      console.log('Verifying session:', sessionId);
      
      const result = await stripeService.verifySession(sessionId);

      console.log(`✅ Payment verified for user ${result.userId}, plan ${result.planId}`);

      // Update user's subscription in database
      if (result.userId) {
        await updateUserSubscription(
          result.userId,
          result.planId.toUpperCase(),
          result
        );

      }

      res.json({
        success: true,
        message: `Successfully upgraded to ${result.planId} plan!`,
        ...result
      });
    } catch (error) {
      console.error('❌ Session verification error:', error);
      
      if (error.type === 'StripeInvalidRequestError') {
        return res.status(400).json({ 
          error: 'Invalid session ID',
          message: error.message 
        });
      }
      
      if (error.message.includes('Payment not completed')) {
        return res.status(400).json({ 
          error: error.message,
          payment_status: error.payment_status
        });
      }
      
      res.status(500).json({ error: error.message });
    }
  },

  handleWebhook: async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = config.stripe.webhookSecret;

    if (!endpointSecret) {
      console.log('⚠️ Webhook secret not configured');
      return res.status(400).send('Webhook secret not configured');
    }

    try {
      const event = await stripeService.constructWebhookEvent(
        req.body,
        sig,
        endpointSecret
      );

      console.log(`Webhook received: ${event.type}`);

      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          console.log('Checkout completed for:', session.metadata?.userEmail);
          
          // Update user subscription
          if (session.metadata?.userId) {
            await updateUserSubscription(
              session.metadata.userId,
              session.metadata.planId,
              {
                customerId: session.customer,
                subscriptionId: session.subscription,
                session: session
              }
            );
          }
          break;
          
        case 'customer.subscription.updated':
          const subscription = event.data.object;
          console.log('Subscription updated:', subscription.id);
          break;
          
        case 'customer.subscription.deleted':
          const cancelledSubscription = event.data.object;
          console.log('Subscription cancelled:', cancelledSubscription.id);
          break;
          
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  },

  // Add this method to check user subscription
  getUserSubscription: async (req, res) => {
    try {
      const { userId } = req.params;
      
      const { data: user, error } = await supabase
        .from('users')
        .select('subscription, subscription_status, current_period_end, email, full_name')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      res.json({
        subscription: user.subscription || 'STARTER',
        status: user.subscription_status || 'inactive',
        current_period_end: user.current_period_end,
        is_active: (user.subscription_status === 'active') || 
                   (user.subscription !== 'STARTER' && !user.subscription_status)
      });
    } catch (error) {
      console.error('Subscription check error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};