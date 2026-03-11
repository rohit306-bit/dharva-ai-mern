import React, { useState, useEffect } from 'react';
import axios from 'axios';

const STATUS_META = {
  active: { color: '#4ade80', label: 'Active' },
  proposed: { color: '#facc15', label: 'Proposed' },
  draft: { color: '#94a3b8', label: 'Draft' },
  superseded: { color: '#f87171', label: 'Superseded' },
};

const CATEGORY_ICONS = {
  'comprehensive': '⬛',
  'management-system': '◈',
  'risk-framework': '◉',
  'data-privacy': '🔒',
  'accountability': '◳',
  'principles-based': '⊞',
};

const REGION_COLORS = {
  'European Union': '#818cf8',
  'United States': '#4ade80',
  'Global': '#00e5c8',
  'United Kingdom': '#fb923c',
};

export default function RegulatoryMonitoring() {
  const [frameworks, setFrameworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/v1/regulatory')
      .then((r) => setFrameworks(r.data.frameworks || DEMO_FRAMEWORKS))
      .catch(() => setFrameworks(DEMO_FRAMEWORKS))
      .finally(() => setLoading(false));
  }, []);

  const regions = ['all', ...new Set(frameworks.map((f) => f.region))];
  const filtered = frameworks.filter((f) => {
    const matchRegion = filter === 'all' || f.region === filter;
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <div className="dash-module">
      <div className="dash-module-header">
        <div>
          <h2 className="dash-module-title">Regulatory Monitoring</h2>
          <p className="dash-module-sub">Track global AI regulatory frameworks and compliance requirements</p>
        </div>
        <div className="dash-live-badge">● Updated Daily</div>
      </div>

      {/* Global Coverage Map placeholder */}
      <div className="dash-reg-coverage">
        <div className="dash-reg-coverage-inner">
          {[
            { region: 'European Union', count: 2, color: '#818cf8' },
            { region: 'United States', count: 2, color: '#4ade80' },
            { region: 'Global', count: 1, color: '#00e5c8' },
            { region: 'United Kingdom', count: 1, color: '#fb923c' },
          ].map((r) => (
            <div key={r.region} className="dash-reg-region-card" style={{ borderColor: r.color + '44' }}>
              <div className="dash-reg-region-dot" style={{ background: r.color }} />
              <div className="dash-reg-region-name">{r.region}</div>
              <div className="dash-reg-region-count" style={{ color: r.color }}>{r.count} frameworks</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filter */}
      <div className="dash-filter-bar">
        <input
          className="dash-input dash-search-input"
          placeholder="Search frameworks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="dash-region-filters">
          {regions.map((r) => (
            <button
              key={r}
              className={`dash-filter-btn ${filter === r ? 'dash-filter-btn--active' : ''}`}
              onClick={() => setFilter(r)}
            >
              {r === 'all' ? 'All Regions' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Frameworks Grid */}
      {loading ? (
        <div className="dash-loading">Loading regulatory frameworks...</div>
      ) : (
        <div className="dash-frameworks-grid">
          {filtered.map((fw, i) => {
            const statusMeta = STATUS_META[fw.status] || STATUS_META.active;
            const regionColor = REGION_COLORS[fw.region] || '#94a3b8';
            return (
              <div
                key={fw.id || i}
                className={`dash-framework-detail-card ${selected?.id === fw.id ? 'dash-framework-detail-card--selected' : ''}`}
                onClick={() => setSelected(selected?.id === fw.id ? null : fw)}
              >
                <div className="dash-fw-card-header">
                  <div className="dash-fw-card-top">
                    <span className="dash-fw-card-icon">{CATEGORY_ICONS[fw.category] || '◈'}</span>
                    <div>
                      <h3 className="dash-fw-card-name">{fw.name}</h3>
                      <span className="dash-fw-card-region" style={{ color: regionColor }}>{fw.region}</span>
                    </div>
                  </div>
                  <span className="dash-fw-card-status" style={{ background: statusMeta.color + '22', color: statusMeta.color }}>
                    {statusMeta.label}
                  </span>
                </div>

                <p className="dash-fw-card-desc">{fw.description}</p>

                <div className="dash-fw-card-meta">
                  <span className="dash-fw-meta-item">
                    <span className="dash-meta-label">Effective</span>
                    {fw.effectiveDate || 'TBD'}
                  </span>
                  <span className="dash-fw-meta-item">
                    <span className="dash-meta-label">Max Penalty</span>
                    <span style={{ color: '#f87171' }}>{fw.penaltyMax || 'N/A'}</span>
                  </span>
                </div>

                {/* Expanded Details */}
                {selected?.id === fw.id && (
                  <div className="dash-fw-card-expanded">
                    <h4>Key Requirements</h4>
                    <div className="dash-fw-requirements">
                      {fw.keyRequirements?.map((req, ri) => (
                        <span key={ri} className="dash-fw-req-tag">{req}</span>
                      ))}
                    </div>
                    {fw.riskLevels && (
                      <>
                        <h4>Risk Levels</h4>
                        <div className="dash-fw-requirements">
                          {fw.riskLevels.map((level, li) => (
                            <span key={li} className="dash-fw-req-tag dash-fw-req-tag--risk">{level}</span>
                          ))}
                        </div>
                      </>
                    )}
                    <div className="dash-fw-compliance-status">
                      <div className="dash-fw-compliance-row">
                        <span>Your Systems Assessed</span>
                        <span style={{ color: '#4ade80' }}>3 / 6</span>
                      </div>
                      <div className="dash-fw-compliance-row">
                        <span>Documents Generated</span>
                        <span style={{ color: '#00e5c8' }}>2</span>
                      </div>
                      <div className="dash-fw-compliance-row">
                        <span>Next Review</span>
                        <span style={{ color: '#facc15' }}>90 days</span>
                      </div>
                    </div>
                  </div>
                )}

                <button className="dash-fw-expand-btn">
                  {selected?.id === fw.id ? '▲ Less' : '▼ Details'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Compliance Calendar */}
      <div className="dash-table-card">
        <div className="dash-chart-header">
          <h3>Upcoming Compliance Deadlines</h3>
        </div>
        <table className="dash-table">
          <thead>
            <tr><th>Framework</th><th>Requirement</th><th>Deadline</th><th>Status</th></tr>
          </thead>
          <tbody>
            {COMPLIANCE_DEADLINES.map((d, i) => (
              <tr key={i}>
                <td className="dash-table-name">{d.framework}</td>
                <td className="dash-table-muted">{d.requirement}</td>
                <td style={{ color: d.urgency === 'high' ? '#f87171' : d.urgency === 'medium' ? '#facc15' : '#4ade80' }}>{d.deadline}</td>
                <td><span className={`dash-status-badge dash-status-badge--${d.status}`}>{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DEMO_FRAMEWORKS = [
  { id: 'eu-ai-act', name: 'EU AI Act', region: 'European Union', status: 'active', effectiveDate: '2024-08-01', category: 'comprehensive', description: 'The EU AI Act is the first comprehensive legal framework on AI globally, classifying AI systems by risk level and imposing requirements accordingly.', riskLevels: ['Minimal Risk', 'Limited Risk', 'High Risk', 'Unacceptable Risk'], keyRequirements: ['Risk classification', 'Technical documentation', 'Human oversight', 'Transparency', 'Conformity assessment'], penaltyMax: '€35M or 7% global turnover' },
  { id: 'iso-42001', name: 'ISO/IEC 42001', region: 'Global', status: 'active', effectiveDate: '2023-12-18', category: 'management-system', description: "International standard for AI management systems, providing requirements and guidance for organizations developing, providing, or using AI.", keyRequirements: ['AI governance', 'Risk management', 'Impact assessment', 'Continuous improvement', 'Stakeholder accountability'], penaltyMax: 'N/A (Voluntary)' },
  { id: 'nist-ai-rmf', name: 'NIST AI RMF', region: 'United States', status: 'active', effectiveDate: '2023-01-26', category: 'risk-framework', description: 'NIST AI Risk Management Framework provides organizations with guidance to manage risks related to AI systems throughout their lifecycle.', keyRequirements: ['GOVERN', 'MAP', 'MEASURE', 'MANAGE'], penaltyMax: 'N/A (Voluntary)' },
  { id: 'gdpr-ai', name: 'GDPR (AI Context)', region: 'European Union', status: 'active', effectiveDate: '2018-05-25', category: 'data-privacy', description: 'GDPR Article 22 specifically addresses automated decision-making, requiring safeguards when AI makes legally significant decisions about individuals.', keyRequirements: ['Lawful basis', 'Right to explanation', 'Data minimization', 'DPIA for high-risk AI', 'Cross-border transfer rules'], penaltyMax: '€20M or 4% global turnover' },
  { id: 'algo-accountability', name: 'Algorithmic Accountability Act', region: 'United States', status: 'proposed', effectiveDate: 'TBD', category: 'accountability', description: 'US proposed legislation requiring impact assessments for automated decision systems used in critical sectors.', keyRequirements: ['Impact assessments', 'Bias testing', 'Transparency reports', 'Audit requirements'], penaltyMax: 'TBD' },
  { id: 'uk-ai', name: 'UK AI Regulation', region: 'United Kingdom', status: 'active', effectiveDate: '2023-03-29', category: 'principles-based', description: "UK's pro-innovation approach to AI regulation using existing regulators with cross-sector AI principles.", keyRequirements: ['Safety', 'Transparency', 'Fairness', 'Accountability', 'Contestability'], penaltyMax: 'Sector-dependent' },
];

const COMPLIANCE_DEADLINES = [
  { framework: 'EU AI Act', requirement: 'High-risk system documentation', deadline: 'Jun 2025', status: 'active', urgency: 'high' },
  { framework: 'ISO 42001', requirement: 'Annual management review', deadline: 'Dec 2025', status: 'pending', urgency: 'medium' },
  { framework: 'GDPR', requirement: 'DPIA for lending AI', deadline: 'Apr 2025', status: 'active', urgency: 'high' },
  { framework: 'NIST AI RMF', requirement: 'GOVERN function assessment', deadline: 'Aug 2025', status: 'pending', urgency: 'low' },
];
