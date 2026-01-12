import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';
  
  return {
    // Base URL for production - CRITICAL for Vercel
    base: isProduction ? '/' : '/',
    
    server: {
      port: 3000,
      host: '0.0.0.0',
      // CSP headers for development
      headers: {
        'Content-Security-Policy': 
          "default-src 'self' http://localhost:3000 https:; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://*.stripe.com https://js.stripe.com; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "img-src 'self' data: https: blob:; " +
          "connect-src 'self' http://localhost:3000 http://localhost:3001 https: wss:; " +
          "frame-src 'self' https://*.stripe.com https://js.stripe.com;"
      }
    },
    
    plugins: [react()],
    
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.NODE_ENV': JSON.stringify(mode),
      // For Stripe
      'process.env.VITE_STRIPE_PUBLISHABLE_KEY': JSON.stringify(env.VITE_STRIPE_PUBLISHABLE_KEY)
    },
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        input: {
          main: './index.html'
        },
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            stripe: ['@stripe/stripe-js'],
            ui: ['lucide-react']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction
        }
      }
    },
    
    // Preview configuration
    preview: {
      port: 4173,
      host: true,
      headers: {
        'Content-Security-Policy': 
          "default-src 'self' https:; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://*.stripe.com https://js.stripe.com; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "img-src 'self' data: https: blob:; " +
          "connect-src 'self' https: wss:; " +
          "frame-src 'self' https://*.stripe.com https://js.stripe.com;"
      }
    }
  };
});