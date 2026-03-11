const mongoose = require('mongoose');

const aiSystemSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'System name is required'], trim: true },
    useCase: { type: String, required: [true, 'Use case is required'] },
    dataSource: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    deploymentEnvironment: {
      type: String,
      enum: ['production', 'staging', 'development'],
      default: 'development',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'under-review', 'suspended'],
      default: 'active',
    },
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    description: { type: String },
    tags: [{ type: String }],
    modelType: { type: String },
    version: { type: String, default: '1.0.0' },
    impactScore: { type: Number, default: 0, min: 0, max: 100 },
    lastAudit: { type: Date },
    decisionsPerDay: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

aiSystemSchema.index({ organization: 1 });
aiSystemSchema.index({ owner: 1 });
aiSystemSchema.index({ status: 1 });

module.exports = mongoose.model('AISystem', aiSystemSchema);
