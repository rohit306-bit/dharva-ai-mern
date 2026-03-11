import React, { useState } from 'react';

const TESTIMONIALS = [
  {
    quote: "DHARVA gave us the audit trail we needed to pass our EU AI Act assessment in 6 weeks. What would have taken a team of lawyers months was automated by the compliance generator.",
    name: 'Dr. Sarah Chen',
    title: 'Chief AI Officer',
    company: 'NexaBank Group',
    industry: 'Banking',
    avatar: 'SC',
    color: '#00e5c8',
    metric: { label: 'Time to Compliance', value: '6 weeks' },
  },
  {
    quote: "We deployed DHARVA across our clinical AI portfolio and discovered bias patterns in our triage system that we had no idea existed. The fairness metrics saved us from a serious regulatory violation.",
    name: 'James Okonkwo',
    title: 'VP of Digital Health',
    company: 'Meridian Health Systems',
    industry: 'Healthcare',
    avatar: 'JO',
    color: '#4ade80',
    metric: { label: 'Bias Issues Detected', value: '7 critical' },
  },
  {
    quote: "The impact score engine is genuinely novel. For the first time we can quantify the downstream financial harm of our AI decisions and present that to our board and regulators with confidence.",
    name: 'Priya Sharma',
    title: 'Head of Risk & Compliance',
    company: 'Axiom Insurance',
    industry: 'Insurance',
    avatar: 'PS',
    color: '#818cf8',
    metric: { label: 'Risk Exposure Reduced', value: '$12M' },
  },
  {
    quote: "Our HR team was mandated to assess our hiring AI under the new EU rules. DHARVA's algorithmic accountability report was the only tool that gave us what regulators actually asked for.",
    name: 'Marcus Weber',
    title: 'Chief People Officer',
    company: 'TechForce GmbH',
    industry: 'Technology',
    avatar: 'MW',
    color: '#facc15',
    metric: { label: 'Regulatory Fines Avoided', value: '€2.4M' },
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-inner">
        <div className="section-eyebrow">Customer Stories</div>
        <h2 className="section-title">
          Trusted by AI-forward enterprises
        </h2>
        <p className="section-subtitle">
          From global banks to healthcare systems — leading organizations use DHARVA to govern AI with confidence.
        </p>

        {/* Main Testimonial */}
        <div className="testimonial-feature">
          <div className="testimonial-quote-mark" style={{ color: current.color }}>"</div>
          <blockquote className="testimonial-quote">
            {current.quote}
          </blockquote>
          <div className="testimonial-author">
            <div className="testimonial-avatar" style={{ background: current.color + '22', color: current.color }}>
              {current.avatar}
            </div>
            <div className="testimonial-author-info">
              <span className="testimonial-name">{current.name}</span>
              <span className="testimonial-title">{current.title}, {current.company}</span>
            </div>
            <div className="testimonial-metric">
              <span className="testimonial-metric-val" style={{ color: current.color }}>{current.metric.value}</span>
              <span className="testimonial-metric-label">{current.metric.label}</span>
            </div>
          </div>
        </div>

        {/* Selector Dots */}
        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === active ? 'testimonial-dot--active' : ''}`}
              style={{ background: i === active ? current.color : undefined }}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* Testimonial Cards Row */}
        <div className="testimonial-cards">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              className={`testimonial-card ${i === active ? 'testimonial-card--active' : ''}`}
              style={{ '--t-color': t.color }}
              onClick={() => setActive(i)}
            >
              <div className="testimonial-card-top">
                <div className="testimonial-card-avatar" style={{ background: t.color + '22', color: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="testimonial-card-name">{t.name}</div>
                  <div className="testimonial-card-company">{t.company}</div>
                </div>
              </div>
              <div className="testimonial-card-metric" style={{ color: t.color }}>{t.metric.value}</div>
              <div className="testimonial-card-metric-label">{t.metric.label}</div>
            </button>
          ))}
        </div>

        {/* Logos Row */}
        <div className="testimonial-logos">
          <span className="testimonial-logos-label">Trusted by teams at</span>
          <div className="testimonial-logos-row">
            {['NexaBank Group', 'Meridian Health', 'Axiom Insurance', 'TechForce GmbH', 'Atlas Capital', 'Sentinel Gov'].map((name) => (
              <div key={name} className="testimonial-logo-badge">{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
