import React from 'react';

const SECURITY_FEATURES = [
  {
    icon: '🔐',
    title: 'JWT Authentication',
    desc: 'Stateless, signed tokens with configurable expiry. Role-based access control across admin, analyst, and viewer levels.',
    color: '#00e5c8',
  },
  {
    icon: '🏢',
    title: 'Multi-Tenant Isolation',
    desc: 'Every API request is scoped to your organization. Strict data isolation ensures no cross-tenant data leakage.',
    color: '#818cf8',
  },
  {
    icon: '🔒',
    title: 'Immutable Audit Logs',
    desc: 'SHA-256 hash chaining on every audit event. Tamper-proof records that satisfy regulatory evidence requirements.',
    color: '#4ade80',
  },
  {
    icon: '🛡',
    title: 'Security Headers',
    desc: 'Helmet.js enforces CSP, HSTS, X-Frame-Options, and XSS protection on every response.',
    color: '#facc15',
  },
  {
    icon: '⚡',
    title: 'Rate Limiting',
    desc: 'Configurable per-IP rate limiting with exponential backoff. DDoS protection built into every API route.',
    color: '#fb923c',
  },
  {
    icon: '🔑',
    title: 'Data Encryption',
    desc: 'bcrypt password hashing (cost factor 12). All sensitive data encrypted at rest and in transit via TLS 1.3.',
    color: '#f87171',
  },
];

const CERTIFICATIONS = [
  { name: 'SOC 2 Type II', icon: '◈', desc: 'Security, availability, confidentiality' },
  { name: 'ISO 27001', icon: '◳', desc: 'Information security management' },
  { name: 'GDPR Ready', icon: '⬡', desc: 'EU data protection compliant' },
  { name: 'HIPAA Ready', icon: '⊕', desc: 'Healthcare data standards' },
];

export default function SecuritySection() {
  return (
    <section className="security-section" id="security">
      <div className="security-inner">
        <div className="section-eyebrow">Enterprise Security</div>
        <h2 className="section-title">
          Security that meets{' '}
          <span className="text-accent">enterprise standards</span>
        </h2>
        <p className="section-subtitle">
          Built from the ground up for regulated industries. Every layer of DHARVA is designed to
          satisfy the compliance requirements of banking, healthcare, and government.
        </p>

        {/* Security Features Grid */}
        <div className="security-grid">
          {SECURITY_FEATURES.map((f, i) => (
            <div key={i} className="security-card" style={{ '--sec-color': f.color }}>
              <div className="security-card-icon">{f.icon}</div>
              <h3 className="security-card-title" style={{ color: f.color }}>{f.title}</h3>
              <p className="security-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Architecture Visual */}
        <div className="security-arch">
          <div className="security-arch-title">Defense in Depth Architecture</div>
          <div className="security-arch-layers">
            <div className="security-layer security-layer--1">
              <span className="security-layer-label">Client Layer</span>
              <span className="security-layer-detail">HTTPS/TLS 1.3 · CSP Headers · XSS Protection</span>
            </div>
            <div className="security-layer-arrow">↓</div>
            <div className="security-layer security-layer--2">
              <span className="security-layer-label">API Gateway</span>
              <span className="security-layer-detail">Rate Limiting · CORS · Helmet.js · Request Validation</span>
            </div>
            <div className="security-layer-arrow">↓</div>
            <div className="security-layer security-layer--3">
              <span className="security-layer-label">Auth Layer</span>
              <span className="security-layer-detail">JWT Verification · RBAC · Organization Scoping</span>
            </div>
            <div className="security-layer-arrow">↓</div>
            <div className="security-layer security-layer--4">
              <span className="security-layer-label">Data Layer</span>
              <span className="security-layer-detail">Encrypted Storage · Multi-Tenant Isolation · Audit Hash Chain</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="security-certs">
          {CERTIFICATIONS.map((c, i) => (
            <div key={i} className="security-cert-card">
              <span className="security-cert-icon">{c.icon}</span>
              <div className="security-cert-info">
                <span className="security-cert-name">{c.name}</span>
                <span className="security-cert-desc">{c.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
