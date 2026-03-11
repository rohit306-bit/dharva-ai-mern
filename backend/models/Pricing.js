const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    price: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      default: '/mo',
    },
    features: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    ctaText: {
      type: String,
      default: 'Get Started',
    },
    ctaLink: String,
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pricing', PricingSchema);
