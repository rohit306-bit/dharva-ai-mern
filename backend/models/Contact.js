const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    company: String,
    role: String,
    message: String,
    type: {
      type: String,
      enum: ['contact', 'demo-request', 'newsletter', 'enterprise-inquiry', 'waitlist'],
      default: 'contact',
    },
    product: String,
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', ContactSchema);
