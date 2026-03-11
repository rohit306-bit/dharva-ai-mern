import React from 'react';
import { useReveal } from '../../hooks';

// ═══════════ MARQUEE ═══════════
export const Marquee = () => {
  const items = [
    'AI Impact Scoring', 'Algorithmic Accountability', 'Decision Intelligence',
    'Fairness Monitoring', 'Regulatory Compliance', 'Immutable Audit Trails',
    'Systemic Risk Detection', 'EU AI Act', 'Bias Detection', 'Governance Infrastructure',
  ];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
};

// ═══════════ REVEAL WRAPPER ═══════════
const RevealItem = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// ═══════════ PRODUCTS ═══════════
const statusMap = {
  live: { label: 'Live', className: 'tag-live' },
  beta: { label: 'Beta', className: 'tag-beta' },
  alpha: { label: 'Alpha', className: 'tag-alpha' },
  'coming-soon': { label: 'Coming Soon', className: 'tag-coming' },
};

// Fallback data if API hasn't loaded
const fallbackProducts = [
  { _id: '1', name: 'AI Impact Scoring', icon: '◈', iconBg: 'rgba(0,229,200,.1)', description: 'Every AI system receives a structured Impact Score evaluating fairness risk, financial exposure, compliance risk, and societal impact in real time.', status: 'live' },
  { _id: '2', name: 'Decision Intelligence Monitoring', icon: '📊', iconBg: 'rgba(139,92,246,.1)', description: 'Continuously monitor automated decisions across your AI portfolio. Detect emerging bias patterns and abnormal decision behavior before they escalate.', status: 'live' },
  { _id: '3', name: 'Compliance Documentation', icon: '📋', iconBg: 'rgba(59,130,246,.1)', description: 'Automatically generate structured compliance documentation for EU AI Act, algorithmic accountability standards, and AI risk management frameworks.', status: 'live' },
  { _id: '4', name: 'Immutable Audit Trails', icon: '🔒', iconBg: 'rgba(245,158,11,.1)', description: 'Every automated decision becomes a tamper-proof, traceable event. SHA-256 hash-chained records satisfy regulatory evidence requirements at scale.', status: 'live' },
  { _id: '5', name: 'Systemic Risk Detection', icon: '⚠', iconBg: 'rgba(244,63,94,.1)', description: 'Identify systemic risk accumulation across decision populations before it becomes a regulatory incident. Real-time alerts with risk classification.', status: 'beta' },
  { _id: '6', name: 'Regulatory Intelligence', icon: '🌐', iconBg: 'rgba(34,197,94,.1)', description: 'Stay ahead of global AI regulations. DHARVA maps your AI systems to applicable laws and generates required documentation automatically.', status: 'beta' },
];

export const Products = ({ products = [] }) => {
  const data = products.length > 0 ? products : fallbackProducts;

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-label">Platform Capabilities</div>
        <div className="section-title">Introducing DHARVA</div>
        <p className="section-desc">
          DHARVA is the Impact Intelligence Layer for AI Systems. It continuously analyzes automated decisions and produces measurable impact intelligence — so instead of guessing AI risk, organizations can measure it.
        </p>
        <div className="products-grid">
          {data.map((product, i) => {
            const tag = statusMap[product.status] || statusMap['coming-soon'];
            return (
              <RevealItem key={product._id} delay={i * 0.1} className="product-card">
                <div className="product-icon" style={{ background: product.iconBg }}>
                  {product.icon}
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className={`tag ${tag.className}`}>{tag.label}</span>
              </RevealItem>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ═══════════ FEATURES ═══════════
const featureData = [
  { icon: '🔌', title: '1. Connect AI Systems', desc: 'Register and integrate your automated systems — loan models, hiring algorithms, fraud detection engines, and insurance approval models — through a single API.' },
  { icon: '📡', title: '2. Capture Decisions', desc: 'DHARVA records every automated decision and its contextual signals in real time. Every decision becomes a traceable, immutable event in your audit trail.' },
  { icon: '📏', title: '3. Measure Impact', desc: 'The platform analyzes financial impact, fairness metrics, systemic risk signals, and regulatory exposure for every decision made by your AI systems.' },
  { icon: '📄', title: '4. Generate Accountability Intelligence', desc: 'DHARVA produces AI Impact Scores, risk classification, compliance reports, and governance documentation — automatically, at enterprise scale.' },
  { icon: '🔔', title: 'Continuous Monitoring', desc: 'Detect emerging bias patterns, systemic risk accumulation, abnormal decision behavior, and impact escalation before they become regulatory incidents.' },
  { icon: '⚡', title: 'Compliance Automation', desc: 'Reduce compliance cycles from months to days. Automatically generate structured documentation for EU AI Act, algorithmic accountability standards, and AI risk frameworks.' },
];

export const Features = () => (
  <section className="section" id="features" style={{ background: 'var(--bg2)' }}>
    <div className="container">
      <div className="section-label">How DHARVA Works</div>
      <div className="section-title">From Decision to Accountability</div>
      <p className="section-desc">DHARVA continuously analyzes automated decisions across your AI portfolio and transforms raw decision data into measurable impact intelligence.</p>
      <div className="feat-grid">
        {featureData.map((feat, i) => (
          <RevealItem key={i} delay={i * 0.08} className="feat-item">
            <div className="feat-icon">{feat.icon}</div>
            <h4>{feat.title}</h4>
            <p>{feat.desc}</p>
          </RevealItem>
        ))}
      </div>
    </div>
  </section>
);
