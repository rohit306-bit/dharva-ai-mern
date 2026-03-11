const mongoose = require('mongoose');

const dailyDataSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    decisions: { type: Number, default: 0 },
    harmIndex: { type: Number, default: 0, min: 0, max: 100 },
    fairnessScore: { type: Number, default: 100, min: 0, max: 100 },
  },
  { _id: false }
);

const impactReportSchema = new mongoose.Schema(
  {
    aiSystem: { type: mongoose.Schema.Types.ObjectId, ref: 'AISystem', required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // Input metrics
    decisionsPerDay: { type: Number, default: 0 },
    biasRisk: { type: Number, min: 0, max: 100, default: 0 },
    financialRisk: { type: Number, min: 0, max: 100, default: 0 },
    complianceRisk: { type: Number, min: 0, max: 100, default: 0 },
    socialHarmPotential: { type: Number, min: 0, max: 100, default: 0 },

    // Computed metrics
    harmRiskIndex: { type: Number, min: 0, max: 100, default: 0 },
    fairnessScore: { type: Number, min: 0, max: 100, default: 100 },
    errorImpact: { type: Number, default: 0 },

    // Final scores
    impactScore: { type: Number, min: 0, max: 100 },
    riskCategory: {
      type: String,
      enum: ['minimal', 'low', 'medium', 'high', 'critical'],
    },

    period: { type: String }, // e.g., "2024-01"
    dailyData: [dailyDataSchema],
    notes: { type: String },
  },
  { timestamps: true }
);

impactReportSchema.index({ aiSystem: 1 });
impactReportSchema.index({ organization: 1 });
impactReportSchema.index({ riskCategory: 1 });

module.exports = mongoose.model('ImpactReport', impactReportSchema);
