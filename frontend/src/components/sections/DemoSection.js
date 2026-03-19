import { useReveal } from '../../hooks';

const DEMO_STEPS = [
  {
    step: '01',
    title: 'Connect your AI system',
    desc: 'One API call or SDK import. Supports Python, Node.js, REST. No infrastructure changes required.',
    code: `from dharva import DharvaClient

client = DharvaClient(api_key="sk-dharva-...")
system = client.connect("loan-approval-v3",
  framework="EU_AI_ACT",
  risk_tier="HIGH"
)
# ✓ Connected in 12ms`,
  },
  {
    step: '02',
    title: 'Every decision is monitored',
    desc: 'Dharva intercepts and logs every AI decision with full context — input, output, model version, confidence score.',
    code: `# Your existing code — unchanged
result = model.predict(applicant_data)

# Dharva captures it automatically
# {
#   decision_id: "d-9f3k2",
#   output: "REJECTED",
#   confidence: 0.87,
#   risk_flags: ["bias_risk"],
#   timestamp: "2026-03-20T14:23:01Z"
# }`,
  },
  {
    step: '03',
    title: 'Risks surface in real time',
    desc: 'Hallucinations, bias patterns, drift signals, and unsafe outputs are flagged before they cause damage.',
    code: `# Real-time risk alert
{
  "alert": "BIAS_DRIFT_DETECTED",
  "system": "loan-approval-v3",
  "metric": "demographic_parity",
  "affected_group": "age_group_55+",
  "deviation": "+0.18",  // threshold: 0.10
  "decisions_affected": 247,
  "severity": "HIGH"
}`,
  },
  {
    step: '04',
    title: 'Audit reports, auto-generated',
    desc: 'EU AI Act, RBI, CDSCO, NABH — generate regulator-ready compliance documentation on demand.',
    code: `# Generate compliance report
report = client.compliance.generate(
  system_id="loan-approval-v3",
  framework="EU_AI_ACT",
  period="Q1_2026"
)

report.export("pdf")
# ✓ 47-page audit-ready document
# ✓ Signed with tamper-proof hash`,
  },
];

export default function DemoSection() {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section className="demo-section" id="demo">
      <div className="container">
        <div
          ref={headerRef}
          className="demo-header"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all .6s var(--ease)',
          }}
        >
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            From zero visibility to full AI governance<br />
            <span className="gradient-text">in under 5 minutes.</span>
          </h2>
          <p className="section-desc">
            No rip-and-replace. No months of implementation. Dharva wraps around your existing
            AI systems as a lightweight observability layer — and starts surfacing risks immediately.
          </p>
        </div>

        {/* Demo steps */}
        <div className="demo-steps">
          {DEMO_STEPS.map((step, i) => (
            <DemoStep key={i} step={step} index={i} />
          ))}
        </div>

        {/* 60-second demo CTA */}
        <div className="demo-video-block">
          <div className="demo-video-frame">
            <div className="demo-video-overlay">
              <div className="demo-play-btn">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                </svg>
              </div>
              <div className="demo-video-label">Watch 60-second product walkthrough</div>
              <div className="demo-video-sub">See Dharva detect a live bias violation in a credit scoring model</div>
            </div>
            {/* Dashboard visualization */}
            <div className="demo-video-bg">
              <div className="demo-fake-dashboard">
                <div className="demo-dash-row">
                  <span className="demo-dash-label">loan-approval-v3</span>
                  <span className="demo-dash-bar">
                    <span className="demo-dash-fill demo-dash-fill--high" />
                  </span>
                  <span className="demo-dash-val demo-dash-val--high">HIGH RISK</span>
                </div>
                <div className="demo-dash-row">
                  <span className="demo-dash-label">fraud-detect-ml</span>
                  <span className="demo-dash-bar">
                    <span className="demo-dash-fill demo-dash-fill--low" />
                  </span>
                  <span className="demo-dash-val demo-dash-val--low">LOW RISK</span>
                </div>
                <div className="demo-dash-row">
                  <span className="demo-dash-label">clinical-triage-v2</span>
                  <span className="demo-dash-bar">
                    <span className="demo-dash-fill demo-dash-fill--med" />
                  </span>
                  <span className="demo-dash-val demo-dash-val--med">MODERATE</span>
                </div>
                <div className="demo-dash-alert">
                  <span>⚠ Bias drift detected — demographic_parity violation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoStep({ step, index }) {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className="demo-step"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: `all .6s var(--ease) ${index * 0.12}s`,
      }}
    >
      <div className="demo-step-left">
        <div className="demo-step-num">{step.step}</div>
        <div className="demo-step-line" />
      </div>
      <div className="demo-step-right">
        <h4 className="demo-step-title">{step.title}</h4>
        <p className="demo-step-desc">{step.desc}</p>
        <div className="code-window demo-step-code">
          <div className="code-header">
            <span className="code-dot" /><span className="code-dot" /><span className="code-dot" />
          </div>
          <pre className="code-body demo-code-pre">{step.code}</pre>
        </div>
      </div>
    </div>
  );
}
