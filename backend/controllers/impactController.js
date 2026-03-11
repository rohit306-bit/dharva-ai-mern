const ImpactReport = require('../models/ImpactReport');
const AISystem = require('../models/AISystem');
const AuditLog = require('../models/AuditLog');

// ─── Impact Score Algorithm ───────────────────────────────────────────────────
const calculateImpactScore = ({ biasRisk, financialRisk, complianceRisk, socialHarmPotential }) => {
  // Weighted scoring: social harm & compliance weighted highest
  const score =
    biasRisk * 0.25 +
    financialRisk * 0.20 +
    complianceRisk * 0.30 +
    socialHarmPotential * 0.25;

  return Math.round(score);
};

const getRiskCategory = (score) => {
  if (score < 15) return 'minimal';
  if (score < 30) return 'low';
  if (score < 55) return 'medium';
  if (score < 75) return 'high';
  return 'critical';
};

// Generate mock 30-day daily trend data
const generateDailyData = (decisionsPerDay, harmRiskIndex) => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const variance = (Math.random() - 0.5) * 0.3;
    return {
      date,
      decisions: Math.round(decisionsPerDay * (1 + variance)),
      harmIndex: Math.max(0, Math.min(100, Math.round(harmRiskIndex * (1 + variance)))),
      fairnessScore: Math.max(0, Math.min(100, Math.round((100 - harmRiskIndex) * (1 + variance * 0.5)))),
    };
  });
};

// ─── Calculate Impact Score ───────────────────────────────────────────────────
exports.calculateImpact = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const { aiSystemId, decisionsPerDay, biasRisk, financialRisk, complianceRisk, socialHarmPotential, notes } = req.body;

    if (!aiSystemId) {
      return res.status(400).json({ success: false, error: 'aiSystemId is required' });
    }

    const system = await AISystem.findOne({ _id: aiSystemId, organization: orgId });
    if (!system) {
      return res.status(404).json({ success: false, error: 'AI System not found' });
    }

    const impactScore = calculateImpactScore({
      biasRisk: biasRisk || 0,
      financialRisk: financialRisk || 0,
      complianceRisk: complianceRisk || 0,
      socialHarmPotential: socialHarmPotential || 0,
    });
    const riskCategory = getRiskCategory(impactScore);

    const harmRiskIndex = Math.round((biasRisk + socialHarmPotential) / 2);
    const fairnessScore = Math.max(0, 100 - harmRiskIndex);
    const dailyData = generateDailyData(decisionsPerDay || 100, harmRiskIndex);

    const report = await ImpactReport.create({
      aiSystem: aiSystemId,
      organization: orgId,
      generatedBy: req.user._id,
      decisionsPerDay: decisionsPerDay || 0,
      biasRisk: biasRisk || 0,
      financialRisk: financialRisk || 0,
      complianceRisk: complianceRisk || 0,
      socialHarmPotential: socialHarmPotential || 0,
      harmRiskIndex,
      fairnessScore,
      errorImpact: Math.round(((biasRisk + financialRisk) / 2) * (decisionsPerDay || 100) / 100),
      impactScore,
      riskCategory,
      period: new Date().toISOString().slice(0, 7),
      dailyData,
      notes,
    });

    // Update AI system's impact score
    await AISystem.findByIdAndUpdate(aiSystemId, {
      impactScore,
      riskLevel: riskCategory === 'critical' ? 'critical' : riskCategory === 'high' ? 'high' : riskCategory === 'medium' ? 'medium' : 'low',
      lastAudit: new Date(),
      decisionsPerDay: decisionsPerDay || system.decisionsPerDay,
    });

    const severity = riskCategory === 'critical' ? 'critical' : riskCategory === 'high' ? 'warning' : 'info';
    await AuditLog.create({
      organization: orgId,
      user: req.user._id,
      aiSystem: aiSystemId,
      action: 'impact_score_calculated',
      category: 'risk-alert',
      severity,
      details: { impactScore, riskCategory },
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, report });
  } catch (err) {
    next(err);
  }
};

// ─── Get Impact Reports ───────────────────────────────────────────────────────
exports.getReports = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const filter = { organization: orgId };
    if (req.query.aiSystemId) filter.aiSystem = req.query.aiSystemId;
    if (req.query.riskCategory) filter.riskCategory = req.query.riskCategory;

    const reports = await ImpactReport.find(filter)
      .populate('aiSystem', 'name useCase riskLevel')
      .sort({ createdAt: -1 })
      .limit(50);

    // Aggregate stats
    const stats = {
      totalReports: reports.length,
      avgImpactScore: reports.length
        ? Math.round(reports.reduce((a, r) => a + (r.impactScore || 0), 0) / reports.length)
        : 0,
      criticalCount: reports.filter((r) => r.riskCategory === 'critical').length,
      highCount: reports.filter((r) => r.riskCategory === 'high').length,
    };

    res.status(200).json({ success: true, stats, reports });
  } catch (err) {
    next(err);
  }
};

// ─── Get Dashboard Overview Stats ────────────────────────────────────────────
exports.getDashboardStats = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;

    const [systems, reports] = await Promise.all([
      AISystem.find({ organization: orgId, isActive: true }),
      ImpactReport.find({ organization: orgId }).sort({ createdAt: -1 }).limit(30),
    ]);

    const totalDecisions = systems.reduce((a, s) => a + (s.decisionsPerDay || 0), 0);
    const avgImpactScore =
      systems.length > 0
        ? Math.round(systems.reduce((a, s) => a + (s.impactScore || 0), 0) / systems.length)
        : 0;
    const criticalSystems = systems.filter((s) => s.riskLevel === 'critical').length;
    const highRiskSystems = systems.filter((s) => s.riskLevel === 'high').length;

    // Build daily chart data (last 30 days)
    const dailyChart = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const variance = (Math.random() - 0.5) * 0.2;
      return {
        date: label,
        decisions: Math.round(totalDecisions * (1 + variance)),
        harmIndex: Math.round(avgImpactScore * 0.6 * (1 + variance)),
      };
    });

    res.status(200).json({
      success: true,
      stats: {
        totalSystems: systems.length,
        totalDecisions,
        avgImpactScore,
        criticalSystems,
        highRiskSystems,
        totalReports: reports.length,
      },
      dailyChart,
      systems: systems.slice(0, 5),
    });
  } catch (err) {
    next(err);
  }
};
