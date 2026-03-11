import React from 'react';
import { useReveal } from '../../hooks';

// ── Reveal wrapper ──
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
};

// ═══════════ DOCS ═══════════
const fallbackDocs = [
  { _id: '1', icon: '📖', title: 'Integration Guide', description: 'Connect your AI systems to DHARVA in minutes. Covers system registration, SDK setup, and your first decision capture.', readTime: '5 min read' },
  { _id: '2', icon: '🔗', title: 'Impact API Reference', description: 'Complete REST API documentation for decision capture, impact scoring, fairness metrics, and compliance report generation.', readTime: 'Full reference' },
  { _id: '3', icon: '🐍', title: 'Python SDK', description: 'Idiomatic Python client for the DHARVA Impact Monitor. Async support, streaming, retry logic, and full type hints.', readTime: '10 min setup' },
  { _id: '4', icon: '📦', title: 'Node.js SDK', description: 'TypeScript-first SDK for integrating DHARVA into Node.js and enterprise middleware stacks.', readTime: '10 min setup' },
  { _id: '5', icon: '🎓', title: 'Compliance Playbooks', description: 'Step-by-step playbooks for EU AI Act, EEOC algorithmic accountability, HIPAA AI compliance, and state insurance regulations.', readTime: '15+ guides' },
  { _id: '6', icon: '🏗️', title: 'Architecture Guide', description: 'Best practices for deploying DHARVA in mission-critical environments. Covers multi-tenant isolation, high-volume ingestion, and audit chain integrity.', readTime: '20 min read' },
  { _id: '7', icon: '🔧', title: 'Fairness Metrics Handbook', description: 'Understand and configure fairness metrics: demographic parity, equalized odds, individual fairness, and intersectionality analysis.', readTime: '25 min read' },
  { _id: '8', icon: '🛡️', title: 'Security & Data Governance', description: 'Security architecture, data handling policies, immutable audit chain design, and enterprise deployment hardening guides.', readTime: '15 min read' },
];

export const Docs = ({ docs = [] }) => {
  const data = docs.length > 0 ? docs : fallbackDocs;
  return (
    <section className="section" id="docs">
      <div className="container">
        <div className="section-label">Documentation</div>
        <div className="section-title">Compliance Without Consultants</div>
        <p className="section-desc">Enterprises currently spend millions on AI governance consulting. DHARVA automates the process — reducing compliance cycles from months to days.</p>
        <div className="docs-grid">
          {data.map((doc, i) => (
            <Reveal key={doc._id} delay={i * 0.06} className="doc-card">
              <div className="doc-icon">{doc.icon}</div>
              <h4>{doc.title}</h4>
              <p>{doc.description}</p>
              <div className="read-time">⏱ {doc.readTime}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════ API SHOWCASE ═══════════
const endpoints = [
  { method: 'POST', cls: 'method-post', path: '/v1/systems/register' },
  { method: 'POST', cls: 'method-post', path: '/v1/decisions/capture' },
  { method: 'GET', cls: 'method-get', path: '/v1/decisions/{id}/impact' },
  { method: 'GET', cls: 'method-get', path: '/v1/systems/{id}/score' },
  { method: 'POST', cls: 'method-post', path: '/v1/compliance/generate' },
  { method: 'GET', cls: 'method-get', path: '/v1/audit-trail/{system_id}' },
  { method: 'GET', cls: 'method-get', path: '/v1/risk/systemic' },
  { method: 'POST', cls: 'method-post', path: '/v1/reports/export' },
];

export const APIShowcase = () => (
  <section className="section" id="api" style={{ background: 'var(--bg2)' }}>
    <div className="container">
      <div className="section-label">Enterprise Infrastructure</div>
      <div className="section-title">Enterprise-Grade API</div>
      <p className="section-desc">Secure multi-tenant architecture with role-based governance access, immutable audit trails, and high-volume decision ingestion built for mission-critical systems.</p>
      <div className="api-demo">
        <div className="api-left">
          <h3>Impact Intelligence API</h3>
          <p>RESTful endpoints for decision capture, impact scoring, fairness analysis, and compliance documentation generation — all in one platform.</p>
          <div className="api-endpoints">
            {endpoints.map((ep, i) => (
              <div key={i} className="endpoint">
                <span className={`method ${ep.cls}`}>{ep.method}</span>
                {ep.path}
              </div>
            ))}
          </div>
        </div>
        <div className="api-right">
          <div className="code-window">
            <div className="code-header">
              <span className="code-dot" /><span className="code-dot" /><span className="code-dot" />
              <span>impact_score.json</span>
            </div>
            <div className="code-body">
              {'{'}<br />
              &nbsp;&nbsp;<span className="str">"decision_id"</span>: <span className="str">"d-9f3k2m8x"</span>,<br />
              &nbsp;&nbsp;<span className="str">"system"</span>: <span className="str">"loan-approval-v2"</span>,<br />
              &nbsp;&nbsp;<span className="str">"impact_score"</span>: <span className="num">34</span>,<br />
              &nbsp;&nbsp;<span className="str">"risk_level"</span>: <span className="str">"moderate"</span>,<br />
              &nbsp;&nbsp;<span className="str">"fairness_risk"</span>: {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"score"</span>: <span className="num">0.12</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"flag"</span>: <span className="str">"demographic_parity"</span><br />
              &nbsp;&nbsp;{'}'},<br />
              &nbsp;&nbsp;<span className="str">"compliance"</span>: {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"eu_ai_act"</span>: <span className="str">"compliant"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"audit_hash"</span>: <span className="str">"sha256:a3f9..."</span><br />
              &nbsp;&nbsp;{'}'}<br />
              {'}'}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ═══════════ STATS ═══════════
export const Stats = () => (
  <section className="section">
    <div className="container">
      <div className="stats-row">
        {[
          { num: '$5.2T', label: 'AI-Driven Decisions Annually' },
          { num: '73%', label: 'Enterprises Lack AI Audit Infrastructure' },
          { num: '840+', label: 'AI Regulatory Violations in EU Since 2023' },
          { num: '$48M', label: 'Average AI Compliance Failure Cost' },
        ].map((stat, i) => (
          <Reveal key={i} delay={i * 0.1} className="stat-box">
            <div className="stat-num">{stat.num.replace(/([A-Z%/]+)/g, '<span class="accent">$1</span>').split('<span class="accent">').map((part, j) => {
              if (part.includes('</span>')) {
                const [accent, rest] = part.split('</span>');
                return <React.Fragment key={j}><span className="accent">{accent}</span>{rest}</React.Fragment>;
              }
              return part;
            })}</div>
            <div className="stat-label">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ═══════════ INTEGRATIONS ═══════════
const integrations = [
  { icon: '🏦', name: 'Banking APIs' }, { icon: '🏥', name: 'Healthcare Systems' },
  { icon: '⚖️', name: 'Legal Platforms' }, { icon: '☁️', name: 'AWS' },
  { icon: '🔷', name: 'Azure' }, { icon: '🌐', name: 'Google Cloud' },
  { icon: '🐳', name: 'Docker' }, { icon: '☸️', name: 'Kubernetes' },
  { icon: '🔐', name: 'SIEM Tools' }, { icon: '📊', name: 'BI Platforms' },
  { icon: '🔄', name: 'Zapier' }, { icon: '💬', name: 'Slack' },
];

export const Integrations = () => (
  <section className="section" style={{ background: 'var(--bg2)' }}>
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Integrations</div>
        <div className="section-title">Connects to Your AI Stack</div>
        <p className="section-desc" style={{ margin: '1rem auto 0' }}>
          DHARVA integrates with the systems and platforms where your AI decisions happen — from loan engines to clinical triage systems.
        </p>
      </div>
      <div className="int-grid">
        {integrations.map((item, i) => (
          <Reveal key={i} delay={i * 0.04} className="int-item">
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ═══════════ PRICING ═══════════
const fallbackPricing = [
  { _id: '1', name: 'Starter', description: 'For teams exploring AI accountability', price: 'Free', period: '', features: ['Up to 50K decisions / month', 'AI Impact Scoring', 'Basic fairness metrics', 'Community support', 'Python & Node.js SDKs'], isFeatured: false, ctaText: 'Request Demo' },
  { _id: '2', name: 'Enterprise', description: 'For production AI governance', price: 'Custom', period: '', features: ['Unlimited decision ingestion', 'Full compliance documentation suite', 'EU AI Act & EEOC reporting', 'Immutable audit trail', 'Role-based governance access', 'Priority support (4hr SLA)'], isFeatured: true, ctaText: 'Request Demo' },
  { _id: '3', name: 'Regulated Industry', description: 'For banking, healthcare & government', price: 'Custom', period: '', features: ['Dedicated infrastructure', 'Immutable audit chain with export', 'Regulator-ready report generation', 'On-premise deployment option', 'Custom SLAs & contracts', '24/7 dedicated support'], isFeatured: false, ctaText: 'Contact Sales' },
];

export const Pricing = ({ pricing = [], onOpenContact }) => {
  const data = pricing.length > 0 ? pricing : fallbackPricing;
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Pricing</div>
          <div className="section-title">Built for the Scale of Accountability</div>
          <p className="section-desc" style={{ margin: '1rem auto 0' }}>
            From pilot programs to enterprise-wide AI governance. DHARVA scales with your accountability requirements.
          </p>
        </div>
        <div className="pricing-grid">
          {data.map((plan, i) => (
            <Reveal key={plan._id} delay={i * 0.1} className={`price-card ${plan.isFeatured ? 'featured' : ''}`}>
              <h4>{plan.name}</h4>
              <p className="price-desc">{plan.description}</p>
              <div className="price">{plan.price}<span>{plan.period}</span></div>
              <ul>
                {plan.features.map((feat, j) => <li key={j}>{feat}</li>)}
              </ul>
              <button
                className={`btn ${plan.isFeatured ? 'btn-primary' : 'btn-ghost'}`}
                onClick={onOpenContact}
              >
                {plan.ctaText}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════ CTA ═══════════
export const CTA = ({ onOpenContact }) => (
  <section className="cta-section" id="cta">
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <span className="badge">Understand the real impact of your AI systems</span>
      <h2 style={{ marginTop: '1.5rem' }}>
        Automated power must be<br /><span className="gradient-text">measurable and accountable.</span>
      </h2>
      <p>Request a demo to see how DHARVA measures automated decision intelligence across your AI portfolio.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={onOpenContact} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
          Request Demo
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
        <button className="btn btn-ghost" onClick={onOpenContact} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
          Talk to Sales
        </button>
      </div>
    </div>
  </section>
);
