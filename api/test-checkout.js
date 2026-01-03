// api/test-checkout.js (temporary test)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  console.log('✅ Test API called with:', req.body);
  
  // Return test response
  return res.status(200).json({
    success: true,
    message: 'API is working!',
    sessionId: 'test_' + Date.now(),
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}