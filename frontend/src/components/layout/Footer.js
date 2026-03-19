import { Link } from 'react-router-dom';
import DharvaLogo from '../ui/DharvaLogo';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{ fontSize: '1.2rem' }}>
              <DharvaLogo size={36} />
              Dharva AI
            </div>
            <p>The AI governance, observability, and accountability control layer for enterprise AI systems.</p>
            <div className="footer-trust-badges">
              <span>🔒 SOC 2 Type II</span>
              <span>📋 ISO 27001</span>
              <span>🇪🇺 EU Data Residency</span>
            </div>
          </div>

          <div className="footer-col">
            <h5>Platform</h5>
            <a href="#products">AI Risk Monitoring</a>
            <a href="#products">Hallucination Detection</a>
            <a href="#products">Bias & Fairness</a>
            <a href="#products">Drift Detection</a>
            <a href="#products">Compliance Automation</a>
            <a href="#products">Audit Trails</a>
          </div>

          <div className="footer-col">
            <h5>Solutions</h5>
            <Link to="/verticals/fintech">Fintech & Banking</Link>
            <Link to="/verticals/healthtech">Healthtech & Clinical</Link>
            <Link to="/verticals/enterprise">Enterprise SaaS</Link>
            <Link to="/product">Product Overview</Link>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="footer-col">
            <h5>Resources</h5>
            <Link to="/docs">Documentation</Link>
            <Link to="/docs#quickstart">5-Min Quickstart</Link>
            <a href="#api">API Reference</a>
            <Link to="/blog">Blog</Link>
            <a href="#docs">Compliance Playbooks</a>
            <a href="#api">Status Page</a>
          </div>

          <div className="footer-col">
            <h5>Company</h5>
            <a href="#about">About Us</a>
            <a href="#careers">Careers</a>
            <a href="#research">Research</a>
            <a href="#contact">Contact</a>
            <a href="#press">Press Kit</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} DHARVA AI · AI Governance & Accountability Platform · All rights reserved.</span>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">GH</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="X">X</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" title="Discord">DC</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
