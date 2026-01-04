import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import { User, UserRole, SubscriptionPlan } from './types';
import { supabase } from './lib/supabase';
import CheckoutPage from './pages/CheckoutPage';
import DashboardOverview from './components/dashboard/DashboardOverview';
import AIChatPanel from './components/dashboard/AIChatPanel';
import DataUpload from './components/dashboard/DataUpload';
import InsightsPage from './components/dashboard/InsightsPage';
import ReportsPage from './components/dashboard/ReportsPage';
import BillingSettings from './components/dashboard/BillingSettings';
import SubscriptionAccount from './components/dashboard/SubscriptionAccount';
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
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
      subscription: sbUser.user_metadata?.subscription || SubscriptionPlan.FREE,
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
            
            {/* Dashboard with nested routes */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} 
            >
              <Route index element={<DashboardOverview user={user} />} />
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
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;