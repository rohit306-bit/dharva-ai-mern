import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useReveal } from '../hooks';
import DharvaLogo from '../components/ui/DharvaLogo';
import ContactModal from '../components/ui/ContactModal';

const PAIN_POINTS = [
  {
    icon: '🏥',
    title: 'CDSCO AI Medical Device Oversight',
    desc: 'The Central Drugs Standard Control Organisation is formalizing AI medical device regulations. Clinical AI without documented governance will not pass certification.',
  },
  {
    icon: '🏨',
    title: 'NABH Accreditation Standards',
    desc: 'NABH-accredited hospitals using AI for clinical decisions must demonstrate safety, equity, and oversight. Undocumented AI is an accreditation risk.',
  },
  {
    icon: '⚠️',
    title: 'Patient Safety & Liability',
    desc: 'A biased triage AI that deprioritizes a demographic group is a patient safety issue and a negligence lawsuit. You need to know if it\'s happening — in real time.',
  },
  {
    icon: '🔒',
    title: 'HIPAA AI Audit Requirements',
    desc: 'HIPAA-covered entities using AI in clinical decisions face audit requirements for AI system behavior. Most have no audit trail.',
  },
];

const METRICS = [
  { value: '61%', label: 'Improvement in patient safety flags detected' },
  { value: '7', label: 'Critical bias issues detected in clinical triage systems' },
  { value: '99%', label: 'Regulatory readiness score post-Dharva deployment' },
  { value: '3 days', label: 'Time to NABH AI governance documentation' },
];

const USE_CASES = [
  {
    title: 'Clinical Triage AI Monitoring',
    desc: 'Ensure your triage AI treats all patient demographics equitably. Detect systematic deprioritization of any demographic group before it becomes a patient safety incident.',
    frameworks: ['NABH Standards', 'CDSCO AI Device Rules', 'WHO AI Ethics'],
  },
  {
    title: 'Diagnostic AI Oversight',
    desc: 'Monitor diagnostic AI models for performance drift, output confidence, and demographic bias. Log every diagnosis for complete clinical audit trails.',
    frameworks: ['CDSCO SaMD Guidelines', 'HIPAA Audit', 'ISO 14971 Risk Management'],
  },
  {
    title: 'Medication & Dosage AI Safety',
    desc: 'AI-powered medication recommendations must be explainable and auditable. Dharva logs every recommendation with full context for clinical review.',
    frameworks: ['CDSCO Pharma AI', 'FDA SaMD Guidance', 'EU MDR'],
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

export default function HealthtechPage() {
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
            <div className="section-label vertical-label vertical-label--health">
              <span>🏥</span> Healthtech & Clinical AI
            </div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Your clinical AI is making<br />
              <em className="hero-em">life-or-death decisions.</em><br />
              <span className="hero-dim">Is anyone watching?</span>
            </h1>
            <p className="section-desc">
              Clinical AI — for triage, diagnostics, and medication — carries the highest risk of
              any AI application. CDSCO is formalizing AI medical device regulations. NABH
              accreditation standards increasingly require AI oversight. Dharva gives healthcare
              organizations the patient safety monitoring, audit trails, and compliance documentation
              to ensure AI is helping — not harming.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => setContactOpen(true)}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get a Healthcare Demo
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
            Four risks every healthcare AI<br />
            <span className="gradient-text">team cannot afford to ignore.</span>
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
            <span className="gradient-text">clinical AI systems.</span>
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
              "We discovered bias patterns in our triage system that we had no idea existed.
              The fairness metrics saved us from a serious regulatory violation — and from
              systematically disadvantaging elderly patients. DHARVA is now part of our
              clinical AI safety protocol."
            </div>
            <div className="vertical-testi-footer">
              <div className="testi-avatar" style={{ background: '#4ade8022', color: '#4ade80' }}>JO</div>
              <div>
                <div className="testi-name">James Okonkwo</div>
                <div className="testi-role">VP of Digital Health, Meridian Health Systems</div>
              </div>
              <div className="testi-metric" style={{ color: '#4ade80' }}>7 critical bias issues detected</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>
            Patient safety is not optional.<br />
            <span className="gradient-text">Neither is AI governance.</span>
          </h2>
          <p>Connect your clinical AI system and get your first patient safety and compliance report in 5 minutes.</p>
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
