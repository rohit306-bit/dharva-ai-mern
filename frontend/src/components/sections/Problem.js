import { useReveal } from '../../hooks';

const RISK_CATEGORIES = [
  {
    icon: '🧠',
    color: '#f43f5e',
    title: 'Hallucination',
    tag: 'HIGH RISK',
    tagColor: '#f43f5e',
    desc: 'Your LLM confidently outputs false facts, fabricated citations, or made-up data. It happens silently, at scale. In finance or healthcare, this is a liability.',
    stat: '23%',
    statLabel: 'of LLM responses contain factual errors',
  },
  {
    icon: '⚖',
    color: '#fb923c',
    title: 'Bias & Discrimination',
    tag: 'REGULATORY',
    tagColor: '#fb923c',
    desc: 'Your AI treats demographic groups differently. Whether in hiring, lending, or triage — discriminatory patterns trigger lawsuits and regulator scrutiny.',
    stat: '67%',
    statLabel: 'of enterprises have never run a bias audit',
  },
  {
    icon: '📉',
    color: '#facc15',
    title: 'Model Drift',
    tag: 'SILENT KILLER',
    tagColor: '#facc15',
    desc: 'The world changes. Your model doesn\'t. Over time, accuracy degrades — but without monitoring, you won\'t notice until decisions are already wrong.',
    stat: '4.2x',
    statLabel: 'performance drop in models after 6 months',
  },
  {
    icon: '🚨',
    color: '#8b5cf6',
    title: 'Unsafe Output',
    tag: 'BRAND RISK',
    tagColor: '#8b5cf6',
    desc: 'Harmful, toxic, or off-policy AI responses reaching end users. One incident goes viral. Your brand takes years to recover.',
    stat: '1 in 50',
    statLabel: 'AI interactions produces a harmful output',
  },
  {
    icon: '🔒',
    color: '#3b82f6',
    title: 'Compliance Failure',
    tag: 'EXISTENTIAL',
    tagColor: '#3b82f6',
    desc: 'EU AI Act. RBI AI guidelines. CDSCO regulations. If you can\'t produce an audit trail on demand, you\'re already non-compliant — and the fines are getting larger.',
    stat: '$48M',
    statLabel: 'average cost of an AI compliance failure',
  },
];

const RiskCard = ({ risk, index }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="risk-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `all .55s var(--ease) ${index * 0.08}s`,
        '--risk-color': risk.color,
      }}
    >
      <div className="risk-card-top">
        <div className="risk-card-icon" style={{ background: risk.color + '18', color: risk.color }}>
          {risk.icon}
        </div>
        <span className="risk-tag" style={{ color: risk.tagColor, background: risk.tagColor + '18' }}>
          {risk.tag}
        </span>
      </div>
      <h4 className="risk-card-title">{risk.title}</h4>
      <p className="risk-card-desc">{risk.desc}</p>
      <div className="risk-card-stat">
        <strong style={{ color: risk.color }}>{risk.stat}</strong>
        <span>{risk.statLabel}</span>
      </div>
    </div>
  );
};

export default function Problem() {
  const [headerRef, headerVisible] = useReveal();
  const [urgencyRef, urgencyVisible] = useReveal();

  return (
    <section className="prob-section" id="problem">
      <div className="container">

        {/* Header */}
        <div
          ref={headerRef}
          className="prob-header"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all .6s var(--ease)',
          }}
        >
          <div className="section-label">The Reality</div>
          <h2 className="section-title" style={{ maxWidth: 760 }}>
            Five AI risks silently destroying<br />
            <span className="gradient-text">enterprise trust, compliance, and revenue.</span>
          </h2>
          <p className="section-desc">
            Your AI monitoring dashboards show latency, uptime, and cost. None of them tell you
            if your AI is hallucinating, discriminating, drifting, or about to trigger a regulatory
            audit. That's the blind spot Dharva was built to close.
          </p>
        </div>

        {/* Risk categories grid */}
        <div className="risk-grid">
          {RISK_CATEGORIES.map((risk, i) => (
            <RiskCard key={i} risk={risk} index={i} />
          ))}
        </div>

        {/* Urgency banner */}
        <div
          ref={urgencyRef}
          className="prob-urgency"
          style={{
            opacity: urgencyVisible ? 1 : 0,
            transform: urgencyVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all .7s var(--ease) .2s',
          }}
        >
          <div className="prob-urgency-inner">
            <div className="prob-urgency-left">
              <div className="prob-urgency-icon">⚡</div>
              <div>
                <strong>The EU AI Act enforcement began in August 2024.</strong>
                <p>RBI issued AI governance directives in 2023. CDSCO is formalizing AI medical device oversight.
                Companies that deploy AI without governance infrastructure are already in violation.</p>
              </div>
            </div>
            <div className="prob-urgency-right">
              <div className="prob-urgency-stat">€35M</div>
              <div className="prob-urgency-stat-label">max EU AI Act fine per violation</div>
            </div>
          </div>
        </div>

        {/* Gap: What you have vs what you need */}
        <div className="prob-gap" style={{ marginTop: '4rem' }}>
          <div className="prob-gap-col">
            <div className="prob-gap-col-label prob-gap-col-label--has">What your current tools give you</div>
            <ul className="prob-gap-list">
              {['Model accuracy metrics', 'Inference latency', 'API uptime', 'Cost per token', 'Error rates'].map((item, i) => (
                <li key={i} className="prob-gap-item prob-gap-item--has">
                  <span className="prob-gap-icon">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>

          <div className="prob-gap-divider">
            <div className="prob-gap-missing-badge">
              <span>BLIND</span>
              <strong>SPOT</strong>
            </div>
            <div className="prob-gap-arrow">→</div>
          </div>

          <div className="prob-gap-col">
            <div className="prob-gap-col-label prob-gap-col-label--missing">What regulators will demand</div>
            <ul className="prob-gap-list">
              {['Decision-level audit trails', 'Bias & fairness documentation', 'Hallucination rate logs', 'Drift detection evidence', 'Compliance certification'].map((item, i) => (
                <li key={i} className="prob-gap-item prob-gap-item--missing">
                  <span className="prob-gap-icon">✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
