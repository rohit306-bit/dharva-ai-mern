const mongoose = require('mongoose');
const crypto = require('crypto');

const auditLogSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    aiSystem: { type: mongoose.Schema.Types.ObjectId, ref: 'AISystem' },

    action: { type: String, required: true },
    category: {
      type: String,
      enum: ['decision', 'model-change', 'risk-alert', 'compliance', 'auth', 'system', 'config'],
      default: 'system',
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical'],
      default: 'info',
    },

    details: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String },
    hash: { type: String }, // SHA-256 for immutability verification
  },
  {
    timestamps: true,
  }
);

// Generate immutable hash before saving
auditLogSchema.pre('save', function (next) {
  const payload = JSON.stringify({
    organization: this.organization,
    user: this.user,
    aiSystem: this.aiSystem,
    action: this.action,
    category: this.category,
    severity: this.severity,
    details: this.details,
    createdAt: new Date().toISOString(),
  });
  this.hash = crypto.createHash('sha256').update(payload).digest('hex');
  next();
});

// No update allowed — audit logs are immutable
auditLogSchema.pre('findOneAndUpdate', function () {
  throw new Error('Audit logs are immutable');
});

auditLogSchema.index({ organization: 1, createdAt: -1 });
auditLogSchema.index({ aiSystem: 1 });
auditLogSchema.index({ severity: 1 });
auditLogSchema.index({ category: 1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
