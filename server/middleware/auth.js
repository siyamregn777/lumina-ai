// For future authentication middleware
export const authenticate = (req, res, next) => {
  // Add your authentication logic here
  // For now, just pass through
  next();
};

export const validatePaymentData = (req, res, next) => {
  let { userId, planId, billingCycle, userEmail } = req.body;

  if (!userId || !planId || !billingCycle || !userEmail) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['userId', 'planId', 'billingCycle', 'userEmail']
    });
  }

  // ✅ Normalize FIRST
  const normalizedPlanId = planId.toUpperCase();
  const normalizedBillingCycle = billingCycle.toLowerCase();

  // ✅ Accept ALL valid plans
  const validPlans = ['STARTER', 'PROFESSIONAL', 'ENTERPRISE'];
  const validBilling = ['monthly', 'yearly'];

  if (!validPlans.includes(normalizedPlanId)) {
    return res.status(400).json({
      error: 'Invalid planId',
      received: planId,
      allowed: validPlans
    });
  }

  if (!validBilling.includes(normalizedBillingCycle)) {
    return res.status(400).json({
      error: 'Invalid billingCycle',
      received: billingCycle,
      allowed: validBilling
    });
  }

  // ✅ Overwrite request with normalized values
  req.body.planId = normalizedPlanId;
  req.body.billingCycle = normalizedBillingCycle;

  next();
};
