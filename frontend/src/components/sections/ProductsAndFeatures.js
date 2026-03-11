import React from 'react';
import { useReveal } from '../../hooks';

// ═══════════ MARQUEE ═══════════
export const Marquee = () => {
  const items = [
    'AI Impact Scoring', 'Algorithmic Accountability', 'EU AI Act Compliance',
    'Decision Intelligence', 'Fairness Monitoring', 'Immutable Audit Trails',
    'Systemic Risk Detection', 'Regulatory Intelligence', 'Bias Detection', 'Governance Infrastructure',
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

// ═══════════ STATUS MAP ═══════════
const statusMap = {
  live:          { label: 'Live',         className: 'tag-live'   },
  beta:          { label: 'Beta',         className: 'tag-beta'   },
  alpha:         { label: 'Alpha',        className: 'tag-alpha'  },
  'coming-soon': { label: 'Coming Soon',  className: 'tag-coming' },
};

const fallbackProducts = [
  { _id: '1', name: 'AI Impact Scoring',               icon: '◈', accent: '#00e5c8', description: 'Every AI system receives a structured Impact Score — evaluating fairness risk, financial exposure, compliance risk, and societal impact in real time.',                                                          status: 'live',  large: true  },
  { _id: '2', name: 'Decision Intelligence Monitoring', icon: '📊', accent: '#8b5cf6', description: 'Continuously monitor automated decisions across your AI portfolio. Detect emerging bias patterns and abnormal behavior before they escalate.',                                                                  status: 'live',  large: true  },
  { _id: '3', name: 'Compliance Documentation',         icon: '📋', accent: '#3b82f6', description: 'Automatically generate EU AI Act-aligned compliance documentation and risk assessment files.',                                                                                                               status: 'live',  large: false },
  { _id: '4', name: 'Immutable Audit Trails',           icon: '🔒', accent: '#f59e0b', description: 'Every automated decision becomes a tamper-proof, SHA-256 hash-chained event satisfying regulatory evidence requirements at scale.',                                                                          status: 'live',  large: false },
  { _id: '5', name: 'Systemic Risk Detection',          icon: '⚠',  accent: '#f43f5e', description: 'Identify systemic risk accumulation across decision populations before it becomes a regulatory incident.',                                                                                                   status: 'beta',  large: false },
  { _id: '6', name: 'Regulatory Intelligence',          icon: '🌐', accent: '#22c55e', description: 'Stay ahead of global AI regulations. DHARVA maps your AI systems to applicable laws and auto-generates required documentation.',                                                                             status: 'beta',  large: false },
];

const BentoCard = ({ product, delay }) => {
  const [ref, isVisible] = useReveal();
  const tag = statusMap[product.status] || statusMap['coming-soon'];

  return (
    <div
      ref={ref}
      className={`bento-card ${product.large ? 'bento-card--large' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .6s ease ${delay}s, transform .6s var(--ease) ${delay}s`,
        '--accent-color': product.accent,
      }}
    >
      <div className="bento-card-glow" />
      <div className="bento-icon-wrap">
        <span className="bento-icon">{product.icon}</span>
      </div>
      <h3 className="bento-card-title">{product.name}</h3>
      <p className="bento-card-desc">{product.description}</p>
      <div className="bento-card-footer">
        <span className={`tag ${tag.className}`}>{tag.label}</span>
        <span className="bento-card-arrow">→</span>
      </div>
    </div>
  );
};

export const Products = ({ products = [] }) => {
  const data = products.length > 0 ? products : fallbackProducts;
  const [ref, isVisible] = useReveal();

  return (
    <section className="section" id="products">
      <div className="container">
        <div
          ref={ref}
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all .6s var(--ease)' }}
        >
          <div className="section-label">Platform Capabilities</div>
          <div className="section-title">Introducing DHARVA</div>
          <p className="section-desc">
            DHARVA is the Impact Intelligence Layer for AI Systems — continuously analyzing
            automated decisions and producing measurable impact intelligence so you can
            measure risk instead of guessing at it.
          </p>
        </div>

        <div className="bento-grid">
          {data.map((product, i) => (
            <BentoCard key={product._id} product={product} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════ FEATURES — HORIZONTAL STEPS ═══════════
const STEPS = [
  { num: '01', icon: '🔌', title: 'Connect',  desc: 'Register your AI systems — loan models, hiring algorithms, fraud engines — through a single unified API.' },
  { num: '02', icon: '📡', title: 'Capture',  desc: 'DHARVA records every automated decision and its contextual signals in real time as a traceable, immutable event.' },
  { num: '03', icon: '📏', title: 'Measure',  desc: 'The platform analyzes financial impact, fairness metrics, systemic risk signals, and regulatory exposure per decision.' },
  { num: '04', icon: '📄', title: 'Generate', desc: 'DHARVA produces Impact Scores, risk classification, compliance reports, and governance documentation — automatically.' },
];

const StepItem = ({ step, index }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="step-item"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all .6s var(--ease) ${index * 0.12}s`,
      }}
    >
      <div className="step-num">{step.num}</div>
      <div className="step-icon">{step.icon}</div>
      <h4 className="step-title">{step.title}</h4>
      <p className="step-desc">{step.desc}</p>
    </div>
  );
};

export const Features = () => {
  const [ref, isVisible] = useReveal();
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div
          ref={ref}
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all .6s var(--ease)' }}
        >
          <div className="section-label">How DHARVA Works</div>
          <div className="section-title">From Decision to Accountability</div>
          <p className="section-desc">
            Four steps from integrating your AI system to having full,
            auditable impact intelligence for every decision it makes.
          </p>
        </div>

        <div className="steps-flow">
          {/* Connector line */}
          <div className="steps-connector" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <StepItem key={i} step={step} index={i} />
          ))}
        </div>

        {/* Bottom callouts */}
        <div className="steps-callouts">
          <div className="steps-callout">
            <span className="steps-callout-icon">🔔</span>
            <div>
              <strong>Continuous Monitoring</strong>
              <p>Detect emerging bias, systemic risk accumulation, and impact escalation before they become regulatory incidents.</p>
            </div>
          </div>
          <div className="steps-callout">
            <span className="steps-callout-icon">⚡</span>
            <div>
              <strong>Compliance Automation</strong>
              <p>Reduce compliance cycles from months to days. Automatically generate structured documentation for EU AI Act and global frameworks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
