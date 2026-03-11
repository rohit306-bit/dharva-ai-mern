const mongoose = require('mongoose');

const complianceDocSchema = new mongoose.Schema(
  {
    aiSystem: { type: mongoose.Schema.Types.ObjectId, ref: 'AISystem', required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    framework: {
      type: String,
      enum: ['eu-ai-act', 'iso-42001', 'algorithmic-accountability', 'gdpr', 'ccpa', 'nist-ai-rmf'],
      required: true,
    },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'expired'],
      default: 'draft',
    },

    content: {
      summary: String,
      sections: [
        {
          heading: String,
          body: String,
        },
      ],
      recommendations: [String],
      complianceScore: Number,
    },

    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    approvedAt: { type: Date },
    expiresAt: { type: Date },
    version: { type: String, default: '1.0' },
  },
  { timestamps: true }
);

complianceDocSchema.index({ organization: 1 });
complianceDocSchema.index({ aiSystem: 1 });
complianceDocSchema.index({ framework: 1 });

module.exports = mongoose.model('ComplianceDocument', complianceDocSchema);
