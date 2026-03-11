import React from 'react';
import { useReveal } from '../../hooks';

const STATS = [
  { value: '$5.2T',  label: 'in AI-driven decisions annually',              sub: 'across lending, hiring & insurance' },
  { value: '73%',   label: 'enterprises lack AI audit infrastructure',     sub: 'McKinsey Global AI Survey 2024' },
  { value: '840+',  label: 'AI regulatory violations filed',                sub: 'in the EU since 2023' },
  { value: '$48M',  label: 'average cost of an AI compliance failure',      sub: 'including legal & reputational damage' },
];

const GAP_HAS     = ['Model accuracy', 'Inference latency', 'API cost', 'Performance drift', 'Data pipeline health'];
const GAP_MISSING = ['Harm to individuals', 'Systemic bias patterns', 'Financial impact per decision', 'Regulatory compliance posture', 'Societal consequence at scale'];

const StatCard = ({ stat, index }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="prob-stat"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all .55s var(--ease) ${index * 0.1}s`,
      }}
    >
      <div className="prob-stat-value">{stat.value}</div>
      <div className="prob-stat-label">{stat.label}</div>
      <div className="prob-stat-sub">{stat.sub}</div>
    </div>
  );
};

export default function Problem() {
  const [headerRef, headerVisible] = useReveal();
  const [gapRef, gapVisible] = useReveal();

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
          <div className="section-label">The Problem</div>
          <h2 className="section-title" style={{ maxWidth: 700 }}>
            AI is making millions of decisions.<br />
            <span className="gradient-text">Nobody is measuring the consequences.</span>
          </h2>
          <p className="section-desc">
            Modern AI observability tools track accuracy, latency, and cost — but completely
            ignore the societal and financial impact of automated decisions on real people.
          </p>
        </div>

        {/* Stats grid */}
        <div className="prob-stats">
          {STATS.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
        </div>

        {/* Gap comparison */}
        <div
          ref={gapRef}
          className="prob-gap"
          style={{
            opacity: gapVisible ? 1 : 0,
            transform: gapVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all .7s var(--ease)',
          }}
        >
          <div className="prob-gap-col">
            <div className="prob-gap-col-label prob-gap-col-label--has">What AI Tools Measure Today</div>
            <ul className="prob-gap-list">
              {GAP_HAS.map((item, i) => (
                <li key={i} className="prob-gap-item prob-gap-item--has">
                  <span className="prob-gap-icon">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>

          <div className="prob-gap-divider">
            <div className="prob-gap-missing-badge">
              <span>MISSING</span>
              <strong>IMPACT</strong>
            </div>
            <div className="prob-gap-arrow">→</div>
          </div>

          <div className="prob-gap-col">
            <div className="prob-gap-col-label prob-gap-col-label--missing">What Nobody Measures</div>
            <ul className="prob-gap-list">
              {GAP_MISSING.map((item, i) => (
                <li key={i} className="prob-gap-item prob-gap-item--missing">
                  <span className="prob-gap-icon">✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Risk strip */}
        <div className="prob-risks">
          {[
            { icon: '⚠', color: '#f87171', title: 'Compliance Risk',      desc: 'EU AI Act, ISO 42001, and accountability laws demand documented evidence of AI oversight.' },
            { icon: '⚖', color: '#fb923c', title: 'Legal Liability',      desc: 'Automated decisions in lending, hiring, and healthcare face discrimination lawsuits.' },
            { icon: '◈', color: '#facc15', title: 'Systemic Bias',         desc: 'Without real-time fairness monitoring, AI amplifies societal biases at unprecedented scale.' },
            { icon: '🔒', color: '#818cf8', title: 'Regulatory Exposure', desc: 'Regulators are moving from voluntary guidance to mandatory enforcement globally.' },
          ].map((r, i) => (
            <div key={i} className="prob-risk" style={{ '--r': r.color }}>
              <span className="prob-risk-icon" style={{ color: r.color }}>{r.icon}</span>
              <strong className="prob-risk-title">{r.title}</strong>
              <p className="prob-risk-desc">{r.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
