const Doc = require('../models/Doc');

// @desc    Get all docs
// @route   GET /api/v1/docs
// @access  Public
exports.getDocs = async (req, res) => {
  try {
    const filter = { isPublished: true };
    if (req.query.category) filter.category = req.query.category;

    const docs = await Doc.find(filter).sort('order');
    res.status(200).json({
      success: true,
      count: docs.length,
      data: docs,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single doc
// @route   GET /api/v1/docs/:id
// @access  Public
exports.getDoc = async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Doc not found' });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create doc
// @route   POST /api/v1/docs
// @access  Private
exports.createDoc = async (req, res) => {
  try {
    const doc = await Doc.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update doc
// @route   PUT /api/v1/docs/:id
// @access  Private
exports.updateDoc = async (req, res) => {
  try {
    const doc = await Doc.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ success: false, error: 'Doc not found' });
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete doc
// @route   DELETE /api/v1/docs/:id
// @access  Private
exports.deleteDoc = async (req, res) => {
  try {
    await Doc.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
