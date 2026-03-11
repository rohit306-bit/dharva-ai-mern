import React from 'react';
import { useScrollTo } from '../../hooks';

const STATS = [
  { value: '$5.2T', label: 'AI-Driven Decisions / Year' },
  { value: '73%', label: 'Enterprises Lack AI Audit Tools' },
  { value: '840+', label: 'Regulatory Violations Filed' },
  { value: '$48M', label: 'Avg. Compliance Failure Cost' },
];

const Hero = ({ onOpenContact }) => {
  const scrollTo = useScrollTo();

  return (
    <section className="hero">
      {/* Ambient background */}
      <div className="hero-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-grid" />
      </div>

      {/* Floating network nodes */}
      <div className="hero-nodes" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`hero-node hero-node--${i + 1}`} />
        ))}
        <svg className="hero-connectors" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <line x1="120" y1="80"  x2="380" y2="200" stroke="rgba(0,229,200,.12)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="380" y1="200" x2="620" y2="120" stroke="rgba(0,229,200,.12)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="380" y1="200" x2="500" y2="420" stroke="rgba(139,92,246,.12)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="200" y1="380" x2="500" y2="420" stroke="rgba(0,229,200,.08)" strokeWidth="1" strokeDasharray="4 6"/>
          <line x1="700" y1="350" x2="500" y2="420" stroke="rgba(139,92,246,.08)" strokeWidth="1" strokeDasharray="4 6"/>
        </svg>
      </div>

      <div className="container hero-body">
        {/* Left: Copy */}
        <div className="hero-copy">
          <div className="hero-badge-wrap hero-anim hero-anim--1">
            <span className="badge">Introducing DHARVA — Impact Intelligence for AI Systems</span>
          </div>

          <h1 className="hero-headline hero-anim hero-anim--2">
            AI is making decisions<br />
            that affect <em className="hero-em">millions.</em><br />
            <span className="hero-dim">No one measures the consequences.</span>
          </h1>

          <p className="hero-sub hero-anim hero-anim--3">
            DHARVA is the accountability infrastructure for automated decision systems —
            capturing AI decisions in real time, measuring real-world impact, and generating
            auditable intelligence for regulators, enterprises, and society.
          </p>

          <div className="hero-actions hero-anim hero-anim--4">
            <button className="btn btn-primary" onClick={onOpenContact}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Request Demo
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('products')}>
              View Platform
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Stats strip */}
          <div className="hero-stats hero-anim hero-anim--5">
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code window */}
        <div className="hero-visual hero-anim hero-anim--3">
          <div className="hero-window-glow" />
          <div className="code-window">
            <div className="code-header">
              <span className="code-dot" /><span className="code-dot" /><span className="code-dot" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--text3)', marginLeft: '.5rem' }}>
                impact_monitor.py
              </span>
              <span className="hero-window-live">● LIVE</span>
            </div>
            <div className="code-body">
              <span className="cm"># Connect your AI system to DHARVA</span><br />
              <span className="kw">from</span> dharva <span className="kw">import</span> <span className="fn">ImpactMonitor</span><br /><br />
              client = <span className="fn">ImpactMonitor</span>(api_key=<span className="str">"sk-dharva-..."</span>)<br /><br />
              <span className="cm"># Register and track</span><br />
              system = client.<span className="fn">register</span>(<br />
              &nbsp;&nbsp;name=<span className="str">"loan-approval-v2"</span>,<br />
              &nbsp;&nbsp;regulation=<span className="str">"EU_AI_ACT"</span><br />
              )<br /><br />
              impact = system.<span className="fn">track</span>(decision_id=<span className="str">"d-9f3k"</span>)<br />
              <span className="kw">print</span>(impact.score, impact.fairness_risk)<br /><br />
              <span className="cm"># → ImpactScore(score=28, risk='LOW',</span><br />
              <span className="cm">#     fairness_risk=0.04, compliant=True)</span>
            </div>
          </div>

          {/* Floating metric cards */}
          <div className="hero-float-card hero-float-card--tl">
            <div className="hero-float-dot" style={{ background: '#4ade80' }} />
            <div>
              <div className="hero-float-val">94%</div>
              <div className="hero-float-lbl">Compliance Score</div>
            </div>
          </div>
          <div className="hero-float-card hero-float-card--br">
            <div className="hero-float-dot" style={{ background: '#f43f5e' }} />
            <div>
              <div className="hero-float-val">2 alerts</div>
              <div className="hero-float-lbl">Risk Detected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
