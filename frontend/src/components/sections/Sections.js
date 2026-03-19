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
  { _id: '1', icon: '⚡', title: '5-Minute Quickstart', description: 'Connect your first AI system, capture decisions, and see your first risk alert in under 5 minutes.', readTime: '5 min read' },
  { _id: '2', icon: '🔗', title: 'Governance API Reference', description: 'Complete REST API for decision capture, risk scoring, hallucination detection, bias metrics, and compliance report generation.', readTime: 'Full reference' },
  { _id: '3', icon: '🐍', title: 'Python SDK', description: 'Idiomatic Python client with async support, streaming, retry logic, and full type hints for production deployments.', readTime: '10 min setup' },
  { _id: '4', icon: '📦', title: 'Node.js / TypeScript SDK', description: 'TypeScript-first SDK for integrating Dharva into Node.js middleware, serverless functions, and enterprise stacks.', readTime: '10 min setup' },
  { _id: '5', icon: '🎓', title: 'Compliance Playbooks', description: 'Step-by-step guides for EU AI Act, RBI AI directives, CDSCO medical device AI, NABH, HIPAA, and EEOC accountability.', readTime: '15+ guides' },
  { _id: '6', icon: '🏗️', title: 'Architecture Guide', description: 'Deploy Dharva in mission-critical environments: multi-tenant isolation, high-volume ingestion, audit chain integrity.', readTime: '20 min read' },
  { _id: '7', icon: '⚖️', title: 'Bias & Fairness Handbook', description: 'Configure fairness metrics: demographic parity, equalized odds, individual fairness, intersectionality analysis.', readTime: '25 min read' },
  { _id: '8', icon: '🛡️', title: 'Security & Data Governance', description: 'Security architecture, immutable audit chain design, data residency options, and enterprise hardening guides.', readTime: '15 min read' },
];

export const Docs = ({ docs = [] }) => {
  const data = docs.length > 0 ? docs : fallbackDocs;
  return (
    <section className="section" id="docs">
      <div className="container">
        <div className="section-label">Documentation</div>
        <div className="section-title">Get running in minutes, not months.</div>
        <p className="section-desc">
          Dharva is built for engineers first. No 6-week implementation project.
          No consultants. Connect an AI system, see risks surface in real time, and generate
          your first compliance report — all before your afternoon standup.
        </p>
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
  { method: 'POST', cls: 'method-post', path: '/v1/systems/connect' },
  { method: 'POST', cls: 'method-post', path: '/v1/decisions/capture' },
  { method: 'GET',  cls: 'method-get',  path: '/v1/decisions/{id}/risks' },
  { method: 'GET',  cls: 'method-get',  path: '/v1/systems/{id}/risk-score' },
  { method: 'POST', cls: 'method-post', path: '/v1/compliance/generate' },
  { method: 'GET',  cls: 'method-get',  path: '/v1/audit-trail/{system_id}' },
  { method: 'GET',  cls: 'method-get',  path: '/v1/alerts/active' },
  { method: 'POST', cls: 'method-post', path: '/v1/reports/export' },
];

export const APIShowcase = () => (
  <section className="section" id="api" style={{ background: 'var(--bg2)' }}>
    <div className="container">
      <div className="section-label">Enterprise Infrastructure</div>
      <div className="section-title">Built for production AI at scale</div>
      <p className="section-desc">
        Secure multi-tenant architecture. Immutable audit trails. Role-based governance access.
        High-volume decision ingestion built for mission-critical systems processing millions of decisions per day.
      </p>
      <div className="api-demo">
        <div className="api-left">
          <h3>AI Governance API</h3>
          <p>RESTful and streaming endpoints for real-time decision capture, risk scoring, bias detection, hallucination monitoring, and compliance documentation — all in one control layer.</p>
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
              <span>risk_response.json</span>
            </div>
            <div className="code-body">
              {'{'}<br />
              &nbsp;&nbsp;<span className="str">"decision_id"</span>: <span className="str">"d-9f3k2m8x"</span>,<br />
              &nbsp;&nbsp;<span className="str">"system"</span>: <span className="str">"loan-approval-v3"</span>,<br />
              &nbsp;&nbsp;<span className="str">"risk_score"</span>: <span className="num">74</span>,<br />
              &nbsp;&nbsp;<span className="str">"risk_level"</span>: <span className="str">"HIGH"</span>,<br />
              &nbsp;&nbsp;<span className="str">"risks"</span>: {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"bias"</span>: <span className="str">"demographic_parity_violation"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"drift"</span>: <span className="str">"feature_distribution_shift"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="str">"hallucination"</span>: <span className="kw">false</span><br />
              &nbsp;&nbsp;{'}'},<br />
              &nbsp;&nbsp;<span className="str">"audit_hash"</span>: <span className="str">"sha256:a3f9..."</span>,<br />
              &nbsp;&nbsp;<span className="str">"compliance"</span>: <span className="str">"EU_AI_ACT: REVIEW_REQUIRED"</span><br />
              {'}'}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ═══════════ INTEGRATIONS ═══════════
const integrations = [
  { icon: '🏦', name: 'Banking LOS' }, { icon: '🏥', name: 'Healthcare EHR' },
  { icon: '⚖️', name: 'Legal Platforms' }, { icon: '☁️', name: 'AWS Bedrock' },
  { icon: '🔷', name: 'Azure AI' }, { icon: '🌐', name: 'Google Vertex' },
  { icon: '🐳', name: 'Docker' }, { icon: '☸️', name: 'Kubernetes' },
  { icon: '🔐', name: 'SIEM Tools' }, { icon: '📊', name: 'BI Platforms' },
  { icon: '🤖', name: 'OpenAI' }, { icon: '🦙', name: 'Llama / OSS LLMs' },
];

export const Integrations = () => (
  <section className="section" style={{ background: 'var(--bg2)' }}>
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Integrations</div>
        <div className="section-title">Plugs into your existing AI stack</div>
        <p className="section-desc" style={{ margin: '1rem auto 0' }}>
          Whether you're running GPT-4, fine-tuned Llama, or a proprietary ML model —
          Dharva wraps around it without requiring you to change a single line of your model code.
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
  {
    _id: '1',
    name: 'Starter',
    description: 'For teams evaluating AI governance',
    price: '$299',
    period: '/month',
    badge: null,
    features: [
      'Up to 100K decisions / month',
      '3 AI systems connected',
      'Real-time risk scoring',
      'Hallucination & bias detection',
      'Basic compliance reports',
      'Python & Node.js SDKs',
      'Email support',
    ],
    isFeatured: false,
    ctaText: 'Start Free Trial',
    ctaSub: '14-day free trial · No credit card',
  },
  {
    _id: '2',
    name: 'Pro',
    description: 'For production AI governance at scale',
    price: '$1,499',
    period: '/month',
    badge: 'MOST POPULAR',
    features: [
      'Up to 5M decisions / month',
      'Unlimited AI systems',
      'Full risk monitoring suite',
      'EU AI Act & RBI compliance docs',
      'Drift detection & alerting',
      'Immutable audit trail',
      'Role-based access control',
      'Slack & PagerDuty alerts',
      'Priority support (8hr SLA)',
    ],
    isFeatured: true,
    ctaText: 'Start Free Trial',
    ctaSub: '14-day free trial · No credit card',
  },
  {
    _id: '3',
    name: 'Enterprise',
    description: 'For regulated industries & large deployments',
    price: '$4,999',
    period: '/month',
    badge: null,
    features: [
      'Unlimited decision ingestion',
      'Dedicated infrastructure',
      'All compliance frameworks (EU AI Act, RBI, CDSCO, NABH, HIPAA, EEOC)',
      'On-premise deployment option',
      'Custom data residency',
      'SOC 2 Type II audit reports',
      'Regulator portal access',
      'Custom SLAs & contracts',
      '24/7 dedicated support',
    ],
    isFeatured: false,
    ctaText: 'Talk to Sales',
    ctaSub: 'Custom contract · Procurement-friendly',
  },
];

export const Pricing = ({ pricing = [], onOpenContact }) => {
  const data = pricing.length > 0 ? pricing : fallbackPricing;
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Pricing</div>
          <h2 className="section-title">Transparent pricing. No surprises.</h2>
          <p className="section-desc" style={{ margin: '1rem auto 0' }}>
            All plans include a 14-day free trial. No credit card required to start.
            Enterprise contracts available with procurement-friendly terms.
          </p>
        </div>
        <div className="pricing-grid">
          {data.map((plan, i) => (
            <Reveal key={plan._id} delay={i * 0.1} className={`price-card ${plan.isFeatured ? 'featured' : ''}`}>
              {plan.badge && <div className="price-badge">{plan.badge}</div>}
              <h4>{plan.name}</h4>
              <p className="price-desc">{plan.description}</p>
              <div className="price">{plan.price}<span>{plan.period}</span></div>
              <ul>
                {plan.features.map((feat, j) => <li key={j}>{feat}</li>)}
              </ul>
              <button
                className={`btn ${plan.isFeatured ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onOpenContact}
              >
                {plan.ctaText}
              </button>
              {plan.ctaSub && <div className="price-cta-sub">{plan.ctaSub}</div>}
            </Reveal>
          ))}
        </div>
        {/* Social proof under pricing */}
        <div className="pricing-trust">
          <span>🔒 SOC 2 Type II</span>
          <span>📋 ISO 27001</span>
          <span>⚡ 99.97% uptime SLA</span>
          <span>🇪🇺 EU data residency available</span>
        </div>
      </div>
    </section>
  );
};

// ═══════════ CTA ═══════════
export const CTA = ({ onOpenContact }) => (
  <section className="cta-section" id="cta">
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <span className="badge">
        <span style={{ color: '#f43f5e' }}>●</span> AI governance is not optional anymore
      </span>
      <h2 style={{ marginTop: '1.5rem' }}>
        Every day without AI governance<br />
        <span className="gradient-text">is a day of unmonitored risk.</span>
      </h2>
      <p>
        CTOs, ML Leads, and Compliance Heads at enterprises like yours connected Dharva
        and had their first AI risk alert in under 24 hours.
        <br /><strong style={{ color: 'var(--text)' }}>Connect your first AI system in 5 minutes — free.</strong>
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
        <button className="btn btn-primary" onClick={onOpenContact} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Connect in 5 minutes
        </button>
        <button className="btn btn-ghost" onClick={onOpenContact} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
          Schedule a live demo
        </button>
      </div>
      <div className="cta-trust-row">
        <span>✓ No credit card required</span>
        <span>✓ 14-day free trial</span>
        <span>✓ SOC 2 Type II certified</span>
        <span>✓ 5-minute setup</span>
      </div>
    </div>
  </section>
);
