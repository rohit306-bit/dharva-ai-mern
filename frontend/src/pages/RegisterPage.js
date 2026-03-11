import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DharvaLogo from '../components/ui/DharvaLogo';

const INDUSTRIES = [
  { value: 'banking', label: 'Banking & Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'hiring', label: 'HR & Hiring' },
  { value: 'trading', label: 'Trading & Investment' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'government', label: 'Government & Public Sector' },
  { value: 'other', label: 'Other' },
];

export default function RegisterPage() {
  const { register, isAuthenticated, isLoading, clearError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    organizationName: '',
    industry: 'other',
  });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    clearError();
    setLocalError('');
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, organizationName } = form;
    if (!name || !email || !password || !organizationName) {
      setLocalError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    setSubmitting(true);
    const result = await register(form);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
      </div>

      <div className="auth-container">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <Link to="/" className="auth-logo-link">
              <DharvaLogo size={40} />
              <span className="auth-logo-name">DHARVA</span>
            </Link>
            <h1 className="auth-title">Start for free</h1>
            <p className="auth-subtitle">AI Impact Intelligence Platform for your enterprise</p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {localError && (
              <div className="auth-error-banner">
                <span>⚠</span> {localError}
              </div>
            )}

            <div className="auth-field-row">
              <div className="auth-field">
                <label className="auth-label">Full name</label>
                <input
                  type="text"
                  name="name"
                  className="auth-input"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Work email</label>
                <input
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label">Organization name</label>
              <input
                type="text"
                name="organizationName"
                className="auth-input"
                placeholder="Acme Corp"
                value={form.organizationName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Industry</label>
              <select
                name="industry"
                className="auth-input auth-select"
                value={form.industry}
                onChange={handleChange}
              >
                {INDUSTRIES.map((i) => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                type="password"
                name="password"
                className="auth-input"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-btn-primary"
              disabled={submitting || isLoading}
            >
              {submitting ? (
                <span className="auth-btn-loading">
                  <span className="auth-spinner" />
                  Creating account...
                </span>
              ) : (
                'Create Free Account'
              )}
            </button>

            <p className="auth-terms">
              By creating an account you agree to our{' '}
              <span className="auth-link">Terms of Service</span> and{' '}
              <span className="auth-link">Privacy Policy</span>.
            </p>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
            <Link to="/" className="auth-back-link">
              ← Back to website
            </Link>
          </div>
        </div>

        <div className="auth-trust">
          <span>🔒 SOC 2 Type II</span>
          <span>•</span>
          <span>🛡 ISO 27001</span>
          <span>•</span>
          <span>⚡ 99.97% Uptime</span>
        </div>
      </div>
    </div>
  );
}
