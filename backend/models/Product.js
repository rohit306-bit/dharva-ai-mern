const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    icon: {
      type: String,
      default: '🧠',
    },
    iconBg: {
      type: String,
      default: 'rgba(0,229,200,.1)',
    },
    status: {
      type: String,
      enum: ['live', 'beta', 'alpha', 'coming-soon', 'deprecated'],
      default: 'coming-soon',
    },
    features: [
      {
        title: String,
        description: String,
      },
    ],
    techStack: [String],
    docsUrl: String,
    apiEndpoint: String,
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

// Auto-generate slug from name
ProductSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
