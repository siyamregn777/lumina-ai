import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import HomePage from './src/pages/HomePage';
import FeaturesPage from './src/pages/FeaturesPage';
import PricingPage from './src/pages/PricingPage';
import DocsPage from './src/pages/DocsPage';
import BlogPage from './src/pages/BlogPage';
import ContactPage from './src/pages/ContactPage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import Dashboard from './src/pages/Dashboard';
import AdminPanel from './src/pages/AdminPanel';
import { User, UserRole, SubscriptionPlan } from './src/types/types';
import { supabase } from './src/lib/supabase';
import CheckoutPage from './src/pages/CheckoutPage';
import DashboardOverview from './src/components/dashboard/DashboardOverview';
import AIChatPanel from './src/components/dashboard/AIChatPanel';
import DataUpload from './src/components/dashboard/DataUpload';
import InsightsPage from './src/components/dashboard/InsightsPage';
import ReportsPage from './src/components/dashboard/ReportsPage';
import BillingSettings from './src/components/dashboard/BillingSettings';
import SubscriptionAccount from './src/components/dashboard/SubscriptionAccount';
import EnvDebug from './src/pages/EnvDebug';
import DebugPage from './src/pages/Debug';
import DashboardWrapper from './src/components/DashboardWrapper';
import CheckoutSuccess from './src/pages/CheckoutSuccess';
import CheckoutCancel from './src/pages/CheckoutCancel';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        mapSupabaseUser(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        mapSupabaseUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapSupabaseUser = (sbUser: any) => {
    setUser({
      id: sbUser.id,
      email: sbUser.email || '',
      name: sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0],
      role: sbUser.user_metadata?.role || UserRole.USER,
      subscription: sbUser.user_metadata?.subscription || SubscriptionPlan.STARTER,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
          
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
            <Route path="/env-debug" element={<EnvDebug />} />
            <Route path="/debug" element={<DebugPage />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />
            <Route path="*" element={<NotFound />} />

            {/* Dashboard with nested routes */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            >
              {/* <Route index element={<DashboardOverview user={user} />} /> */}
              <Route path="/dashboard" element={<DashboardWrapper />} />

              <Route path="ai-chat" element={<AIChatPanel />} />
              <Route path="data-upload" element={<DataUpload />} />
              <Route path="insights" element={<InsightsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="billing" element={<BillingSettings user={user} />} />
              <Route path="subscription" element={<SubscriptionAccount user={user} />} />

            </Route>
            
            <Route 
              path="/admin/*" 
              element={user?.role === UserRole.ADMIN ? <AdminPanel /> : <Navigate to="/" />} 
            />
          </Routes>
          {/* <button
            onClick={() => {
              console.log('=== ENVIRONMENT DEBUG ===');
              console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
              console.log('Current URL:', window.location.href);
              console.log('Build Mode:', import.meta.env.MODE);
              
              // Test backend
              fetch(`${import.meta.env.VITE_API_URL}/api/health`)
                .then(r => r.json())
                .then(data => console.log('Backend:', data))
                .catch(err => console.error('Backend Error:', err));
            }}
            style={{
              position: 'fixed',
              bottom: '10px',
              right: '10px',
              padding: '5px 10px',
              fontSize: '12px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 9999
            }}
          >
            🔧 Debug
          </button>
           */}
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;