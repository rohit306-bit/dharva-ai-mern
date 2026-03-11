const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Static regulatory frameworks data
const frameworks = [
  {
    id: 'eu-ai-act',
    name: 'EU AI Act',
    region: 'European Union',
    status: 'active',
    effectiveDate: '2024-08-01',
    category: 'comprehensive',
    description: 'The EU AI Act is the first comprehensive legal framework on AI globally, classifying AI systems by risk level and imposing requirements accordingly.',
    riskLevels: ['Minimal Risk', 'Limited Risk', 'High Risk', 'Unacceptable Risk'],
    keyRequirements: ['Risk classification', 'Technical documentation', 'Human oversight', 'Transparency', 'Conformity assessment'],
    penaltyMax: '€35M or 7% global turnover',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021PC0206',
  },
  {
    id: 'iso-42001',
    name: 'ISO/IEC 42001',
    region: 'Global',
    status: 'active',
    effectiveDate: '2023-12-18',
    category: 'management-system',
    description: 'International standard for AI management systems, providing requirements and guidance for organizations developing, providing, or using AI.',
    keyRequirements: ['AI governance', 'Risk management', 'Impact assessment', 'Continuous improvement', 'Stakeholder accountability'],
    penaltyMax: 'N/A (Voluntary)',
    url: 'https://www.iso.org/standard/81230.html',
  },
  {
    id: 'nist-ai-rmf',
    name: 'NIST AI RMF',
    region: 'United States',
    status: 'active',
    effectiveDate: '2023-01-26',
    category: 'risk-framework',
    description: 'NIST AI Risk Management Framework provides organizations with guidance to manage risks related to AI systems throughout their lifecycle.',
    keyRequirements: ['GOVERN', 'MAP', 'MEASURE', 'MANAGE'],
    penaltyMax: 'N/A (Voluntary)',
    url: 'https://www.nist.gov/system/files/documents/2023/01/26/AI RMF 1.0.pdf',
  },
  {
    id: 'gdpr-ai',
    name: 'GDPR (AI Context)',
    region: 'European Union',
    status: 'active',
    effectiveDate: '2018-05-25',
    category: 'data-privacy',
    description: 'GDPR Article 22 specifically addresses automated decision-making, requiring safeguards when AI makes legally significant decisions about individuals.',
    keyRequirements: ['Lawful basis', 'Right to explanation', 'Data minimization', 'DPIA for high-risk AI', 'Cross-border transfer rules'],
    penaltyMax: '€20M or 4% global turnover',
    url: 'https://gdpr.eu/',
  },
  {
    id: 'algorithmic-accountability-act',
    name: 'Algorithmic Accountability Act (US)',
    region: 'United States',
    status: 'proposed',
    effectiveDate: 'TBD',
    category: 'accountability',
    description: 'US proposed legislation requiring impact assessments for automated decision systems used in critical sectors.',
    keyRequirements: ['Impact assessments', 'Bias testing', 'Transparency reports', 'Audit requirements'],
    penaltyMax: 'TBD',
    url: 'https://www.congress.gov/',
  },
  {
    id: 'uk-ai-regulation',
    name: 'UK AI Regulation',
    region: 'United Kingdom',
    status: 'active',
    effectiveDate: '2023-03-29',
    category: 'principles-based',
    description: "UK's pro-innovation approach to AI regulation using existing regulators with cross-sector AI principles.",
    keyRequirements: ['Safety', 'Transparency', 'Fairness', 'Accountability', 'Contestability'],
    penaltyMax: 'Sector-dependent',
    url: 'https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach',
  },
];

router.get('/', protect, (req, res) => {
  const { region, status, category } = req.query;
  let result = frameworks;
  if (region) result = result.filter((f) => f.region.toLowerCase().includes(region.toLowerCase()));
  if (status) result = result.filter((f) => f.status === status);
  if (category) result = result.filter((f) => f.category === category);

  res.status(200).json({ success: true, count: result.length, frameworks: result });
});

module.exports = router;
