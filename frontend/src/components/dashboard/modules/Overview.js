import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const StatCard = ({ label, value, sub, color = '#00e5c8', icon }) => (
  <div className="dash-stat-card">
    <div className="dash-stat-icon" style={{ color }}>{icon}</div>
    <div className="dash-stat-body">
      <div className="dash-stat-value" style={{ color }}>{value}</div>
      <div className="dash-stat-label">{label}</div>
      {sub && <div className="dash-stat-sub">{sub}</div>}
    </div>
  </div>
);

const RISK_COLORS = { minimal: '#00e5c8', low: '#4ade80', medium: '#facc15', high: '#fb923c', critical: '#f87171' };

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/v1/impact/dashboard')
      .then((r) => setData(r.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || {};
  const chart = data?.dailyChart || [];
  const systems = data?.systems || [];

  // Fallback demo data
  const demoChart = Array.from({ length: 30 }, (_, i) => ({
    date: `Mar ${i + 1}`,
    decisions: Math.round(12000 + Math.random() * 3000),
    harmIndex: Math.round(18 + Math.random() * 8),
  }));

  const pieData = [
    { name: 'Minimal', value: 2, color: RISK_COLORS.minimal },
    { name: 'Low', value: 3, color: RISK_COLORS.low },
    { name: 'Medium', value: 4, color: RISK_COLORS.medium },
    { name: 'High', value: 2, color: RISK_COLORS.high },
    { name: 'Critical', value: 1, color: RISK_COLORS.critical },
  ];

  return (
    <div className="dash-module">
      <div className="dash-module-header">
        <div>
          <h2 className="dash-module-title">Impact Overview</h2>
          <p className="dash-module-sub">Real-time AI impact intelligence across your organization</p>
        </div>
        <div className="dash-module-actions">
          <span className="dash-live-badge">● LIVE</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="dash-stats-grid">
        <StatCard icon="⬡" label="Registered AI Systems" value={stats.totalSystems ?? 12} color="#00e5c8" />
        <StatCard icon="◈" label="Decisions / Day" value={`${((stats.totalDecisions || 48500) / 1000).toFixed(1)}K`} color="#818cf8" sub="across all systems" />
        <StatCard icon="◉" label="Avg Impact Score" value={stats.avgImpactScore ?? 34} color="#facc15" sub="/ 100 scale" />
        <StatCard icon="⚠" label="Critical Systems" value={stats.criticalSystems ?? 1} color="#f87171" sub={`${stats.highRiskSystems ?? 2} high risk`} />
      </div>

      {/* Charts Row */}
      <div className="dash-charts-row">
        {/* Daily Decisions Chart */}
        <div className="dash-chart-card dash-chart-card--wide">
          <div className="dash-chart-header">
            <h3>Daily Decisions & Harm Index</h3>
            <span className="dash-chart-period">Last 30 days</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chart.length ? chart : demoChart} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradDecisions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e5c8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00e5c8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradHarm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a2035" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} interval={4} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#0b0f18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area type="monotone" dataKey="decisions" stroke="#00e5c8" fill="url(#gradDecisions)" strokeWidth={2} name="Decisions" />
              <Area type="monotone" dataKey="harmIndex" stroke="#f87171" fill="url(#gradHarm)" strokeWidth={2} name="Harm Index" yAxisId={0} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution Pie */}
        <div className="dash-chart-card">
          <div className="dash-chart-header">
            <h3>Risk Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0b0f18', border: '1px solid #1e293b', borderRadius: 8, color: '#e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="dash-pie-legend">
            {pieData.map((d) => (
              <div key={d.name} className="dash-pie-legend-item">
                <span className="dash-pie-dot" style={{ background: d.color }} />
                <span>{d.name}</span>
                <span className="dash-pie-count">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Systems */}
      <div className="dash-table-card">
        <div className="dash-chart-header">
          <h3>Monitored AI Systems</h3>
          <span className="dash-chart-period">Top by impact score</span>
        </div>
        <table className="dash-table">
          <thead>
            <tr>
              <th>System</th>
              <th>Use Case</th>
              <th>Environment</th>
              <th>Risk Level</th>
              <th>Impact Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(systems.length ? systems : DEMO_SYSTEMS).map((s, i) => (
              <tr key={i}>
                <td className="dash-table-name">{s.name}</td>
                <td className="dash-table-muted">{s.useCase}</td>
                <td className="dash-table-muted">{s.deploymentEnvironment || 'production'}</td>
                <td>
                  <span className={`dash-risk-badge dash-risk-badge--${s.riskLevel}`}>
                    {s.riskLevel}
                  </span>
                </td>
                <td>
                  <div className="dash-score-bar">
                    <div
                      className="dash-score-fill"
                      style={{
                        width: `${s.impactScore || 0}%`,
                        background: s.impactScore > 70 ? '#f87171' : s.impactScore > 45 ? '#facc15' : '#00e5c8',
                      }}
                    />
                    <span className="dash-score-val">{s.impactScore || 0}</span>
                  </div>
                </td>
                <td>
                  <span className={`dash-status-badge dash-status-badge--${s.status}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DEMO_SYSTEMS = [
  { name: 'CreditScoreAI', useCase: 'Lending Decisions', riskLevel: 'high', impactScore: 72, status: 'active' },
  { name: 'HireBot v2', useCase: 'Resume Screening', riskLevel: 'critical', impactScore: 81, status: 'under-review' },
  { name: 'ClaimVision', useCase: 'Insurance Approval', riskLevel: 'medium', impactScore: 43, status: 'active' },
  { name: 'FraudGuard', useCase: 'Fraud Detection', riskLevel: 'low', impactScore: 22, status: 'active' },
  { name: 'TriageAI', useCase: 'Healthcare Triage', riskLevel: 'high', impactScore: 68, status: 'active' },
];
