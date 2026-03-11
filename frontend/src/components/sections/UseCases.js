import React, { useState } from 'react';

const USE_CASES = [
  {
    id: 'banking',
    icon: '◈',
    color: '#00e5c8',
    title: 'AI in Banking',
    subtitle: 'Credit & Lending',
    challenge: 'Automated credit scoring and lending decisions affect millions of loan applicants daily, with disparate approval rates across demographic groups going undetected.',
    solution: 'DHARVA monitors every automated lending decision, calculates fairness metrics across protected classes, generates EU AI Act-compliant documentation, and triggers alerts when approval rate disparities exceed defined thresholds.',
    metrics: [
      { label: 'Decisions Audited', value: '2.4M/day' },
      { label: 'Bias Reduction', value: '34%' },
      { label: 'Compliance Score', value: '94%' },
    ],
    tags: ['Credit Scoring', 'Loan Approval', 'Fair Lending', 'ECOA Compliance'],
  },
  {
    id: 'healthcare',
    icon: '⊕',
    color: '#4ade80',
    title: 'AI in Healthcare',
    subtitle: 'Clinical Triage & Diagnosis',
    challenge: 'AI triage and diagnostic systems can perpetuate historical healthcare disparities, with errors in underserved populations going unmeasured until harm has already occurred.',
    solution: 'DHARVA continuously monitors clinical AI systems for outcome equity across patient demographics, generates HIPAA-aligned documentation, and maintains immutable audit trails for regulatory inspections.',
    metrics: [
      { label: 'Patient Safety Events', value: '-61%' },
      { label: 'Regulatory Readiness', value: '99%' },
      { label: 'Equity Score', value: '88/100' },
    ],
    tags: ['Clinical AI', 'Diagnostic Systems', 'Health Equity', 'FDA Compliance'],
  },
  {
    id: 'insurance',
    icon: '◳',
    color: '#818cf8',
    title: 'AI in Insurance',
    subtitle: 'Claims & Underwriting',
    challenge: 'Algorithmic underwriting and claims processing systems can produce discriminatory outcomes based on zip code, demographics, or correlated proxy variables without detection.',
    solution: 'DHARVA tracks claim approval patterns, identifies prohibited factor correlations, scores compliance with state insurance regulations, and generates auditable impact reports for regulators.',
    metrics: [
      { label: 'Proxy Variables Detected', value: '12' },
      { label: 'State Compliance', value: '100%' },
      { label: 'Audit Time Saved', value: '80%' },
    ],
    tags: ['Claims Processing', 'Underwriting AI', 'Actuarial Fairness', 'State Regulation'],
  },
  {
    id: 'hiring',
    icon: '⬡',
    color: '#facc15',
    title: 'AI in Hiring',
    subtitle: 'Recruitment & Screening',
    challenge: 'Automated resume screening and candidate ranking systems are among the most legally exposed AI applications, with documented cases of discrimination against protected groups.',
    solution: 'DHARVA provides real-time equal opportunity analysis for hiring AI, generates algorithmic accountability reports, measures adverse impact ratios, and produces documentation required under EEOC and EU AI Act.',
    metrics: [
      { label: 'Protected Groups Monitored', value: '8' },
      { label: 'Adverse Impact Events', value: '-78%' },
      { label: 'EEOC Readiness', value: '97%' },
    ],
    tags: ['Resume Screening', 'ATS Systems', 'Adverse Impact', 'EEOC Compliance'],
  },
];

export default function UseCases() {
  const [active, setActive] = useState('banking');
  const current = USE_CASES.find((u) => u.id === active);

  return (
    <section className="usecases-section" id="use-cases">
      <div className="usecases-inner">
        <div className="section-eyebrow">Enterprise Use Cases</div>
        <h2 className="section-title">
          Built for high-stakes AI domains
        </h2>
        <p className="section-subtitle">
          DHARVA deploys across the industries where AI decisions have the highest real-world consequences.
        </p>

        {/* Tab Nav */}
        <div className="usecases-tabs">
          {USE_CASES.map((u) => (
            <button
              key={u.id}
              className={`usecase-tab ${active === u.id ? 'usecase-tab--active' : ''}`}
              style={{ '--uc-color': u.color }}
              onClick={() => setActive(u.id)}
            >
              <span className="usecase-tab-icon" style={{ color: u.color }}>{u.icon}</span>
              <span>{u.title}</span>
            </button>
          ))}
        </div>

        {/* Active Use Case */}
        {current && (
          <div className="usecase-detail" style={{ '--uc-color': current.color }}>
            <div className="usecase-detail-left">
              <div className="usecase-eyebrow" style={{ color: current.color }}>
                {current.icon} {current.subtitle}
              </div>
              <h3 className="usecase-title">{current.title}</h3>

              <div className="usecase-block">
                <div className="usecase-block-label">The Challenge</div>
                <p>{current.challenge}</p>
              </div>

              <div className="usecase-block">
                <div className="usecase-block-label">DHARVA's Solution</div>
                <p>{current.solution}</p>
              </div>

              <div className="usecase-tags">
                {current.tags.map((t) => (
                  <span key={t} className="usecase-tag" style={{ borderColor: current.color + '44', color: current.color }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="usecase-detail-right">
              <div className="usecase-metrics">
                {current.metrics.map((m, i) => (
                  <div key={i} className="usecase-metric">
                    <div className="usecase-metric-value" style={{ color: current.color }}>{m.value}</div>
                    <div className="usecase-metric-label">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Mock Dashboard Preview */}
              <div className="usecase-preview">
                <div className="usecase-preview-bar">
                  <span className="usecase-preview-dot" />
                  <span className="usecase-preview-dot" />
                  <span className="usecase-preview-dot" />
                  <span className="usecase-preview-title">{current.title} — Impact Dashboard</span>
                </div>
                <div className="usecase-preview-body">
                  <div className="usecase-preview-stat-row">
                    {current.metrics.map((m, i) => (
                      <div key={i} className="usecase-preview-stat">
                        <div className="usecase-preview-val" style={{ color: current.color }}>{m.value}</div>
                        <div className="usecase-preview-lbl">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="usecase-preview-chart">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div
                        key={i}
                        className="usecase-preview-bar-item"
                        style={{
                          height: `${30 + Math.sin(i * 0.8) * 20 + Math.random() * 15}%`,
                          background: i > 18 ? current.color : current.color + '44',
                        }}
                      />
                    ))}
                  </div>
                  <div className="usecase-preview-footer">
                    <span style={{ color: '#4ade80' }}>● System Compliant</span>
                    <span style={{ color: current.color }}>Impact Score: 28/100 ↓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
