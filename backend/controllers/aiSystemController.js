const AISystem = require('../models/AISystem');
const AuditLog = require('../models/AuditLog');

// ─── Get All AI Systems (org-scoped) ─────────────────────────────────────────
exports.getAISystems = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const filter = { organization: orgId, isActive: true };

    if (req.query.status) filter.status = req.query.status;
    if (req.query.riskLevel) filter.riskLevel = req.query.riskLevel;

    const systems = await AISystem.find(filter)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: systems.length, aiSystems: systems });
  } catch (err) {
    next(err);
  }
};

// ─── Get Single AI System ─────────────────────────────────────────────────────
exports.getAISystem = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const system = await AISystem.findOne({ _id: req.params.id, organization: orgId })
      .populate('owner', 'name email');

    if (!system) {
      return res.status(404).json({ success: false, error: 'AI System not found' });
    }

    res.status(200).json({ success: true, aiSystem: system });
  } catch (err) {
    next(err);
  }
};

// ─── Create AI System ─────────────────────────────────────────────────────────
exports.createAISystem = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const { name, useCase, dataSource, deploymentEnvironment, riskLevel, description, tags, modelType, version } = req.body;

    if (!name || !useCase) {
      return res.status(400).json({ success: false, error: 'Name and use case are required' });
    }

    const system = await AISystem.create({
      name,
      useCase,
      dataSource,
      deploymentEnvironment,
      riskLevel,
      description,
      tags,
      modelType,
      version,
      owner: req.user._id,
      organization: orgId,
    });

    await AuditLog.create({
      organization: orgId,
      user: req.user._id,
      aiSystem: system._id,
      action: 'ai_system_registered',
      category: 'model-change',
      severity: 'info',
      details: { name, useCase, deploymentEnvironment },
      ipAddress: req.ip,
    });

    res.status(201).json({ success: true, aiSystem: system });
  } catch (err) {
    next(err);
  }
};

// ─── Update AI System ─────────────────────────────────────────────────────────
exports.updateAISystem = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const system = await AISystem.findOneAndUpdate(
      { _id: req.params.id, organization: orgId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!system) {
      return res.status(404).json({ success: false, error: 'AI System not found' });
    }

    await AuditLog.create({
      organization: orgId,
      user: req.user._id,
      aiSystem: system._id,
      action: 'ai_system_updated',
      category: 'model-change',
      severity: 'info',
      details: req.body,
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, aiSystem: system });
  } catch (err) {
    next(err);
  }
};

// ─── Delete AI System (soft delete) ──────────────────────────────────────────
exports.deleteAISystem = async (req, res, next) => {
  try {
    const orgId = req.user.organization?._id || req.user.organization;
    const system = await AISystem.findOneAndUpdate(
      { _id: req.params.id, organization: orgId },
      { isActive: false },
      { new: true }
    );

    if (!system) {
      return res.status(404).json({ success: false, error: 'AI System not found' });
    }

    await AuditLog.create({
      organization: orgId,
      user: req.user._id,
      aiSystem: system._id,
      action: 'ai_system_deactivated',
      category: 'model-change',
      severity: 'warning',
      details: { name: system.name },
      ipAddress: req.ip,
    });

    res.status(200).json({ success: true, message: 'AI System removed' });
  } catch (err) {
    next(err);
  }
};
