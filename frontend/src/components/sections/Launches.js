import React from 'react';
import { useReveal } from '../../hooks';

const fallbackLaunches = [
  { _id: '1', icon: '◈', launchDate: 'Q2 2026', title: 'DHARVA Impact Score v2', description: 'Next-generation multi-dimensional impact scoring. Intersectional fairness analysis, real-time exposure calculation, and automated risk classification for high-stakes AI systems.', features: ['Intersectional Fairness', 'Real-time Scoring', 'Risk Classification', 'Exposure Calculation'] },
  { _id: '2', icon: '📋', launchDate: 'Q3 2026', title: 'Compliance Generator — EU AI Act Module', description: 'Automated documentation generation fully aligned to EU AI Act Annex requirements. Produces regulator-ready technical files, risk assessments, and conformity declarations.', features: ['EU AI Act Annex', 'Technical Files', 'Risk Assessment', 'Conformity Docs'] },
  { _id: '3', icon: '🔍', launchDate: 'Q3 2026', title: 'Systemic Risk Radar', description: 'Population-level risk detection across your entire AI decision portfolio. Identifies compounding risks, correlated bias patterns, and systemic exposure before regulatory escalation.', features: ['Population Analysis', 'Compound Risk', 'Bias Correlation', 'Early Alerts'] },
  { _id: '4', icon: '🏛️', launchDate: 'Q4 2026', title: 'Regulator Portal', description: 'Dedicated interface for regulators and auditors to access immutable audit trails, impact reports, and compliance documentation without direct system access.', features: ['Regulator Access', 'Audit Export', 'Immutable Records', 'Read-Only Portal'] },
  { _id: '5', icon: '🔗', launchDate: 'Q4 2026', title: 'Enterprise Integrations Hub', description: 'Pre-built connectors for loan origination systems, clinical decision software, HR platforms, and government case management systems — deploy DHARVA in hours, not months.', features: ['LOS Connectors', 'Clinical AI', 'HR Platforms', 'Gov Systems'] },
  { _id: '6', icon: '🌐', launchDate: 'Q1 2027', title: 'Global Accountability Standard', description: 'DHARVA becomes the interoperability layer between AI governance frameworks globally — mapping decisions to EU AI Act, NIST AI RMF, ISO 42001, and emerging national standards simultaneously.', features: ['Multi-Framework', 'NIST RMF', 'ISO 42001', 'Cross-Border Compliance'] },
];

const TimelineItem = ({ launch, index }) => {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all .6s cubic-bezier(.16,1,.3,1) ${index * 0.1}s`,
      }}
    >
      <div className="timeline-dot">{launch.icon}</div>
      <div className="timeline-body">
        <div className="timeline-date">{launch.launchDate}</div>
        <h4>{launch.title}</h4>
        <p>{launch.description}</p>
        <div className="timeline-features">
          {launch.features.map((feat, i) => (
            <span key={i} className="timeline-feat">{feat}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Launches = ({ launches = [] }) => {
  const data = launches.length > 0 ? launches : fallbackLaunches;

  return (
    <section className="section" id="launches">
      <div className="container">
        <div className="section-label">Product Roadmap</div>
        <div className="section-title">The Vision Ahead</div>
        <p className="section-desc">
          In the next decade, every enterprise will operate hundreds of AI decision systems. Just as companies adopted cloud monitoring and cybersecurity platforms, they will adopt AI impact infrastructure. DHARVA aims to become the global standard.
        </p>
        <div className="timeline">
          {data.map((launch, i) => (
            <TimelineItem key={launch._id} launch={launch} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Launches;
