const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// ─── Verify JWT ───────────────────────────────────────────────────────────────
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized — no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).populate('organization');

    if (!req.user || !req.user.isActive) {
      return res.status(401).json({ success: false, error: 'User not found or deactivated' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// ─── Role-Based Access Control ────────────────────────────────────────────────
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Role '${req.user.role}' is not authorized for this action`,
      });
    }
    next();
  };
};

// ─── Audit Logger Middleware ──────────────────────────────────────────────────
const auditLog = (action, category = 'system', severity = 'info') => {
  return async (req, res, next) => {
    res.on('finish', async () => {
      try {
        if (req.user) {
          await AuditLog.create({
            organization: req.user.organization?._id || req.user.organization,
            user: req.user._id,
            aiSystem: req.body?.aiSystemId || req.params?.id || null,
            action,
            category,
            severity,
            details: {
              method: req.method,
              path: req.path,
              statusCode: res.statusCode,
              body: req.method !== 'GET' ? req.body : undefined,
            },
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
          });
        }
      } catch (e) {
        // Non-blocking — audit failure should not crash the request
        console.error('Audit log error:', e.message);
      }
    });
    next();
  };
};

module.exports = { protect, authorize, auditLog };
