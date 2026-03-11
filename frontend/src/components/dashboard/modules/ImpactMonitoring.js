import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const MetricCard = ({ label, value, unit, trend, color = '#00e5c8' }) => (
  <div className="dash-metric-card">
    <div className="dash-metric-label">{label}</div>
    <div className="dash-metric-value" style={{ color }}>{value}<span className="dash-metric-unit">{unit}</span></div>
    {trend && <div className={`dash-metric-trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
      {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last period
    </div>}
  </div>
);

// Generate 30-day mock trend
const genTrend = (base, variance) =>
  Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (29 - i));
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return {
      date: label,
      value: Math.max(0, Math.round(base + (Math.random() - 0.5) * variance * 2)),
    };
  });

export default function ImpactMonitoring() {
  const [systems, setSystems] = useState([]);
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      axios.get('/api/v1/ai-systems'),
      axios.get('/api/v1/impact/reports'),
    ]).then(([sysRes, repRes]) => {
      const s = sysRes.status === 'fulfilled' ? sysRes.value.data.aiSystems || [] : DEMO_SYSTEMS;
      const r = repRes.status === 'fulfilled' ? repRes.value.data.reports || [] : [];
      setSystems(s);
      setReports(r);
      if (s.length) setSelected(s[0]);
    }).finally(() => setLoading(false));
  }, []);

  const decisionsData = genTrend(selected?.decisionsPerDay || 12400, 2000);
  const harmData = genTrend(selected?.impactScore ? selected.impactScore * 0.6 : 28, 8);

  const fairnessData = [
    { group: 'Age 18-30', approved: 82, denied: 18 },
    { group: 'Age 31-50', approved: 78, denied: 22 },
    { group: 'Age 51+', approved: 71, denied: 29 },
    { group: 'Male', approved: 80, denied: 20 },
    { group: 'Female', approved: 76, denied: 24 },
    { group: 'Region A', approved: 84, denied: 16 },
    { group: 'Region B', approved: 69, denied: 31 },
  ];

  return (
    <div className="dash-module">
      <div className="dash-module-header">
        <div>
          <h2 className="dash-module-title">Impact Monitoring</h2>
          <p className="dash-module-sub">Real-time harm risk, fairness metrics, and decision tracking</p>
        </div>
        <div className="dash-module-actions">
          <select
            className="dash-select-sm"
            value={selected?._id || selected?.name || ''}
            onChange={(e) => {
              const s = systems.find((x) => (x._id || x.name) === e.target.value);
              if (s) setSelected(s);
            }}
          >
            {systems.map((s, i) => (
              <option key={s._id || i} value={s._id || s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="dash-metrics-row">
        <MetricCard label="Decisions / Day" value={((selected?.decisionsPerDay || 12400) / 1000).toFixed(1) + 'K'} unit="" trend={-3} color="#00e5c8" />
        <MetricCard label="Harm Risk Index" value={selected ? Math.round(selected.impactScore * 0.6) : 28} unit="/100" trend={5} color="#f87171" />
        <MetricCard label="Fairness Score" value={selected ? 100 - Math.round(selected.impactScore * 0.3) : 74} unit="%" trend={-2} color="#4ade80" />
        <MetricCard label="Error Impact" value={selected ? Math.round((selected.impactScore || 30) * 1.2) : 36} unit="" trend={1} color="#facc15" />
      </div>

      {/* Charts */}
      <div className="dash-charts-row">
        {/* Decisions over time */}
        <div className="dash-chart-card dash-chart-card--wide">
          <div className="dash-chart-header">
            <h3>Daily Decisions Volume</h3>
            <span className="dash-chart-period">Last 30 days</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={decisionsData}>
              <defs>
                <linearGradient id="gradD" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} interval={4} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#0b0f18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="value" stroke="#818cf8" fill="url(#gradD)" strokeWidth={2} name="Decisions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Harm Risk Index */}
        <div className="dash-chart-card">
          <div className="dash-chart-header">
            <h3>Harm Risk Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={harmData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} tickLine={false} interval={6} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#0b0f18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} />
              <Line type="monotone" dataKey="value" stroke="#f87171" strokeWidth={2} dot={false} name="Harm Index" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fairness Analysis */}
      <div className="dash-chart-card">
        <div className="dash-chart-header">
          <h3>Fairness Analysis — Decision Rates by Demographic Group</h3>
          <span className="dash-chart-period">{selected?.name || 'CreditScoreAI'}</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={fairnessData} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
            <XAxis dataKey="group" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: '#0b0f18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar dataKey="approved" name="Approved %" fill="#00e5c8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="denied" name="Denied %" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="dash-fairness-note">
          ⚠ Disparity detected: Region B shows 15pp lower approval rate — recommend bias audit
        </div>
      </div>
    </div>
  );
}

const DEMO_SYSTEMS = [
  { name: 'CreditScoreAI', useCase: 'Lending Decisions', riskLevel: 'high', impactScore: 72, decisionsPerDay: 18000 },
  { name: 'HireBot v2', useCase: 'Hiring Automation', riskLevel: 'critical', impactScore: 81, decisionsPerDay: 4200 },
  { name: 'ClaimVision', useCase: 'Insurance Approval', riskLevel: 'medium', impactScore: 43, decisionsPerDay: 8900 },
];
