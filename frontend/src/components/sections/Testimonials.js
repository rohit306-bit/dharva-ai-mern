import React from 'react';

const TESTIMONIALS = [
  {
    quote: "DHARVA gave us the audit trail we needed to pass our EU AI Act assessment in 6 weeks. What would have taken a team of lawyers months was automated.",
    name: 'Dr. Sarah Chen',
    title: 'Chief AI Officer',
    company: 'NexaBank Group',
    avatar: 'SC',
    color: '#00e5c8',
    metric: '6 weeks to compliance',
  },
  {
    quote: "We discovered bias patterns in our triage system that we had no idea existed. The fairness metrics saved us from a serious regulatory violation.",
    name: 'James Okonkwo',
    title: 'VP of Digital Health',
    company: 'Meridian Health Systems',
    avatar: 'JO',
    color: '#4ade80',
    metric: '7 critical issues detected',
  },
  {
    quote: "For the first time we can quantify the downstream financial harm of our AI decisions and present that to our board and regulators with confidence.",
    name: 'Priya Sharma',
    title: 'Head of Risk & Compliance',
    company: 'Axiom Insurance',
    avatar: 'PS',
    color: '#818cf8',
    metric: '$12M risk exposure reduced',
  },
  {
    quote: "DHARVA's algorithmic accountability report was the only tool that gave us exactly what regulators asked for. Saved us €2.4M in potential fines.",
    name: 'Marcus Weber',
    title: 'Chief People Officer',
    company: 'TechForce GmbH',
    avatar: 'MW',
    color: '#facc15',
    metric: '€2.4M fines avoided',
  },
  {
    quote: "Deploying DHARVA across our lending portfolio reduced adverse action complaints by 41% and made our quarterly regulatory reviews straightforward.",
    name: 'Aisha Nwosu',
    title: 'Director of AI Governance',
    company: 'Atlas Capital',
    avatar: 'AN',
    color: '#f59e0b',
    metric: '41% fewer complaints',
  },
];

const Card = ({ t }) => (
  <div className="testi-card">
    <p className="testi-quote">"{t.quote}"</p>
    <div className="testi-footer">
      <div className="testi-avatar" style={{ background: t.color + '22', color: t.color }}>{t.avatar}</div>
      <div className="testi-info">
        <span className="testi-name">{t.name}</span>
        <span className="testi-role">{t.title}, {t.company}</span>
      </div>
      <span className="testi-metric" style={{ color: t.color }}>{t.metric}</span>
    </div>
  </div>
);

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="testi-section" id="testimonials">
      <div className="container">
        <div className="testi-header">
          <div className="section-label">Customer Stories</div>
          <div className="section-title">Trusted by AI-forward enterprises</div>
          <p className="section-desc">
            From global banks to healthcare systems — leading organizations use DHARVA
            to govern AI with confidence.
          </p>
        </div>
      </div>

      <div className="testi-stage">
        <div className="testi-fade testi-fade--left" />
        <div className="testi-track">
          {doubled.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
        <div className="testi-fade testi-fade--right" />
      </div>

      <div className="container">
        <div className="testi-logos">
          <span className="testi-logos-label">Trusted by teams at</span>
          {['NexaBank Group', 'Meridian Health', 'Axiom Insurance', 'TechForce GmbH', 'Atlas Capital', 'Sentinel Gov'].map((n) => (
            <div key={n} className="testi-logo-chip">{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
