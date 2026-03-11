const ComplianceDocument = require('../models/ComplianceDocument');
const AISystem = require('../models/AISystem');
const AuditLog = require('../models/AuditLog');

// ─── Framework Templates ──────────────────────────────────────────────────────
const frameworkTemplates = {
  'eu-ai-act': {
    label: 'EU AI Act',
    sections: [
      { heading: '1. Risk Classification', body: 'This AI system has been assessed under Article 6 of the EU AI Act. Based on its use case and deployment context, a risk classification assessment has been completed.' },
      { heading: '2. Technical Documentation', body: 'Technical documentation has been prepared in accordance with Article 11 and Annex IV, covering system architecture, training data, and performance metrics.' },
      { heading: '3. Transparency & Human Oversight', body: 'The system is designed with transparency measures per Article 13, including logging, explainability features, and defined human oversight protocols.' },
      { heading: '4. Data Governance', body: 'Data governance practices comply with Article 10 requirements, including data quality measures, bias mitigation strategies, and data lineage tracking.' },
      { heading: '5. Accuracy, Robustness & Cybersecurity', body: 'The system meets accuracy, robustness, and cybersecurity requirements under Article 15, with continuous monitoring and incident response procedures.' },
      { heading: '6. Conformity Assessment', body: 'Conformity assessment procedures have been followed per Article 43. Documentation is maintained for regulatory audit.' },
    ],
  },
  'iso-42001': {
    label: 'ISO/IEC 42001',
    sections: [
      { heading: '1. AI Management System Scope', body: 'This document establishes the scope of the AI management system in accordance with ISO/IEC 42001:2023 requirements.' },
      { heading: '2. Leadership & Commitment', body: 'Leadership commitment to responsible AI has been documented, with defined roles, responsibilities, and accountability measures.' },
      { heading: '3. Risk Assessment & Treatment', body: 'AI risks have been identified, assessed, and treated per clause 6.1, with documented risk treatment plans and monitoring procedures.' },
      { heading: '4. AI System Impact Assessment', body: 'An AI system impact assessment has been conducted per Annex B, covering societal, organizational, and technical impacts.' },
      { heading: '5. Operational Controls', body: 'Operational planning and controls are in place per clause 8, including data management, model development, and deployment procedures.' },
      { heading: '6. Performance Evaluation', body: 'Performance monitoring, internal audits, and management reviews are scheduled and documented per clause 9.' },
    ],
  },
  'algorithmic-accountability': {
    label: 'Algorithmic Accountability',
    sections: [
      { heading: '1. Algorithm Description', body: 'Complete description of the algorithmic system including inputs, outputs, decision logic, and use context.' },
      { heading: '2. Impact Assessment', body: 'Assessment of potential impacts on individuals, communities, and society, including disparate impact analysis across protected categories.' },
      { heading: '3. Bias & Fairness Analysis', body: 'Statistical analysis of bias across demographic groups with fairness metrics, disparity indices, and mitigation measures.' },
      { heading: '4. Transparency Report', body: 'Public-facing disclosure of algorithmic decision-making practices, including how decisions are made and how they can be contested.' },
      { heading: '5. Audit Findings', body: 'Results of internal and external algorithmic audits, including methodology, findings, and remediation actions taken.' },
      { heading: '6. Accountability Mechanisms', body: 'Documented accountability chain including system owners, oversight bodies, and appeal/redress processes for affected individuals.' },
    ],
  },
  'gdpr': {
    label: 'GDPR Compliance',
    sections: [
      { heading: '1. Lawful Basis for Processing', body: 'Documentation of lawful basis for automated processing under Article 6 and Article 22 for automated decision-making.' },
      { heading: '2. Data Subject Rights', body: 'Procedures for handling data subject rights including access, rectification, erasure, and right to explanation for automated decisions.' },
      { heading: '3. Data Protection Impact Assessment', body: 'DPIA completed per Article 35 for high-risk processing activities, including necessity and proportionality assessment.' },
      { heading: '4. Data Minimization & Purpose Limitation', body: 'Documentation confirming data minimization principles and purpose limitation compliance for all processing activities.' },
      { heading: '5. International Transfers', body: 'Assessment of international data transfers with appropriate safeguards documented per Chapter V.' },
    ],
  },
  'nist-ai-rmf': {
    label: 'NIST AI Risk Management Framework',
    sections: [
      { heading: '1. GOVERN', body: 'AI risk governance structures, policies, and accountability mechanisms established per GOVERN function.' },
      { heading: '2. MAP', body: 'AI risks identified and categorized across technical, operational, and societal dimensions per MAP function.' },
      { heading: '3. MEASURE', body: 'AI risks analyzed and prioritized using quantitative and qualitative metrics per MEASURE function.' },
      { heading: '4. MANAGE', body: 'AI risk treatment plans implemented with monitoring and incident response per MANAGE function.' },
    ],
  },
};

// ─── Generate Compliance Document ────────────────────────────────────────────
exports.generateDocument = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const { aiSystemId, framework } = req.body;

    if (!aiSystemId || !framework) {
      return res.status(400).json({ success: false, error: 'aiSystemId and framework are required' });
    }

    const system = await AISystem.findOne({ _id: aiSystemId, organization: orgId });
    if (!system) {
      return res.status(404).json({ success: false, error: 'AI System not found' });
    }

    const template = frameworkTemplates[framework];
    if (!template) {
      return res.status(400).json({ success: false, error: 'Unknown compliance framework' });
    }

    // Compute a mock compliance score
    const complianceScore = Math.max(40, 100 - system.impactScore * 0.5);

    const doc = await ComplianceDocument.create({
      aiSystem: aiSystemId,
      organization: orgId,
      generatedBy: req.user._id,
      framework,
      title: `${template.label} Compliance Report — ${system.name}`,
      status: 'draft',
      content: {
        summary: `This compliance document has been automatically generated for the AI system "${system.name}" (use case: ${system.useCase}) under the ${template.label} framework. Current impact score: ${system.impactScore}/100. Risk level: ${system.riskLevel}.`,
        sections: template.sections,
        recommendations: [
          'Schedule quarterly bias audits for all production AI systems',
          'Ensure human oversight protocols are documented and tested',
          'Maintain immutable audit logs for all automated decisions',
          'Conduct data quality assessments before each model update',
          'Provide explainability reports to affected stakeholders on request',
        ],
        complianceScore,
      },
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    });

    await AuditLog.create({
      organization: orgId,
      user: req.user._id,
      aiSystem: aiSystemId,
      action: 'compliance_document_generated',
      category: 'compliance',
      severity: 'info',
      details: { framework, title: doc.title, complianceScore },
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, document: doc });
  } catch (err) {
    next(err);
  }
};

// ─── Get All Compliance Documents ────────────────────────────────────────────
exports.getDocuments = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const filter = { organization: orgId };
    if (req.query.framework) filter.framework = req.query.framework;
    if (req.query.status) filter.status = req.query.status;

    const documents = await ComplianceDocument.find(filter)
      .populate('aiSystem', 'name useCase')
      .populate('generatedBy', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: documents.length, documents });
  } catch (err) {
    next(err);
  }
};

// ─── Update Document Status ───────────────────────────────────────────────────
exports.updateDocumentStatus = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const { status } = req.body;

    const doc = await ComplianceDocument.findOneAndUpdate(
      { _id: req.params.id, organization: orgId },
      {
        status,
        ...(status === 'approved' ? { approvedBy: req.user._id, approvedAt: new Date() } : {}),
      },
      { new: true }
    );

    if (!doc) return res.status(404).json({ success: false, error: 'Document not found' });

    res.status(200).json({ success: true, document: doc });
  } catch (err) {
    next(err);
  }
};
