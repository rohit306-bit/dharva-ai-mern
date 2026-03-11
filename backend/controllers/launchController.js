const Launch = require('../models/Launch');

// @desc    Get all upcoming launches
// @route   GET /api/v1/launches
// @access  Public
exports.getLaunches = async (req, res) => {
  try {
    const launches = await Launch.find({ isPublic: true })
      .sort('order')
      .populate('product', 'name slug');
    res.status(200).json({
      success: true,
      count: launches.length,
      data: launches,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single launch
// @route   GET /api/v1/launches/:id
// @access  Public
exports.getLaunch = async (req, res) => {
  try {
    const launch = await Launch.findById(req.params.id).populate('product');
    if (!launch) {
      return res.status(404).json({ success: false, error: 'Launch not found' });
    }
    res.status(200).json({ success: true, data: launch });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create launch
// @route   POST /api/v1/launches
// @access  Private (Admin)
exports.createLaunch = async (req, res) => {
  try {
    const launch = await Launch.create(req.body);
    res.status(201).json({ success: true, data: launch });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update launch
// @route   PUT /api/v1/launches/:id
// @access  Private (Admin)
exports.updateLaunch = async (req, res) => {
  try {
    const launch = await Launch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!launch) {
      return res.status(404).json({ success: false, error: 'Launch not found' });
    }
    res.status(200).json({ success: true, data: launch });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete launch
// @route   DELETE /api/v1/launches/:id
// @access  Private (Admin)
exports.deleteLaunch = async (req, res) => {
  try {
    const launch = await Launch.findByIdAndDelete(req.params.id);
    if (!launch) {
      return res.status(404).json({ success: false, error: 'Launch not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
