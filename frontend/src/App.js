import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Sections — existing
import Hero from './components/sections/Hero';
import { Marquee, Products, Features } from './components/sections/ProductsAndFeatures';
import Launches from './components/sections/Launches';
import { APIShowcase, Pricing, CTA } from './components/sections/Sections';

// Sections — new
import Problem from './components/sections/Problem';
import UseCases from './components/sections/UseCases';
import Testimonials from './components/sections/Testimonials';

// UI
import ContactModal from './components/ui/ContactModal';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// ═══════════ LANDING PAGE ═══════════
function LandingPage({ onOpenContact }) {
  const { state } = useAppContext();

  if (state.loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <div className="loading-text">Initializing Dharva AI...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar onOpenContact={onOpenContact} />
      <Hero onOpenContact={onOpenContact} />
      <Marquee />
      <Problem />
      <Products products={state.products} />
      <div className="glow-line" />
      <Features />
      <UseCases />
      <Launches launches={state.launches} />
      <div className="glow-line" />
      <APIShowcase />
      <Pricing pricing={state.pricing} onOpenContact={onOpenContact} />
      <Testimonials />
      <div className="glow-line" />
      <CTA onOpenContact={onOpenContact} />
      <Footer />
    </>
  );
}

// ═══════════ HOME WRAPPER ═══════════
function HomeWrapper() {
  const [isContactOpen, setContactOpen] = useState(false);
  return (
    <AppProvider>
      <LandingPage onOpenContact={() => setContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
    </AppProvider>
  );
}

// ═══════════ APP ROOT ═══════════
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0b0f18',
              color: '#e2e8f0',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#00e5c8', secondary: '#0b0f18' } },
            error: { iconTheme: { primary: '#f87171', secondary: '#0b0f18' } },
          }}
        />
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
