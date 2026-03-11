import React from 'react';
import { useScrollTo } from '../../hooks';

const Hero = ({ onOpenContact }) => {
  const scrollTo = useScrollTo();

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="container hero-content">
        <div style={{ marginBottom: '2rem' }}>
          <span className="badge">Introducing DHARVA — Impact Intelligence for AI Systems</span>
        </div>

        <h1>
          AI is making decisions that affect<br />millions of people.<br />
          <em>No one is measuring the consequences.</em>
        </h1>

        <p className="hero-sub">
          DHARVA is the accountability infrastructure for automated decision systems.
          We capture AI decisions in real time, measure their real-world impact, and generate
          auditable intelligence for regulators, enterprises, and society.
        </p>

        <p className="hero-sub" style={{ marginTop: '0.75rem', opacity: 0.75 }}>
          Understand what your AI actually does in the world.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={onOpenContact}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Request Demo
          </button>
          <button className="btn btn-ghost" onClick={() => scrollTo('products')}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
            View Platform
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat"><strong>$5.2T</strong><span>AI-Driven Decisions / Year</span></div>
          <div className="hero-stat"><strong>73%</strong><span>Enterprises Lack AI Audit Tools</span></div>
          <div className="hero-stat"><strong>840+</strong><span>Regulatory Violations Filed</span></div>
          <div className="hero-stat"><strong>$48M</strong><span>Avg. Compliance Failure Cost</span></div>
        </div>
      </div>

      {/* Floating Code Snippet */}
      <div className="hero-visual">
        <div className="code-window">
          <div className="code-header">
            <span className="code-dot" /><span className="code-dot" /><span className="code-dot" />
            <span>impact_monitor.py</span>
          </div>
          <div className="code-body">
            <span className="cm"># Connect and monitor your AI system</span><br />
            <span className="kw">from</span> dharva <span className="kw">import</span> <span className="fn">ImpactMonitor</span><br /><br />
            <span className="cm"># Initialize with your API key</span><br />
            client = <span className="fn">ImpactMonitor</span>(api_key=<span className="str">"sk-dharva-..."</span>)<br /><br />
            <span className="cm"># Register your AI system</span><br />
            system = client.<span className="fn">register</span>(<br />
            &nbsp;&nbsp;name=<span className="str">"loan-approval-v2"</span>,<br />
            &nbsp;&nbsp;type=<span className="str">"credit_scoring"</span>,<br />
            &nbsp;&nbsp;regulation=<span className="str">"EU_AI_ACT"</span><br />
            )<br /><br />
            <span className="cm"># Track and measure every decision</span><br />
            impact = system.<span className="fn">track</span>(decision_id=<span className="str">"d-9f3k"</span>)<br />
            <span className="kw">print</span>(impact.score, impact.fairness_risk)
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
