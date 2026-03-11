const mongoose = require('mongoose');

const LaunchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Launch title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    icon: {
      type: String,
      default: '🚀',
    },
    launchDate: {
      type: String,
      required: [true, 'Launch date label is required'],
    },
    expectedDate: {
      type: Date,
    },
    features: [String],
    status: {
      type: String,
      enum: ['announced', 'in-development', 'private-beta', 'public-beta', 'launched', 'delayed'],
      default: 'announced',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Launch', LaunchSchema);
