import React from 'react';

const STATS = [
  { value: '$5.2T', label: 'in AI-driven decisions annually', sub: 'across lending, hiring & insurance' },
  { value: '73%', label: 'of enterprises lack AI audit infrastructure', sub: 'McKinsey Global AI Survey 2024' },
  { value: '840+', label: 'AI regulatory violations filed', sub: 'in the EU since 2023' },
  { value: '$48M', label: 'average cost of an AI compliance failure', sub: 'including legal & reputational damage' },
];

const RISKS = [
  {
    icon: '⚠',
    color: '#f87171',
    title: 'Compliance Risk',
    desc: 'EU AI Act, ISO 42001, and algorithmic accountability laws demand documented evidence of AI oversight — most enterprises have none.',
  },
  {
    icon: '⚖',
    color: '#fb923c',
    title: 'Legal Liability',
    desc: 'Automated decisions in lending, hiring, and healthcare are subject to discrimination lawsuits and class-action risk.',
  },
  {
    icon: '◈',
    color: '#facc15',
    title: 'Systemic Bias',
    desc: 'Without real-time fairness monitoring, AI models silently amplify existing societal biases at unprecedented scale.',
  },
  {
    icon: '🔒',
    color: '#818cf8',
    title: 'Regulatory Exposure',
    desc: 'Regulators globally are moving from voluntary guidance to mandatory enforcement — unaudited AI is a boardroom-level risk.',
  },
];

export default function Problem() {
  return (
    <section className="problem-section" id="problem">
      <div className="problem-inner">
        <div className="section-eyebrow">The Problem</div>
        <h2 className="section-title">
          AI is making millions of decisions.<br />
          <span className="text-accent">Nobody is measuring the consequences.</span>
        </h2>
        <p className="section-subtitle">
          Modern AI observability tools track accuracy, latency, and cost — but completely ignore the societal and
          financial impact of automated decisions on real people.
        </p>

        {/* Stats Row */}
        <div className="problem-stats">
          {STATS.map((s, i) => (
            <div key={i} className="problem-stat">
              <div className="problem-stat-value">{s.value}</div>
              <div className="problem-stat-label">{s.label}</div>
              <div className="problem-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Risk Cards */}
        <div className="problem-risks">
          {RISKS.map((r, i) => (
            <div key={i} className="problem-risk-card" style={{ '--risk-color': r.color }}>
              <div className="problem-risk-icon" style={{ color: r.color }}>{r.icon}</div>
              <h3 className="problem-risk-title">{r.title}</h3>
              <p className="problem-risk-desc">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Gap Visual */}
        <div className="problem-gap">
          <div className="problem-gap-col problem-gap-col--left">
            <h4>Current AI Tools Measure</h4>
            <ul className="problem-gap-list problem-gap-list--has">
              <li>✓ Model accuracy</li>
              <li>✓ Inference latency</li>
              <li>✓ API cost</li>
              <li>✓ Performance drift</li>
              <li>✓ Data pipeline health</li>
            </ul>
          </div>
          <div className="problem-gap-divider">
            <div className="problem-gap-arrow">→</div>
            <div className="problem-gap-missing">
              <span>Missing</span>
              <span className="problem-gap-missing-val">IMPACT</span>
            </div>
          </div>
          <div className="problem-gap-col problem-gap-col--right">
            <h4>But Nobody Measures</h4>
            <ul className="problem-gap-list problem-gap-list--missing">
              <li>✗ Harm to individuals</li>
              <li>✗ Systemic bias patterns</li>
              <li>✗ Financial impact per decision</li>
              <li>✗ Regulatory compliance posture</li>
              <li>✗ Societal consequence at scale</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
