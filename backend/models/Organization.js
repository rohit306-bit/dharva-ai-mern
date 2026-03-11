const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Organization name is required'], trim: true },
    slug: { type: String, unique: true, lowercase: true },
    industry: {
      type: String,
      enum: ['banking', 'healthcare', 'insurance', 'hiring', 'trading', 'retail', 'government', 'other'],
      default: 'other',
    },
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free',
    },
    website: { type: String },
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-1000', '1000+'],
    },
    isActive: { type: Boolean, default: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

organizationSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  next();
});

organizationSchema.index({ slug: 1 });

module.exports = mongoose.model('Organization', organizationSchema);
