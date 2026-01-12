export const config = {
  // Get API URL from env, with fallback
  apiUrl: import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'development' 
      ? 'http://localhost:3001' 
      : 'https://lumina-ai-y4hx.onrender.com'),
  
  // Determine if we're in production
  isProduction: import.meta.env.MODE === 'production',
  
  // Get current origin (works in both dev and prod)
  getCurrentOrigin: () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    // SSR fallback
    return import.meta.env.MODE === 'production'
      ? 'https://lumina-ai-green.vercel.app'
      : 'http://localhost:3000';
  }
};