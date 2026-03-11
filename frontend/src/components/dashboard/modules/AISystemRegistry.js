import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  name: '', useCase: '', dataSource: '', deploymentEnvironment: 'production',
  riskLevel: 'medium', description: '', modelType: '', version: '1.0.0', tags: '',
};

const USE_CASES = [
  'Lending Decisions', 'Hiring Automation', 'Insurance Approval', 'Healthcare Triage',
  'Fraud Detection', 'Algorithmic Trading', 'Content Moderation', 'Autonomous Systems',
  'Credit Scoring', 'Risk Assessment', 'Other',
];

export default function AISystemRegistry() {
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchSystems = async () => {
    try {
      const r = await axios.get('/api/v1/ai-systems');
      setSystems(r.data.aiSystems || []);
    } catch {
      setSystems(DEMO_SYSTEMS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSystems(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.useCase) { toast.error('Name and use case are required'); return; }
    setSubmitting(true);
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [] };
      await axios.post('/api/v1/ai-systems', payload);
      toast.success('AI System registered successfully');
      setShowForm(false);
      setForm(EMPTY_FORM);
      fetchSystems();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to register system');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this AI System?')) return;
    try {
      await axios.delete(`/api/v1/ai-systems/${id}`);
      toast.success('System deactivated');
      fetchSystems();
    } catch {
      toast.error('Failed to deactivate');
    }
  };

  const filtered = filter === 'all' ? systems : systems.filter((s) => s.riskLevel === filter);

  return (
    <div className="dash-module">
      <div className="dash-module-header">
        <div>
          <h2 className="dash-module-title">AI System Registry</h2>
          <p className="dash-module-sub">Register and manage all AI systems in your organization</p>
        </div>
        <button className="dash-btn-primary" onClick={() => setShowForm(true)}>
          + Register System
        </button>
      </div>

      {/* Filters */}
      <div className="dash-filter-bar">
        {['all', 'low', 'medium', 'high', 'critical'].map((f) => (
          <button
            key={f}
            className={`dash-filter-btn ${filter === f ? 'dash-filter-btn--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? `All (${systems.length})` : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Systems Grid */}
      {loading ? (
        <div className="dash-loading">Loading AI systems...</div>
      ) : (
        <div className="dash-systems-grid">
          {filtered.map((s, i) => (
            <div key={s._id || i} className="dash-system-card">
              <div className="dash-system-card-header">
                <div className="dash-system-icon">⬡</div>
                <span className={`dash-risk-badge dash-risk-badge--${s.riskLevel}`}>{s.riskLevel}</span>
              </div>
              <h3 className="dash-system-name">{s.name}</h3>
              <p className="dash-system-usecase">{s.useCase}</p>
              <div className="dash-system-meta">
                <span className="dash-meta-item">
                  <span className="dash-meta-label">Env</span>
                  {s.deploymentEnvironment || 'production'}
                </span>
                <span className="dash-meta-item">
                  <span className="dash-meta-label">Score</span>
                  {s.impactScore || 0}/100
                </span>
              </div>
              <div className="dash-system-footer">
                <span className={`dash-status-badge dash-status-badge--${s.status}`}>{s.status}</span>
                {s._id && (
                  <button className="dash-btn-ghost dash-btn-sm" onClick={() => handleDelete(s._id)}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Register Form Modal */}
      {showForm && (
        <div className="dash-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dash-modal-header">
              <h3>Register AI System</h3>
              <button className="dash-modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form className="dash-modal-form" onSubmit={handleSubmit}>
              <div className="dash-form-row">
                <div className="dash-form-field">
                  <label>System Name *</label>
                  <input name="name" className="dash-input" placeholder="e.g. CreditScoreAI" value={form.name} onChange={handleChange} required />
                </div>
                <div className="dash-form-field">
                  <label>Model Type</label>
                  <input name="modelType" className="dash-input" placeholder="e.g. XGBoost, GPT-4" value={form.modelType} onChange={handleChange} />
                </div>
              </div>
              <div className="dash-form-field">
                <label>Use Case *</label>
                <select name="useCase" className="dash-input" value={form.useCase} onChange={handleChange} required>
                  <option value="">Select use case</option>
                  {USE_CASES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div className="dash-form-field">
                <label>Description</label>
                <textarea name="description" className="dash-input dash-textarea" placeholder="Describe the system's purpose and function..." value={form.description} onChange={handleChange} rows={3} />
              </div>
              <div className="dash-form-row">
                <div className="dash-form-field">
                  <label>Data Source</label>
                  <input name="dataSource" className="dash-input" placeholder="e.g. Internal CRM, External API" value={form.dataSource} onChange={handleChange} />
                </div>
                <div className="dash-form-field">
                  <label>Version</label>
                  <input name="version" className="dash-input" placeholder="1.0.0" value={form.version} onChange={handleChange} />
                </div>
              </div>
              <div className="dash-form-row">
                <div className="dash-form-field">
                  <label>Deployment Environment</label>
                  <select name="deploymentEnvironment" className="dash-input" value={form.deploymentEnvironment} onChange={handleChange}>
                    <option value="production">Production</option>
                    <option value="staging">Staging</option>
                    <option value="development">Development</option>
                  </select>
                </div>
                <div className="dash-form-field">
                  <label>Initial Risk Level</label>
                  <select name="riskLevel" className="dash-input" value={form.riskLevel} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              <div className="dash-form-field">
                <label>Tags (comma-separated)</label>
                <input name="tags" className="dash-input" placeholder="lending, ml, gdpr-relevant" value={form.tags} onChange={handleChange} />
              </div>
              <div className="dash-modal-actions">
                <button type="button" className="dash-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="dash-btn-primary" disabled={submitting}>
                  {submitting ? 'Registering...' : 'Register System'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const DEMO_SYSTEMS = [
  { name: 'CreditScoreAI', useCase: 'Lending Decisions', deploymentEnvironment: 'production', riskLevel: 'high', impactScore: 72, status: 'active' },
  { name: 'HireBot v2', useCase: 'Hiring Automation', deploymentEnvironment: 'production', riskLevel: 'critical', impactScore: 81, status: 'under-review' },
  { name: 'ClaimVision', useCase: 'Insurance Approval', deploymentEnvironment: 'staging', riskLevel: 'medium', impactScore: 43, status: 'active' },
  { name: 'FraudGuard', useCase: 'Fraud Detection', deploymentEnvironment: 'production', riskLevel: 'low', impactScore: 22, status: 'active' },
  { name: 'TriageAI', useCase: 'Healthcare Triage', deploymentEnvironment: 'production', riskLevel: 'high', impactScore: 68, status: 'active' },
  { name: 'TradeSentinel', useCase: 'Algorithmic Trading', deploymentEnvironment: 'production', riskLevel: 'medium', impactScore: 39, status: 'active' },
];
