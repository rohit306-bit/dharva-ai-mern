import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DharvaLogo from '../ui/DharvaLogo';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Platform',    id: 'products'      },
  { label: 'How It Works', id: 'features'     },
  { label: 'Use Cases',   id: 'use-cases'     },
  { label: 'Pricing',     id: 'pricing'       },
  { label: 'Roadmap',     id: 'launches'      },
];

const Navbar = ({ onOpenContact }) => {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [activeId, setActiveId]       = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Scroll shadow + progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const bar = document.getElementById('nav-progress');
      if (bar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };
  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <>
      {/* ── Main Nav ── */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        {/* Scroll progress bar */}
        <div className="nav-progress" id="nav-progress" />

        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <DharvaLogo size={34} />
            <span className="nav-logo-text">
              DHARVA <span className="nav-logo-sub">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeId === link.id ? 'nav-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="nav-cta">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-ghost nav-btn-sm">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                  Dashboard
                </Link>
                <div className="nav-user-menu">
                  <div className="nav-user-avatar" title={user?.name}>{userInitial}</div>
                  <button className="btn btn-ghost nav-btn-sm" onClick={handleLogout}>Sign Out</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost nav-btn-sm">Sign In</Link>
                <button className="btn btn-primary nav-btn-sm" onClick={onOpenContact}>
                  Request Demo
                </button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <span className={`hamburger ${isMobileOpen ? 'hamburger--open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <div className={`mobile-overlay ${isMobileOpen ? 'mobile-overlay--open' : ''}`}>
        <div className="mobile-nav-inner">
          <div className="mobile-nav-header">
            <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
              <DharvaLogo size={30} />
              <span className="nav-logo-text">DHARVA <span className="nav-logo-sub">AI</span></span>
            </Link>
            <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mobile-links">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`mobile-link ${activeId === link.id ? 'mobile-link--active' : ''}`}
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              >
                <span>{link.label}</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </nav>

          <div className="mobile-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-ghost" onClick={() => setMobileOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>Dashboard</Link>
                <button className="btn btn-primary" onClick={() => { setMobileOpen(false); handleLogout(); }} style={{ width: '100%', justifyContent: 'center' }}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={() => setMobileOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>Sign In</Link>
                <button className="btn btn-primary" onClick={() => { setMobileOpen(false); onOpenContact(); }} style={{ width: '100%', justifyContent: 'center' }}>Request Demo</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
