const Pricing = require('../models/Pricing');

// @desc    Get all pricing plans
// @route   GET /api/v1/pricing
// @access  Public
exports.getPricingPlans = async (req, res) => {
  try {
    const plans = await Pricing.find({ isActive: true }).sort('order');
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create pricing plan
// @route   POST /api/v1/pricing
// @access  Private
exports.createPlan = async (req, res) => {
  try {
    const plan = await Pricing.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update pricing plan
// @route   PUT /api/v1/pricing/:id
// @access  Private
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) return res.status(404).json({ success: false, error: 'Plan not found' });
    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete pricing plan
// @route   DELETE /api/v1/pricing/:id
// @access  Private
exports.deletePlan = async (req, res) => {
  try {
    await Pricing.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
