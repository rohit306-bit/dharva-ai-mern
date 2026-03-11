import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DharvaLogo from '../ui/DharvaLogo';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Overview', icon: '▦', exact: true },
  { path: '/dashboard/ai-systems', label: 'AI Registry', icon: '⬡' },
  { path: '/dashboard/impact', label: 'Impact Monitor', icon: '◈' },
  { path: '/dashboard/score-engine', label: 'Score Engine', icon: '◉' },
  { path: '/dashboard/compliance', label: 'Compliance', icon: '◳' },
  { path: '/dashboard/audit', label: 'Audit Trail', icon: '≡' },
  { path: '/dashboard/regulatory', label: 'Regulatory', icon: '⊞' },
];

export default function DashboardLayout({ children, activeModule, setActiveModule }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const orgName = user?.organization?.name || 'My Organization';
  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <div className="dash-root">
      {/* Sidebar */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'dash-sidebar--open' : ''}`}>
        <div className="dash-sidebar-header">
          <div className="dash-brand">
            <DharvaLogo size={28} />
            <span className="dash-brand-name">DHARVA</span>
          </div>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="dash-org-badge">
          <div className="dash-org-icon">{orgName[0]}</div>
          <div className="dash-org-info">
            <span className="dash-org-name">{orgName}</span>
            <span className="dash-org-plan">{user?.organization?.plan || 'free'} plan</span>
          </div>
        </div>

        <nav className="dash-nav">
          <p className="dash-nav-section-label">Platform</p>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              className={`dash-nav-item ${activeModule === item.path ? 'dash-nav-item--active' : ''}`}
              onClick={() => { setActiveModule(item.path); setSidebarOpen(false); }}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.path === '/dashboard/impact' && (
                <span className="dash-nav-badge">Live</span>
              )}
            </button>
          ))}
        </nav>

        <div className="dash-sidebar-footer">
          <div className="dash-user-info">
            <div className="dash-user-avatar">{userInitial}</div>
            <div className="dash-user-details">
              <span className="dash-user-name">{user?.name || 'User'}</span>
              <span className="dash-user-role">{user?.role || 'analyst'}</span>
            </div>
          </div>
          <button className="dash-logout-btn" onClick={handleLogout} title="Logout">
            ⏻
          </button>
        </div>
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="dash-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="dash-main">
        {/* Top bar */}
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="dash-topbar-title">
            {NAV_ITEMS.find((n) => n.path === activeModule)?.label || 'Dashboard'}
          </div>
          <div className="dash-topbar-actions">
            <div className="dash-status-pill">
              <span className="dash-status-dot" />
              System Nominal
            </div>
            <div className="dash-user-avatar dash-topbar-avatar">{userInitial}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="dash-content">
          {children}
        </main>
      </div>
    </div>
  );
}
