import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const RISK_META = {
  minimal: { color: '#00e5c8', label: 'Minimal Risk', desc: 'System poses negligible societal or financial risk.' },
  low: { color: '#4ade80', label: 'Low Risk', desc: 'Minor risks present. Standard monitoring recommended.' },
  medium: { color: '#facc15', label: 'Medium Risk', desc: 'Moderate risk. Enhanced oversight and bias testing required.' },
  high: { color: '#fb923c', label: 'High Risk', desc: 'Significant harm potential. Mandatory compliance review.' },
  critical: { color: '#f87171', label: 'Critical Risk', desc: 'Immediate intervention required. System should be suspended pending audit.' },
};

const SliderField = ({ label, name, value, onChange, hint }) => (
  <div className="dash-slider-field">
    <div className="dash-slider-header">
      <label className="dash-slider-label">{label}</label>
      <span className="dash-slider-val">{value}/100</span>
    </div>
    <input
      type="range"
      name={name}
      min="0"
      max="100"
      step="1"
      value={value}
      onChange={onChange}
      className="dash-slider"
    />
    {hint && <p className="dash-slider-hint">{hint}</p>}
  </div>
);

export default function ImpactScoreEngine() {
  const [systems, setSystems] = useState([]);
  const [form, setForm] = useState({
    aiSystemId: '',
    decisionsPerDay: 1000,
    biasRisk: 30,
    financialRisk: 25,
    complianceRisk: 40,
    socialHarmPotential: 35,
  });
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      axios.get('/api/v1/ai-systems'),
      axios.get('/api/v1/impact/reports'),
    ]).then(([sysRes, repRes]) => {
      const s = sysRes.status === 'fulfilled' ? sysRes.value.data.aiSystems || [] : DEMO_SYSTEMS;
      const r = repRes.status === 'fulfilled' ? repRes.value.data.reports || [] : [];
      setSystems(s);
      setHistory(r.slice(0, 5));
      if (s.length && !form.aiSystemId) setForm((p) => ({ ...p, aiSystemId: s[0]._id || '' }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === 'aiSystemId' ? value : Number(value) }));
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    if (!form.aiSystemId) { toast.error('Select an AI System'); return; }
    setSubmitting(true);
    try {
      const r = await axios.post('/api/v1/impact/calculate', form);
      setResult(r.data.report);
      toast.success('Impact score calculated');
    } catch (err) {
      // Compute client-side fallback
      const score = Math.round(
        form.biasRisk * 0.25 + form.financialRisk * 0.2 + form.complianceRisk * 0.3 + form.socialHarmPotential * 0.25
      );
      const cat = score < 15 ? 'minimal' : score < 30 ? 'low' : score < 55 ? 'medium' : score < 75 ? 'high' : 'critical';
      setResult({ impactScore: score, riskCategory: cat, biasRisk: form.biasRisk, financialRisk: form.financialRisk, complianceRisk: form.complianceRisk, socialHarmPotential: form.socialHarmPotential });
      toast.success('Score calculated (offline mode)');
    } finally {
      setSubmitting(false);
    }
  };

  const radarData = result ? [
    { metric: 'Bias Risk', value: result.biasRisk || form.biasRisk },
    { metric: 'Financial', value: result.financialRisk || form.financialRisk },
    { metric: 'Compliance', value: result.complianceRisk || form.complianceRisk },
    { metric: 'Social Harm', value: result.socialHarmPotential || form.socialHarmPotential },
    { metric: 'Overall', value: result.impactScore || 0 },
  ] : null;

  const meta = result ? RISK_META[result.riskCategory] || RISK_META.medium : null;

  return (
    <div className="dash-module">
      <div className="dash-module-header">
        <div>
          <h2 className="dash-module-title">AI Impact Score Engine</h2>
          <p className="dash-module-sub">Calculate composite risk and impact scores for your AI systems</p>
        </div>
      </div>

      <div className="dash-score-layout">
        {/* Input Panel */}
        <div className="dash-score-input-panel">
          <form onSubmit={handleCalculate}>
            <div className="dash-form-field">
              <label className="dash-label">Select AI System</label>
              <select name="aiSystemId" className="dash-input" value={form.aiSystemId} onChange={handleChange}>
                <option value="">-- Select system --</option>
                {systems.map((s, i) => (
                  <option key={s._id || i} value={s._id || s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="dash-form-field">
              <label className="dash-label">Decisions per Day</label>
              <input type="number" name="decisionsPerDay" className="dash-input" value={form.decisionsPerDay} onChange={handleChange} min="0" />
            </div>

            <div className="dash-sliders">
              <SliderField
                label="Bias Risk"
                name="biasRisk"
                value={form.biasRisk}
                onChange={handleChange}
                hint="Likelihood of discriminatory outcomes across protected groups"
              />
              <SliderField
                label="Financial Risk"
                name="financialRisk"
                value={form.financialRisk}
                onChange={handleChange}
                hint="Potential financial harm per erroneous decision"
              />
              <SliderField
                label="Compliance Risk"
                name="complianceRisk"
                value={form.complianceRisk}
                onChange={handleChange}
                hint="Exposure to regulatory non-compliance (EU AI Act, GDPR, etc.)"
              />
              <SliderField
                label="Social Harm Potential"
                name="socialHarmPotential"
                value={form.socialHarmPotential}
                onChange={handleChange}
                hint="Broader societal impact of automated decisions at scale"
              />
            </div>

            <button type="submit" className="dash-btn-primary dash-btn-full" disabled={submitting}>
              {submitting ? 'Calculating...' : 'Calculate Impact Score ◉'}
            </button>
          </form>
        </div>

        {/* Result Panel */}
        <div className="dash-score-result-panel">
          {result ? (
            <>
              <div className="dash-score-display" style={{ borderColor: meta.color }}>
                <div className="dash-score-number" style={{ color: meta.color }}>
                  {result.impactScore}
                </div>
                <div className="dash-score-label">Impact Score</div>
                <div className="dash-score-category" style={{ background: meta.color + '22', color: meta.color }}>
                  {meta.label}
                </div>
                <p className="dash-score-desc">{meta.desc}</p>
              </div>

              {/* Radar Chart */}
              <div className="dash-radar-wrap">
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={90}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Radar dataKey="value" stroke={meta.color} fill={meta.color} fillOpacity={0.2} />
                    <Tooltip contentStyle={{ background: '#0b0f18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Breakdown */}
              <div className="dash-score-breakdown">
                {[
                  { key: 'Bias Risk', val: result.biasRisk || form.biasRisk, weight: '25%' },
                  { key: 'Financial Risk', val: result.financialRisk || form.financialRisk, weight: '20%' },
                  { key: 'Compliance Risk', val: result.complianceRisk || form.complianceRisk, weight: '30%' },
                  { key: 'Social Harm', val: result.socialHarmPotential || form.socialHarmPotential, weight: '25%' },
                ].map((item) => (
                  <div key={item.key} className="dash-breakdown-row">
                    <span className="dash-breakdown-key">{item.key}</span>
                    <div className="dash-breakdown-bar-wrap">
                      <div className="dash-breakdown-bar" style={{ width: `${item.val}%`, background: item.val > 70 ? '#f87171' : item.val > 40 ? '#facc15' : '#00e5c8' }} />
                    </div>
                    <span className="dash-breakdown-val">{item.val}</span>
                    <span className="dash-breakdown-weight">{item.weight}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="dash-score-empty">
              <div className="dash-score-empty-icon">◉</div>
              <p>Configure parameters and click<br /><strong>Calculate Impact Score</strong><br />to see your AI system's risk profile</p>
            </div>
          )}
        </div>
      </div>

      {/* Score History */}
      {history.length > 0 && (
        <div className="dash-table-card">
          <div className="dash-chart-header"><h3>Recent Calculations</h3></div>
          <table className="dash-table">
            <thead>
              <tr><th>System</th><th>Impact Score</th><th>Risk Category</th><th>Calculated</th></tr>
            </thead>
            <tbody>
              {history.map((r, i) => {
                const m = RISK_META[r.riskCategory] || RISK_META.medium;
                return (
                  <tr key={i}>
                    <td className="dash-table-name">{r.aiSystem?.name || 'Unknown'}</td>
                    <td><span style={{ color: m.color, fontWeight: 600 }}>{r.impactScore}</span></td>
                    <td><span className={`dash-risk-badge dash-risk-badge--${r.riskCategory}`}>{r.riskCategory}</span></td>
                    <td className="dash-table-muted">{new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const DEMO_SYSTEMS = [
  { name: 'CreditScoreAI', _id: 'demo-1' },
  { name: 'HireBot v2', _id: 'demo-2' },
  { name: 'ClaimVision', _id: 'demo-3' },
];
