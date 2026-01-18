// For future authentication middleware
export const authenticate = (req, res, next) => {
  // Add your authentication logic here
  // For now, just pass through
  next();
};

export const validatePaymentData = (req, res, next) => {
  const { userId, planId, billingCycle, userEmail } = req.body;
  
  if (!userId || !planId || !billingCycle || !userEmail) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['userId', 'planId', 'billingCycle', 'userEmail']
    });
  }
  
  if (!['pro', 'enterprise'].includes(planId)) {
    return res.status(400).json({
      error: 'Invalid planId',
      allowed: ['pro', 'enterprise']
    });
  }
  
  if (!['monthly', 'yearly'].includes(billingCycle)) {
    return res.status(400).json({
      error: 'Invalid billingCycle',
      allowed: ['monthly', 'yearly']
    });
  }
  
  next();
};