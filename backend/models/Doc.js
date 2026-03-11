const mongoose = require('mongoose');

const DocSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Doc title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '📖',
    },
    category: {
      type: String,
      enum: ['quickstart', 'api-reference', 'sdk', 'tutorial', 'architecture', 'security', 'cookbook', 'changelog'],
      default: 'tutorial',
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    url: String,
    content: String,
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Doc', DocSchema);
