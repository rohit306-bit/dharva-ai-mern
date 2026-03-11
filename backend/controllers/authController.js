const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organization = require('../models/Organization');
const AuditLog = require('../models/AuditLog');

// ─── Helpers ──────────────────────────────────────────────────────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const sendAuth = (res, statusCode, user, message = 'Success') => {
  const token = signToken(user._id);
  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.password;

  res.status(statusCode).json({ success: true, message, token, user: userObj });
};

// ─── Register ─────────────────────────────────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, organizationName, industry } = req.body;

    if (!name || !email || !password || !organizationName) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, password, and organization name' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    // Create org
    const org = await Organization.create({
      name: organizationName,
      industry: industry || 'other',
    });

    // Create user as admin of org
    const user = await User.create({
      name,
      email,
      password,
      role: 'admin',
      organization: org._id,
    });

    // Add user to org members
    org.members.push(user._id);
    await org.save();

    // Audit
    await AuditLog.create({
      organization: org._id,
      user: user._id,
      action: 'user_registered',
      category: 'auth',
      severity: 'info',
      details: { email, organizationName },
      ipAddress: req.ip,
    });

    sendAuth(res, 201, user, 'Account created successfully');
  } catch (err) {
    next(err);
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password').populate('organization');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, error: 'Account is deactivated' });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Audit
    await AuditLog.create({
      organization: user.organization?._id || user.organization,
      user: user._id,
      action: 'user_login',
      category: 'auth',
      severity: 'info',
      details: { email },
      ipAddress: req.ip,
    });

    sendAuth(res, 200, user, 'Logged in successfully');
  } catch (err) {
    next(err);
  }
};

// ─── Get Me ───────────────────────────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('organization');
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// ─── Update Profile ───────────────────────────────────────────────────────────
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    ).populate('organization');

    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};
