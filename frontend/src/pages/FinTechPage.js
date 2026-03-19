import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useReveal } from '../hooks';
import DharvaLogo from '../components/ui/DharvaLogo';
import ContactModal from '../components/ui/ContactModal';

const PAIN_POINTS = [
  {
    icon: '📜',
    title: 'RBI AI Governance Directives',
    desc: 'The Reserve Bank of India expects documented evidence of AI model oversight in credit, fraud, and customer-facing systems. Most banks have none.',
  },
  {
    icon: '⚖',
    title: 'Discriminatory Lending Risk',
    desc: 'Credit scoring models routinely show demographic bias — higher rejection rates for women, minorities, or specific geographies. Each violation is a lawsuit.',
  },
  {
    icon: '🕵️',
    title: 'Fraud Model Opacity',
    desc: 'When a fraud detection model flags legitimate transactions, you need to explain why. Regulators and customers demand explainability — not a black box.',
  },
  {
    icon: '📊',
    title: 'EU AI Act High-Risk Classification',
    desc: 'Credit scoring is explicitly listed as high-risk under Article 6 of the EU AI Act. Non-compliance fines start at €15M.',
  },
];

const METRICS = [
  { value: '2.4M', label: 'Lending decisions monitored daily by Dharva customers' },
  { value: '34%', label: 'Average reduction in bias-related adverse action complaints' },
  { value: '6 weeks', label: 'Average time to EU AI Act compliance documentation' },
  { value: '€2.4M', label: 'Average regulatory fines avoided per enterprise' },
];

const USE_CASES = [
  {
    title: 'Credit Scoring Compliance',
    desc: 'Monitor every credit decision for demographic parity, equalized odds, and disparate impact. Auto-generate RBI and EU AI Act-aligned audit reports on demand.',
    frameworks: ['RBI AI Governance', 'EU AI Act Article 9', 'EEOC Regulation B'],
  },
  {
    title: 'Fraud Detection Explainability',
    desc: 'Log every fraud flag with full decision context. When a customer or regulator challenges a decision, produce an explainable, auditable record in seconds.',
    frameworks: ['SEBI Algo Trading Rules', 'RBI Fraud Risk Framework', 'PCI DSS'],
  },
  {
    title: 'KYC / AML AI Oversight',
    desc: 'AI-powered KYC and AML systems make high-stakes decisions at scale. Dharva ensures every decision is monitored, explainable, and defensible.',
    frameworks: ['PMLA Compliance', 'FATF AI Guidelines', 'RBI KYC Norms'],
  },
];

function PainCard({ point, index }) {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="vertical-pain-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all .55s var(--ease) ${index * 0.1}s`,
      }}
    >
      <div className="vertical-pain-icon">{point.icon}</div>
      <h4>{point.title}</h4>
      <p>{point.desc}</p>
    </div>
  );
}

export default function FinTechPage() {
  const [isContactOpen, setContactOpen] = useState(false);
  const [headerRef, headerVisible] = useReveal();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <nav className="navbar navbar--scrolled" style={{ position: 'relative' }}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <DharvaLogo size={34} />
            <span className="nav-logo-text">DHARVA <span className="nav-logo-sub">AI</span></span>
          </Link>
          <div className="nav-cta">
            <Link to="/" className="btn btn-ghost nav-btn-sm">← Back</Link>
            <button className="btn btn-primary nav-btn-sm" onClick={() => setContactOpen(true)}>
              Connect in 5 minutes
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all .6s var(--ease)',
              maxWidth: 820,
            }}
          >
            <div className="section-label vertical-label vertical-label--fintech">
              <span>🏦</span> Fintech & Banking
            </div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Your AI approves or rejects<br />
              <em className="hero-em">millions of loans.</em><br />
              <span className="hero-dim">Can you prove it wasn't biased?</span>
            </h1>
            <p className="section-desc">
              Credit AI, fraud detection, KYC, and AML systems are classified as high-risk under
              the EU AI Act and subject to RBI governance requirements. Dharva gives you the
              monitoring, audit trails, and compliance documentation to prove your AI is fair,
              accurate, and accountable — before regulators demand it.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => setContactOpen(true)}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get a Fintech Demo
              </button>
              <Link to="/product" className="btn btn-ghost">See the platform →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '3rem', background: 'var(--bg2)' }}>
        <div className="container">
          <div className="vertical-metrics">
            {METRICS.map((m, i) => (
              <div key={i} className="vertical-metric">
                <div className="vertical-metric-val">{m.value}</div>
                <div className="vertical-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="section">
        <div className="container">
          <div className="section-label">The Regulatory Reality</div>
          <h2 className="section-title">
            Four compliance risks every<br />
            <span className="gradient-text">fintech AI team is sitting on.</span>
          </h2>
          <div className="vertical-pain-grid">
            {PAIN_POINTS.map((point, i) => (
              <PainCard key={i} point={point} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="section-label">Use Cases</div>
          <h2 className="section-title">
            How Dharva protects<br />
            <span className="gradient-text">fintech AI systems.</span>
          </h2>
          <div className="vertical-usecases">
            {USE_CASES.map((uc, i) => (
              <UseCaseCard key={i} uc={uc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section">
        <div className="container">
          <div className="vertical-testimonial">
            <div className="vertical-testi-quote">
              "DHARVA gave us the audit trail we needed to pass our EU AI Act assessment
              in 6 weeks. What would have taken a team of lawyers months was automated.
              Every credit decision in our portfolio is now monitored and documented."
            </div>
            <div className="vertical-testi-footer">
              <div className="testi-avatar" style={{ background: '#00e5c822', color: '#00e5c8' }}>SC</div>
              <div>
                <div className="testi-name">Dr. Sarah Chen</div>
                <div className="testi-role">Chief AI Officer, NexaBank Group</div>
              </div>
              <div className="testi-metric" style={{ color: '#00e5c8' }}>6 weeks to EU AI Act compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>
            Be audit-ready for RBI and EU AI Act.<br />
            <span className="gradient-text">Starting today.</span>
          </h2>
          <p>Connect your credit scoring or fraud detection system and get your first compliance report in 5 minutes.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => setContactOpen(true)} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Connect in 5 minutes
            </button>
            <Link to="/pricing" className="btn btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

function UseCaseCard({ uc, index }) {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="vertical-usecase-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all .55s var(--ease) ${index * 0.1}s`,
      }}
    >
      <h4>{uc.title}</h4>
      <p>{uc.desc}</p>
      <div className="vertical-frameworks">
        {uc.frameworks.map((f, i) => (
          <span key={i} className="vertical-framework-tag">{f}</span>
        ))}
      </div>
    </div>
  );
}
