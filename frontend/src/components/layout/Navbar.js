import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DharvaLogo from '../ui/DharvaLogo';
import { useScrollTo } from '../../hooks';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onOpenContact }) => {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTo = useScrollTo();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', id: 'features' },
    { label: 'Use Cases', id: 'use-cases' },
    { label: 'Docs', id: 'docs' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Security', id: 'security' },
  ];

  const handleNav = (id) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <>
      <nav className="navbar" style={{ borderBottomColor: isScrolled ? 'rgba(30,41,59,.8)' : undefined }}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <DharvaLogo />
            Dharva AI
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); handleNav(link.id); }}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-cta">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-ghost">
                  ▦ Dashboard
                </Link>
                <div className="nav-user-menu">
                  <div className="nav-user-avatar">{userInitial}</div>
                  <button className="btn btn-ghost nav-logout" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          <button className="menu-toggle" onClick={() => setMobileOpen(true)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="mobile-nav">
          <button className="mobile-close" onClick={() => setMobileOpen(false)}>
            &times;
          </button>
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); handleNav(link.id); }}>
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>
                ▦ Dashboard
              </Link>
              <button className="btn btn-primary" onClick={() => { setMobileOpen(false); handleLogout(); }}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                Get Started Free
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
