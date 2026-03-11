const AuditLog = require('../models/AuditLog');

// ─── Get Audit Logs (org-scoped) ──────────────────────────────────────────────
exports.getAuditLogs = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const filter = { organization: orgId };

    if (req.query.category) filter.category = req.query.category;
    if (req.query.severity) filter.severity = req.query.severity;
    if (req.query.aiSystem) filter.aiSystem = req.query.aiSystem;

    // Date range filter
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.createdAt.$lte = new Date(req.query.to);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .populate('user', 'name email')
        .populate('aiSystem', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      AuditLog.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      logs,
    });
  } catch (err) {
    next(err);
  }
};

// ─── Verify Log Integrity ─────────────────────────────────────────────────────
exports.verifyIntegrity = async (req, res, next) => {
  try {
    const crypto = require('crypto');
    const log = await AuditLog.findById(req.params.id);

    if (!log) return res.status(404).json({ success: false, error: 'Log not found' });

    const payload = JSON.stringify({
      organization: log.organization,
      user: log.user,
      aiSystem: log.aiSystem,
      action: log.action,
      category: log.category,
      severity: log.severity,
      details: log.details,
      createdAt: log.createdAt.toISOString(),
    });

    const recomputedHash = crypto.createHash('sha256').update(payload).digest('hex');
    const isValid = recomputedHash === log.hash;

    res.status(200).json({
      success: true,
      logId: log._id,
      isValid,
      storedHash: log.hash,
      message: isValid ? 'Log integrity verified' : 'Log integrity compromised',
    });
  } catch (err) {
    next(err);
  }
};

// ─── Get Audit Stats ──────────────────────────────────────────────────────────
exports.getAuditStats = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;

    const [byCategoryRaw, bySeverityRaw, recent] = await Promise.all([
      AuditLog.aggregate([
        { $match: { organization: orgId } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
      AuditLog.aggregate([
        { $match: { organization: orgId } },
        { $group: { _id: '$severity', count: { $sum: 1 } } },
      ]),
      AuditLog.find({ organization: orgId }).sort({ createdAt: -1 }).limit(5)
        .populate('user', 'name')
        .populate('aiSystem', 'name'),
    ]);

    res.status(200).json({
      success: true,
      byCategory: byCategoryRaw,
      bySeverity: bySeverityRaw,
      recentLogs: recent,
    });
  } catch (err) {
    next(err);
  }
};
