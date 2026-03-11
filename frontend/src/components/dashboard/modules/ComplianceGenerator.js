import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FRAMEWORKS = [
  { id: 'eu-ai-act', label: 'EU AI Act', region: 'EU', color: '#818cf8', desc: 'Comprehensive AI risk classification & documentation' },
  { id: 'iso-42001', label: 'ISO/IEC 42001', region: 'Global', color: '#00e5c8', desc: 'AI Management System standard' },
  { id: 'algorithmic-accountability', label: 'Algorithmic Accountability', region: 'US', color: '#4ade80', desc: 'Impact assessments & bias testing' },
  { id: 'gdpr', label: 'GDPR', region: 'EU', color: '#facc15', desc: 'Data protection for automated decisions' },
  { id: 'nist-ai-rmf', label: 'NIST AI RMF', region: 'US', color: '#fb923c', desc: 'AI risk management framework' },
];

const STATUS_COLORS = { draft: '#94a3b8', review: '#facc15', approved: '#4ade80', expired: '#f87171' };

export default function ComplianceGenerator() {
  const [systems, setSystems] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [generating, setGenerating] = useState(false);
  const [viewDoc, setViewDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [sysRes, docRes] = await Promise.allSettled([
        axios.get('/api/v1/ai-systems'),
        axios.get('/api/v1/compliance/documents'),
      ]);
      const s = sysRes.status === 'fulfilled' ? sysRes.value.data.aiSystems || [] : DEMO_SYSTEMS;
      const d = docRes.status === 'fulfilled' ? docRes.value.data.documents || [] : DEMO_DOCS;
      setSystems(s);
      setDocuments(d);
      if (s.length) setSelectedSystem(s[0]._id || s[0].name || '');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleGenerate = async () => {
    if (!selectedSystem || !selectedFramework) {
      toast.error('Select an AI system and compliance framework');
      return;
    }
    setGenerating(true);
    try {
      await axios.post('/api/v1/compliance/generate', {
        aiSystemId: selectedSystem,
        framework: selectedFramework,
      });
      toast.success('Compliance document generated');
      fetchData();
      setSelectedFramework('');
    } catch (err) {
      // Offline fallback — show demo doc
      const sys = systems.find((s) => (s._id || s.name) === selectedSystem);
      const fw = FRAMEWORKS.find((f) => f.id === selectedFramework);
      const demoDoc = {
        _id: 'demo-' + Date.now(),
        title: `${fw?.label} Compliance Report — ${sys?.name || 'AI System'}`,
        framework: selectedFramework,
        status: 'draft',
        aiSystem: { name: sys?.name || 'AI System' },
        createdAt: new Date().toISOString(),
        content: {
          summary: `Auto-generated compliance document for ${sys?.name || 'AI System'} under ${fw?.label}.`,
          complianceScore: 72,
          sections: [
            { heading: '1. System Overview', body: `The AI system "${sys?.name}" operates in a ${sys?.deploymentEnvironment || 'production'} environment and is classified under ${fw?.label} framework requirements.` },
            { heading: '2. Risk Assessment', body: 'A comprehensive risk assessment has been conducted identifying key areas of compliance concern.' },
            { heading: '3. Mitigation Measures', body: 'Technical and organizational measures have been implemented to mitigate identified risks.' },
          ],
          recommendations: [
            'Conduct quarterly bias audits',
            'Implement human oversight protocols',
            'Maintain immutable audit logs',
          ],
        },
      };
      setDocuments((d) => [demoDoc, ...d]);
      toast.success('Document generated (offline mode)');
    } finally {
      setGenerating(false);
    }
  };

  const handleStatusUpdate = async (docId, status) => {
    try {
      await axios.patch(`/api/v1/compliance/documents/${docId}/status`, { status });
      toast.success(`Status updated to ${status}`);
      fetchData();
    } catch {
      setDocuments((docs) => docs.map((d) => d._id === docId ? { ...d, status } : d));
    }
  };

  return (
    <div className="dash-module">
      <div className="dash-module-header">
        <div>
          <h2 className="dash-module-title">Compliance Generator</h2>
          <p className="dash-module-sub">Auto-generate regulatory compliance documents for your AI systems</p>
        </div>
      </div>

      {/* Generator Panel */}
      <div className="dash-compliance-generator">
        <div className="dash-compliance-step">
          <div className="dash-step-num">1</div>
          <div className="dash-step-body">
            <h4>Select AI System</h4>
            <select className="dash-input" value={selectedSystem} onChange={(e) => setSelectedSystem(e.target.value)}>
              <option value="">-- Choose system --</option>
              {systems.map((s, i) => (
                <option key={s._id || i} value={s._id || s.name}>{s.name} — {s.useCase}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="dash-compliance-step">
          <div className="dash-step-num">2</div>
          <div className="dash-step-body">
            <h4>Select Framework</h4>
            <div className="dash-framework-grid">
              {FRAMEWORKS.map((fw) => (
                <button
                  key={fw.id}
                  className={`dash-framework-card ${selectedFramework === fw.id ? 'dash-framework-card--selected' : ''}`}
                  onClick={() => setSelectedFramework(fw.id)}
                  style={{ '--fw-color': fw.color }}
                >
                  <div className="dash-fw-top">
                    <span className="dash-fw-label" style={{ color: fw.color }}>{fw.label}</span>
                    <span className="dash-fw-region">{fw.region}</span>
                  </div>
                  <p className="dash-fw-desc">{fw.desc}</p>
                  {selectedFramework === fw.id && <span className="dash-fw-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-compliance-step">
          <div className="dash-step-num">3</div>
          <div className="dash-step-body">
            <h4>Generate Document</h4>
            <button
              className="dash-btn-primary"
              onClick={handleGenerate}
              disabled={generating || !selectedSystem || !selectedFramework}
            >
              {generating ? (
                <><span className="dash-spinner-sm" /> Generating...</>
              ) : (
                '◳ Generate Compliance Document'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="dash-table-card">
        <div className="dash-chart-header">
          <h3>Generated Documents</h3>
          <span className="dash-chart-period">{documents.length} documents</span>
        </div>
        {loading ? (
          <div className="dash-loading">Loading documents...</div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Document</th><th>Framework</th><th>System</th><th>Compliance Score</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {(documents.length ? documents : DEMO_DOCS).map((doc, i) => {
                const fw = FRAMEWORKS.find((f) => f.id === doc.framework);
                return (
                  <tr key={doc._id || i}>
                    <td className="dash-table-name">{doc.title}</td>
                    <td>
                      <span style={{ color: fw?.color || '#94a3b8', fontWeight: 500 }}>{fw?.label || doc.framework}</span>
                    </td>
                    <td className="dash-table-muted">{doc.aiSystem?.name || '—'}</td>
                    <td>
                      <span style={{ color: (doc.content?.complianceScore || 70) > 70 ? '#4ade80' : '#facc15', fontWeight: 600 }}>
                        {doc.content?.complianceScore || 70}%
                      </span>
                    </td>
                    <td>
                      <select
                        className="dash-status-select"
                        value={doc.status}
                        style={{ color: STATUS_COLORS[doc.status] }}
                        onChange={(e) => handleStatusUpdate(doc._id, e.target.value)}
                      >
                        <option value="draft">Draft</option>
                        <option value="review">In Review</option>
                        <option value="approved">Approved</option>
                        <option value="expired">Expired</option>
                      </select>
                    </td>
                    <td>
                      <button className="dash-btn-ghost dash-btn-sm" onClick={() => setViewDoc(doc)}>View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Document Viewer Modal */}
      {viewDoc && (
        <div className="dash-modal-overlay" onClick={() => setViewDoc(null)}>
          <div className="dash-modal dash-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>{viewDoc.title}</h3>
              <div className="dash-modal-header-actions">
                <span className="dash-compliance-score">Score: {viewDoc.content?.complianceScore || 70}%</span>
                <button className="dash-modal-close" onClick={() => setViewDoc(null)}>✕</button>
              </div>
            </div>
            <div className="dash-doc-content">
              <p className="dash-doc-summary">{viewDoc.content?.summary}</p>
              {viewDoc.content?.sections?.map((sec, i) => (
                <div key={i} className="dash-doc-section">
                  <h4>{sec.heading}</h4>
                  <p>{sec.body}</p>
                </div>
              ))}
              {viewDoc.content?.recommendations?.length > 0 && (
                <div className="dash-doc-section">
                  <h4>Recommendations</h4>
                  <ul className="dash-doc-recommendations">
                    {viewDoc.content.recommendations.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const DEMO_SYSTEMS = [
  { name: 'CreditScoreAI', useCase: 'Lending Decisions', _id: 'demo-1' },
  { name: 'HireBot v2', useCase: 'Hiring Automation', _id: 'demo-2' },
];

const DEMO_DOCS = [
  {
    _id: 'demo-doc-1',
    title: 'EU AI Act Compliance Report — CreditScoreAI',
    framework: 'eu-ai-act',
    status: 'approved',
    aiSystem: { name: 'CreditScoreAI' },
    createdAt: new Date().toISOString(),
    content: { complianceScore: 84, summary: 'Comprehensive EU AI Act compliance assessment.', sections: [], recommendations: [] },
  },
  {
    _id: 'demo-doc-2',
    title: 'Algorithmic Accountability Report — HireBot v2',
    framework: 'algorithmic-accountability',
    status: 'review',
    aiSystem: { name: 'HireBot v2' },
    createdAt: new Date().toISOString(),
    content: { complianceScore: 61, summary: 'Algorithmic accountability impact assessment for hiring system.', sections: [], recommendations: [] },
  },
];
