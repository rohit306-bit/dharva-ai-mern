import { Link } from 'react-router-dom';
import { useReveal } from '../hooks';
import DharvaLogo from '../components/ui/DharvaLogo';
import ContactModal from '../components/ui/ContactModal';
import { useState } from 'react';

const RISK_CATEGORIES = [
  {
    id: 'hallucination',
    icon: '🧠',
    color: '#f43f5e',
    title: 'Hallucination Detection',
    desc: 'Dharva monitors every LLM output against ground truth and factuality signals. When your model confidently outputs false information, you\'re alerted before it reaches a user — or a regulator.',
    items: ['Factual consistency scoring', 'Fabricated citation detection', 'Confidence calibration monitoring', 'RAG groundedness checks'],
  },
  {
    id: 'bias',
    icon: '⚖',
    color: '#fb923c',
    title: 'Bias & Fairness Monitoring',
    desc: 'Real-time demographic parity analysis across every AI decision. Automatically surfaces disparate impact, equalized odds violations, and intersectionality patterns across protected groups.',
    items: ['Demographic parity analysis', 'Equalized odds monitoring', 'Intersectional fairness metrics', 'EEOC / EU AI Act alignment'],
  },
  {
    id: 'drift',
    icon: '📉',
    color: '#facc15',
    title: 'Model Drift Detection',
    desc: 'As data distributions shift, your model degrades silently. Dharva tracks feature drift, output distribution changes, and performance degradation — alerting you before wrong decisions accumulate.',
    items: ['Feature distribution monitoring', 'Output drift alerts', 'Concept drift detection', 'Automated retraining triggers'],
  },
  {
    id: 'unsafe',
    icon: '🚨',
    color: '#8b5cf6',
    title: 'Unsafe Output Prevention',
    desc: 'Policy-based content guardrails that intercept harmful, toxic, or off-policy AI outputs before they reach end users. Configurable per use case, model, and regulatory context.',
    items: ['Toxicity & harm scoring', 'PII leak detection', 'Off-policy output flagging', 'Custom content policies'],
  },
  {
    id: 'compliance',
    icon: '🔒',
    color: '#3b82f6',
    title: 'Compliance Automation',
    desc: 'Auto-generate audit-ready documentation for EU AI Act, RBI AI directives, CDSCO, NABH, HIPAA, and EEOC. When a regulator asks for evidence, you export a report in 30 seconds.',
    items: ['EU AI Act Article 9 documentation', 'RBI AI governance reports', 'CDSCO medical AI compliance', 'HIPAA AI audit trails'],
  },
];

const BEFORE_AFTER = [
  {
    before: 'Compliance team spends 3 months manually documenting AI decisions for regulators',
    after: 'Auto-generated audit report ready in 30 seconds, covering every decision in the period',
  },
  {
    before: 'Bias discovered during a lawsuit — 8 months after the discriminatory decisions were made',
    after: 'Real-time bias alert within milliseconds of the first pattern emerging',
  },
  {
    before: 'Model degradation noticed when customer complaints spike — 6 weeks of bad decisions',
    after: 'Drift detected on day 1, alert triggered, team notified before users are affected',
  },
  {
    before: 'LLM hallucination in a financial report goes undetected, triggers regulatory inquiry',
    after: 'Every LLM output scored for factuality — hallucinations flagged before publication',
  },
];

function RiskCard({ risk, index }) {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="product-risk-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `all .55s var(--ease) ${index * 0.1}s`,
        '--risk-color': risk.color,
        borderTop: `2px solid ${risk.color}`,
      }}
    >
      <div className="product-risk-top">
        <div className="product-risk-icon" style={{ color: risk.color, background: risk.color + '18' }}>
          {risk.icon}
        </div>
        <h3 className="product-risk-title">{risk.title}</h3>
      </div>
      <p className="product-risk-desc">{risk.desc}</p>
      <ul className="product-risk-items">
        {risk.items.map((item, i) => (
          <li key={i}>
            <span style={{ color: risk.color }}>→</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductPage() {
  const [isContactOpen, setContactOpen] = useState(false);
  const [headerRef, headerVisible] = useReveal();
  const [archRef, archVisible] = useReveal();
  const [baRef, baVisible] = useReveal();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      {/* Navbar */}
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
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all .6s var(--ease)',
              maxWidth: 800,
            }}
          >
            <div className="section-label">The Platform</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              The control layer your<br />
              <span className="gradient-text">AI systems are missing.</span>
            </h1>
            <p className="section-desc">
              Dharva sits between your AI systems and the world. It monitors every decision,
              detects every risk, generates audit trails automatically — and makes your AI
              portfolio compliant with EU AI Act, RBI, CDSCO, and HIPAA without changing
              a single line of your model code.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => setContactOpen(true)}>
                Connect in 5 minutes
              </button>
              <Link to="/docs" className="btn btn-ghost">Read the docs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div
            ref={archRef}
            style={{
              opacity: archVisible ? 1 : 0,
              transform: archVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all .6s var(--ease)',
            }}
          >
            <div className="section-label">Architecture</div>
            <h2 className="section-title">Lightweight. Non-invasive. Production-ready.</h2>
            <p className="section-desc">
              Dharva is a governance middleware layer — not a replacement for your AI stack.
              It integrates via SDK or HTTP proxy, requires zero model changes, and scales
              to millions of decisions per day.
            </p>
          </div>

          <div className="arch-diagram">
            <div className="arch-col">
              <div className="arch-label">Your AI Systems</div>
              {['GPT-4 / LLM', 'Sklearn / XGBoost', 'Custom ML Model', 'Decision Engine'].map((s, i) => (
                <div key={i} className="arch-box arch-box--source">{s}</div>
              ))}
            </div>
            <div className="arch-arrow-col">
              <div className="arch-arrow-label">All decisions flow through</div>
              <div className="arch-arrow">→</div>
            </div>
            <div className="arch-col arch-col--center">
              <div className="arch-label arch-label--dharva">Dharva Control Layer</div>
              <div className="arch-dharva-box">
                <div className="arch-dharva-feature">🧠 Hallucination Detection</div>
                <div className="arch-dharva-feature">⚖ Bias Monitoring</div>
                <div className="arch-dharva-feature">📉 Drift Detection</div>
                <div className="arch-dharva-feature">🚨 Unsafe Output Filter</div>
                <div className="arch-dharva-feature">🔒 Compliance Engine</div>
                <div className="arch-dharva-feature">📋 Immutable Audit Trail</div>
              </div>
            </div>
            <div className="arch-arrow-col">
              <div className="arch-arrow-label">Verified decisions</div>
              <div className="arch-arrow">→</div>
            </div>
            <div className="arch-col">
              <div className="arch-label">Outputs & Governance</div>
              {['End Users', 'Regulators', 'Compliance Team', 'Board Dashboard'].map((s, i) => (
                <div key={i} className="arch-box arch-box--dest">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 Risk Categories */}
      <section className="section" id="risk-categories">
        <div className="container">
          <div className="section-label">5 AI Risk Categories</div>
          <h2 className="section-title">
            Every risk your AI system faces.<br />
            <span className="gradient-text">Dharva monitors all of them.</span>
          </h2>
          <p className="section-desc">
            Most AI monitoring tools watch system performance. Dharva watches what matters:
            whether your AI is trustworthy, fair, accurate, safe, and compliant.
          </p>
          <div className="product-risks-grid">
            {RISK_CATEGORIES.map((risk, i) => (
              <RiskCard key={risk.id} risk={risk} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div
            ref={baRef}
            style={{
              opacity: baVisible ? 1 : 0,
              transform: baVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all .6s var(--ease)',
            }}
          >
            <div className="section-label">The Transformation</div>
            <h2 className="section-title">
              What changes when you<br />
              <span className="gradient-text">deploy Dharva.</span>
            </h2>
          </div>
          <div className="ba-grid">
            <div className="ba-col-header ba-col-header--before">
              <span>⚠</span> Without Dharva
            </div>
            <div className="ba-col-header ba-col-header--after">
              <span>✓</span> With Dharva
            </div>
            {BEFORE_AFTER.map((item, i) => (
              <BeforeAfterRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>
            Stop flying blind.<br />
            <span className="gradient-text">See every AI risk in real time.</span>
          </h2>
          <p>Connect your first AI system in 5 minutes. No infrastructure changes. No contracts.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => setContactOpen(true)} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Connect in 5 minutes
            </button>
            <Link to="/docs" className="btn btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Read the quickstart
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

function BeforeAfterRow({ item, index }) {
  const [ref, isVisible] = useReveal();
  return (
    <>
      <div
        ref={ref}
        className="ba-cell ba-cell--before"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `all .5s var(--ease) ${index * 0.1}s`,
        }}
      >
        <span className="ba-x">✗</span> {item.before}
      </div>
      <div
        className="ba-cell ba-cell--after"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: `all .5s var(--ease) ${index * 0.1 + 0.05}s`,
        }}
      >
        <span className="ba-check">✓</span> {item.after}
      </div>
    </>
  );
}
