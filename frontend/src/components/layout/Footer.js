import React from 'react';
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
            <p>Impact Intelligence for the Automated World.</p>
          </div>
          <div className="footer-col">
            <h5>Platform</h5>
            <a href="#products">AI Impact Scoring</a>
            <a href="#products">Decision Monitoring</a>
            <a href="#products">Compliance Docs</a>
            <a href="#products">Audit Trails</a>
            <a href="#products">Risk Detection</a>
            <a href="#products">Regulatory Intelligence</a>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <a href="#docs">Documentation</a>
            <a href="#api">API Reference</a>
            <a href="#docs">SDKs</a>
            <a href="#docs">Compliance Playbooks</a>
            <a href="#docs">Changelog</a>
            <a href="#api">Status Page</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a href="#about">About Us</a>
            <a href="#blog">Blog</a>
            <a href="#careers">Careers</a>
            <a href="#research">Research</a>
            <a href="#contact">Contact</a>
            <a href="#press">Press Kit</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} DHARVA. Impact Intelligence for the Automated World. All rights reserved.</span>
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
