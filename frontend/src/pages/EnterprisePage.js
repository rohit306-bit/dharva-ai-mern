import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useReveal } from '../hooks';
import DharvaLogo from '../components/ui/DharvaLogo';
import ContactModal from '../components/ui/ContactModal';

const PAIN_POINTS = [
  {
    icon: '🇪🇺',
    title: 'EU AI Act Compliance',
    desc: 'The EU AI Act is now enforced. If your SaaS product uses AI in high-risk categories, you need conformity assessments, technical documentation, and human oversight. Fines reach €35M.',
  },
  {
    icon: '🤖',
    title: 'LLM Hallucination at Scale',
    desc: 'Enterprise SaaS products embedding GPT-4, Claude, or custom LLMs face a silent risk: your AI confidently answers incorrectly. At enterprise scale, this is a product liability issue.',
  },
  {
    icon: '📊',
    title: 'Customer Data + AI = Liability',
    desc: 'When your AI makes decisions using customer data — recommendations, classifications, filters — you\'re responsible for those decisions. Do you have audit trails?',
  },
  {
    icon: '🔒',
    title: 'Enterprise Procurement Requirements',
    desc: 'Fortune 500 customers increasingly require AI governance certifications before signing contracts. Without documented AI oversight, you\'re losing deals to compliant competitors.',
  },
];

const METRICS = [
  { value: '€2.4M', label: 'Average EU AI Act fines avoided by Dharva customers' },
  { value: '41%', label: 'Reduction in AI-related customer complaints' },
  { value: '2 weeks', label: 'To EU AI Act technical documentation' },
  { value: '100%', label: 'Deal win rate improvement when showing compliance cert' },
];

const USE_CASES = [
  {
    title: 'LLM Product Observability',
    desc: 'Monitor every LLM interaction in your SaaS product for hallucinations, unsafe outputs, and off-policy responses. Detect issues before customers report them.',
    frameworks: ['EU AI Act', 'ISO 42001', 'NIST AI RMF'],
  },
  {
    title: 'Enterprise AI Governance',
    desc: 'Provide your enterprise customers with evidence of AI oversight: audit trails, fairness reports, and compliance certifications that satisfy procurement and legal requirements.',
    frameworks: ['EU AI Act Conformity', 'SOC 2 AI Controls', 'ISO 42001 Certification'],
  },
  {
    title: 'AI Feature Compliance',
    desc: 'Every new AI feature ships with compliance documentation. Dharva auto-generates the technical documentation required under EU AI Act Article 11 for each deployed system.',
    frameworks: ['EU AI Act Article 11', 'GDPR AI Provisions', 'DSA Compliance'],
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

export default function EnterprisePage() {
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
            <div className="section-label vertical-label vertical-label--enterprise">
              <span>🏢</span> Enterprise SaaS
            </div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              You're shipping AI features<br />
              <em className="hero-em">into enterprise accounts.</em><br />
              <span className="hero-dim">Are you EU AI Act compliant?</span>
            </h1>
            <p className="section-desc">
              The EU AI Act is enforced. Your enterprise customers are asking for AI governance
              certifications before signing. Your LLMs are hallucinating in production. Dharva
              gives SaaS companies the observability, audit trails, and compliance documentation
              to close enterprise deals and stay ahead of regulation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => setContactOpen(true)}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get an Enterprise Demo
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
          <div className="section-label">The Enterprise Reality</div>
          <h2 className="section-title">
            Four AI compliance risks<br />
            <span className="gradient-text">costing SaaS companies deals and fines.</span>
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
            <span className="gradient-text">enterprise SaaS AI systems.</span>
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
              "DHARVA's algorithmic accountability report was the only tool that gave us exactly
              what enterprise procurement demanded. It turned an AI governance checkbox into
              a competitive differentiator. We closed 3 enterprise accounts citing our Dharva
              compliance certification."
            </div>
            <div className="vertical-testi-footer">
              <div className="testi-avatar" style={{ background: '#facc1522', color: '#facc15' }}>MW</div>
              <div>
                <div className="testi-name">Marcus Weber</div>
                <div className="testi-role">Chief Product Officer, TechForce GmbH</div>
              </div>
              <div className="testi-metric" style={{ color: '#facc15' }}>€2.4M in fines avoided</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>
            Turn EU AI Act compliance<br />
            <span className="gradient-text">into a sales advantage.</span>
          </h2>
          <p>Connect your AI product and get your first EU AI Act conformity report in under 5 minutes.</p>
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
