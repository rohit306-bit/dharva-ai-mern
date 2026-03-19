import React, { useState, useEffect } from 'react';
import { useScrollTo } from '../../hooks';

const STATS = [
  { value: '73%', label: 'Enterprises have zero AI audit infrastructure', sub: 'McKinsey 2024' },
  { value: '$48M', label: 'Average cost of an AI compliance failure', sub: 'including fines & legal' },
  { value: '840+', label: 'AI regulatory violations filed in EU since 2023', sub: 'and accelerating' },
  { value: '3 days', label: 'To detect the first AI risk with Dharva', sub: 'avg onboarding time' },
];

const TRUST_LOGOS = [
  'NexaBank Group', 'Meridian Health', 'Axiom Insurance', 'TechForce GmbH', 'Atlas Capital',
];

// Animated risk score dashboard preview
const DashboardPreview = () => {
  const [scores, setScores] = useState([78, 42, 91, 23, 65]);
  useEffect(() => {
    const interval = setInterval(() => {
      setScores(prev => prev.map(s => Math.max(10, Math.min(99, s + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 8)))));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (score) => {
    if (score < 30) return '#4ade80';
    if (score < 60) return '#facc15';
    if (score < 80) return '#fb923c';
    return '#f43f5e';
  };

  const getRiskLabel = (score) => {
    if (score < 30) return 'LOW';
    if (score < 60) return 'MODERATE';
    if (score < 80) return 'HIGH';
    return 'CRITICAL';
  };

  const systems = [
    { name: 'loan-approval-v3', type: 'Credit Scoring' },
    { name: 'fraud-detect-ml', type: 'Fraud Detection' },
    { name: 'hire-screen-ai', type: 'Hiring Filter' },
    { name: 'clinical-triage', type: 'Medical Triage' },
    { name: 'pricing-engine', type: 'Dynamic Pricing' },
  ];

  return (
    <div className="hero-dashboard">
      <div className="hero-dash-header">
        <div className="hero-dash-title">
          <span className="hero-dash-dot" />
          <span>AI Risk Monitor — Live</span>
        </div>
        <div className="hero-dash-meta">
          <span className="hero-dash-badge hero-dash-badge--alert">2 Critical</span>
          <span className="hero-dash-time">Updated 2s ago</span>
        </div>
      </div>
      <div className="hero-dash-table">
        {systems.map((sys, i) => (
          <div key={i} className="hero-dash-row" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="hero-dash-sys">
              <div className="hero-dash-sys-name">{sys.name}</div>
              <div className="hero-dash-sys-type">{sys.type}</div>
            </div>
            <div className="hero-dash-score-bar">
              <div
                className="hero-dash-fill"
                style={{
                  width: `${scores[i]}%`,
                  background: getRiskColor(scores[i]),
                  transition: 'width 1.4s cubic-bezier(.16,1,.3,1)',
                  boxShadow: `0 0 8px ${getRiskColor(scores[i])}66`,
                }}
              />
            </div>
            <div className="hero-dash-risk" style={{ color: getRiskColor(scores[i]) }}>
              {getRiskLabel(scores[i])}
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dash-footer">
        <span>5 systems monitored · 48.2K decisions today</span>
        <span className="hero-dash-compliance">Compliance: 94%</span>
      </div>

      {/* Floating alert card */}
      <div className="hero-float-alert">
        <div className="hero-float-alert-icon">⚠</div>
        <div>
          <div className="hero-float-alert-title">Bias Drift Detected</div>
          <div className="hero-float-alert-sub">loan-approval-v3 · demographic_parity violation</div>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ onOpenContact }) => {
  const scrollTo = useScrollTo();

  return (
    <section className="hero">
      {/* Ambient background */}
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-grid" />
      </div>

      {/* Floating network nodes */}
      <div className="hero-nodes" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero-node hero-node--${i + 1}`} />
        ))}
        <svg className="hero-connectors" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <line x1="120" y1="80"  x2="380" y2="200" stroke="rgba(0,229,200,.12)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="380" y1="200" x2="620" y2="120" stroke="rgba(0,229,200,.12)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="380" y1="200" x2="500" y2="420" stroke="rgba(139,92,246,.12)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="200" y1="380" x2="500" y2="420" stroke="rgba(0,229,200,.08)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="700" y1="350" x2="500" y2="420" stroke="rgba(139,92,246,.08)" strokeWidth="1" strokeDasharray="4 6"/>
        </svg>
      </div>

      <div className="container hero-body">
        {/* Left: Copy */}
        <div className="hero-copy">
          <div className="hero-badge-wrap hero-anim hero-anim--1">
            <span className="badge">AI Governance · Observability · Accountability</span>
          </div>

          <h1 className="hero-headline hero-anim hero-anim--2">
            You're running AI systems<br />
            that make <em className="hero-em">thousands</em> of decisions<br />
            <span className="hero-dim">per day. Do you know if any<br />of them were wrong?</span>
          </h1>

          <p className="hero-sub hero-anim hero-anim--3">
            Dharva is the control layer for your AI systems — monitoring every decision,
            detecting hallucinations, bias, and drift in real time, and making your AI
            audit-ready before regulators come knocking.
          </p>

          <div className="hero-actions hero-anim hero-anim--4">
            <button className="btn btn-primary hero-cta-primary" onClick={onOpenContact}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Connect in 5 minutes
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('demo')}>
              Watch 60s demo
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
              </svg>
            </button>
          </div>

          {/* Trust logos */}
          <div className="hero-trust hero-anim hero-anim--5">
            <span className="hero-trust-label">Trusted by teams at</span>
            <div className="hero-trust-logos">
              {TRUST_LOGOS.map((name) => (
                <div key={name} className="hero-trust-chip">{name}</div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="hero-stats hero-anim hero-anim--5" style={{ marginTop: '2rem' }}>
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Dashboard Preview */}
        <div className="hero-visual hero-anim hero-anim--3">
          <div className="hero-window-glow" />
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

export default Hero;
