import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useReveal } from '../hooks';
import DharvaLogo from '../components/ui/DharvaLogo';
import ContactModal from '../components/ui/ContactModal';

const QUICKSTART_STEPS = [
  {
    step: 1,
    time: '~30 seconds',
    title: 'Install the SDK',
    desc: 'Install the Dharva SDK for your language. Supports Python, Node.js, and direct REST.',
    tabs: [
      {
        label: 'Python',
        code: `pip install dharva-sdk`,
      },
      {
        label: 'Node.js',
        code: `npm install @dharva/sdk`,
      },
      {
        label: 'REST',
        code: `# No install required — use any HTTP client
# Base URL: https://api.dharva.ai/v1
# Auth: Bearer sk-dharva-your-key`,
      },
    ],
  },
  {
    step: 2,
    time: '~1 minute',
    title: 'Initialize and connect your AI system',
    desc: 'Register your AI system with Dharva. This creates a monitored system record and configures the compliance framework.',
    tabs: [
      {
        label: 'Python',
        code: `from dharva import DharvaClient

client = DharvaClient(api_key="sk-dharva-your-key")

# Connect your AI system
system = client.systems.connect(
    name="loan-approval-v3",
    description="Credit scoring model for retail lending",
    risk_tier="HIGH",           # LOW | MEDIUM | HIGH | CRITICAL
    framework="EU_AI_ACT",      # EU_AI_ACT | RBI | CDSCO | HIPAA
    tags=["fintech", "credit"]
)

print(f"System ID: {system.id}")
# → System ID: sys_9f3k2m8x`,
      },
      {
        label: 'Node.js',
        code: `import { DharvaClient } from '@dharva/sdk';

const client = new DharvaClient({ apiKey: 'sk-dharva-your-key' });

const system = await client.systems.connect({
  name: 'loan-approval-v3',
  description: 'Credit scoring model for retail lending',
  riskTier: 'HIGH',
  framework: 'EU_AI_ACT',
});

console.log(\`System ID: \${system.id}\`);`,
      },
    ],
  },
  {
    step: 3,
    time: '~1 minute',
    title: 'Capture your first AI decision',
    desc: 'Wrap your existing model call with Dharva\'s decision capture. Zero changes to your model code.',
    tabs: [
      {
        label: 'Python',
        code: `# Your existing model call — unchanged
decision_input = {"applicant_id": "usr_12345", "amount": 50000}
model_output = your_model.predict(decision_input)

# Capture the decision with Dharva
decision = client.decisions.capture(
    system_id=system.id,
    input=decision_input,
    output=model_output,
    metadata={"model_version": "v3.2.1"}
)

print(f"Decision ID: {decision.id}")
print(f"Risk Score: {decision.risk_score}")
print(f"Risk Flags: {decision.risk_flags}")

# → Decision ID: dec_a7x9k2
# → Risk Score: 74
# → Risk Flags: ['demographic_parity_violation']`,
      },
      {
        label: 'Node.js',
        code: `const decisionInput = { applicantId: 'usr_12345', amount: 50000 };
const modelOutput = await yourModel.predict(decisionInput);

const decision = await client.decisions.capture({
  systemId: system.id,
  input: decisionInput,
  output: modelOutput,
  metadata: { modelVersion: 'v3.2.1' },
});

console.log(\`Risk Score: \${decision.riskScore}\`);
// → Risk Score: 74`,
      },
    ],
  },
  {
    step: 4,
    time: '~1 minute',
    title: 'View risks in real time',
    desc: 'Open your Dharva dashboard or poll the API to see live risk monitoring.',
    tabs: [
      {
        label: 'Python',
        code: `# Get real-time risk summary for your system
risk_summary = client.systems.get_risks(system.id)

print(f"Active Alerts: {risk_summary.active_alerts}")
print(f"Compliance Score: {risk_summary.compliance_score}%")
print(f"Bias Flags (7d): {risk_summary.bias_flags_7d}")

# → Active Alerts: 2
# → Compliance Score: 87%
# → Bias Flags (7d): 14

# Or subscribe to real-time alerts
@client.on_alert
def handle_alert(alert):
    print(f"⚠ {alert.type}: {alert.message}")
    # Send to Slack, PagerDuty, etc.`,
      },
      {
        label: 'Dashboard',
        code: `# Open your Dharva dashboard at:
# https://app.dharva.ai/dashboard

# You'll see:
# ✓ Live risk score for each connected system
# ✓ Active alerts with full context
# ✓ Decision history with audit trail
# ✓ Bias & fairness metrics
# ✓ Compliance readiness score`,
      },
    ],
  },
  {
    step: 5,
    time: '~30 seconds',
    title: 'Generate your first compliance report',
    desc: 'Export a regulator-ready audit report for any time period on demand.',
    tabs: [
      {
        label: 'Python',
        code: `# Generate EU AI Act compliance report
report = client.compliance.generate(
    system_id=system.id,
    framework="EU_AI_ACT",
    period_start="2026-01-01",
    period_end="2026-03-31",
)

# Export as PDF or JSON
report.export("eu_ai_act_q1_2026.pdf", format="pdf")
print(f"Report: {report.pages} pages, signed hash: {report.hash[:16]}...")

# → Report: 47 pages, signed hash: sha256:a3f9b2c1...`,
      },
      {
        label: 'REST',
        code: `POST /v1/compliance/generate
Authorization: Bearer sk-dharva-your-key
Content-Type: application/json

{
  "system_id": "sys_9f3k2m8x",
  "framework": "EU_AI_ACT",
  "period_start": "2026-01-01",
  "period_end": "2026-03-31",
  "format": "pdf"
}

# Response:
# {
#   "report_id": "rpt_7x2k9m",
#   "download_url": "https://...",
#   "pages": 47,
#   "audit_hash": "sha256:a3f9..."
# }`,
      },
    ],
  },
];

const DOC_SECTIONS = [
  {
    category: 'Getting Started',
    docs: [
      { title: '5-Minute Quickstart', desc: 'Connect your first AI system', badge: 'START HERE' },
      { title: 'System Registration', desc: 'Configure AI systems and risk tiers' },
      { title: 'SDK Configuration', desc: 'Authentication, retries, timeouts' },
    ],
  },
  {
    category: 'Core Concepts',
    docs: [
      { title: 'Decisions & Capture', desc: 'How decision logging works' },
      { title: 'Risk Scoring', desc: 'How Dharva calculates risk scores' },
      { title: 'Audit Trail Architecture', desc: 'Immutable tamper-proof logs' },
    ],
  },
  {
    category: 'Risk Monitoring',
    docs: [
      { title: 'Hallucination Detection', desc: 'LLM factuality monitoring' },
      { title: 'Bias & Fairness Metrics', desc: 'Demographic parity, equalized odds' },
      { title: 'Drift Detection', desc: 'Feature and output distribution shifts' },
      { title: 'Unsafe Output Prevention', desc: 'Content safety policies' },
    ],
  },
  {
    category: 'Compliance',
    docs: [
      { title: 'EU AI Act Playbook', desc: 'Article-by-article compliance guide' },
      { title: 'RBI AI Governance', desc: 'RBI banking AI requirements' },
      { title: 'CDSCO Medical AI', desc: 'Clinical AI certification guide' },
      { title: 'HIPAA AI Compliance', desc: 'Healthcare AI audit requirements' },
    ],
  },
];

function StepBlock({ step, index }) {
  const [activeTab, setActiveTab] = useState(0);
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="qs-step"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all .55s var(--ease) ${index * 0.1}s`,
      }}
    >
      <div className="qs-step-header">
        <div className="qs-step-num">{step.step}</div>
        <div className="qs-step-meta">
          <h3 className="qs-step-title">{step.title}</h3>
          <span className="qs-step-time">⏱ {step.time}</span>
        </div>
      </div>
      <p className="qs-step-desc">{step.desc}</p>
      {step.tabs && (
        <div className="qs-code-block">
          <div className="qs-tabs">
            {step.tabs.map((tab, i) => (
              <button
                key={i}
                className={`qs-tab ${activeTab === i ? 'qs-tab--active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="code-window" style={{ borderRadius: '0 0 12px 12px', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <div className="code-header">
              <span className="code-dot" /><span className="code-dot" /><span className="code-dot" />
            </div>
            <pre className="code-body demo-code-pre">{step.tabs[activeTab].code}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DocsPage() {
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
            <Link to="/" className="btn btn-ghost nav-btn-sm">← Home</Link>
            <button className="btn btn-primary nav-btn-sm" onClick={() => setContactOpen(true)}>
              Get API Key
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div
            ref={headerRef}
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all .6s var(--ease)',
            }}
          >
            <div className="section-label">Documentation</div>
            <h1 className="section-title" style={{ maxWidth: 700 }}>
              From zero to AI governance<br />
              <span className="gradient-text">in 5 minutes.</span>
            </h1>
            <p className="section-desc">
              Built for engineers. No 6-week onboarding. No enterprise consultants.
              Connect your first AI system, see risks surface in real time, and generate
              your first compliance report — before your next standup.
            </p>
          </div>

          {/* Doc navigation */}
          <div className="docs-nav-grid">
            {DOC_SECTIONS.map((section, i) => (
              <div key={i} className="docs-nav-section">
                <div className="docs-nav-category">{section.category}</div>
                {section.docs.map((doc, j) => (
                  <a key={j} href="#quickstart" className="docs-nav-link">
                    {doc.badge && <span className="docs-nav-badge">{doc.badge}</span>}
                    <span className="docs-nav-title">{doc.title}</span>
                    <span className="docs-nav-desc">{doc.desc}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="section" style={{ background: 'var(--bg2)' }} id="quickstart">
        <div className="container">
          <div className="section-label">Quickstart</div>
          <h2 className="section-title">5-Minute Integration Guide</h2>
          <p className="section-desc">
            Connect an AI system, capture decisions, and generate a compliance report.
            Works with any ML model, LLM, or decision engine.
          </p>

          <div className="qs-steps">
            {QUICKSTART_STEPS.map((step, i) => (
              <StepBlock key={i} step={step} index={i} />
            ))}
          </div>

          {/* Total time callout */}
          <div className="qs-time-callout">
            <div className="qs-time-icon">⚡</div>
            <div>
              <strong>Total setup time: under 5 minutes.</strong>
              <p>
                Your AI system is now monitored, every decision is logged to an immutable audit trail,
                and you can generate a compliance report on demand. All without changing your model code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2>
            Ready to connect your<br />
            <span className="gradient-text">first AI system?</span>
          </h2>
          <p>Get your API key and see your first risk alert in under 5 minutes.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => setContactOpen(true)} style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
              Get API Key — Free
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
