const Contact = require('../models/Contact');

// @desc    Submit contact / demo / waitlist form
// @route   POST /api/v1/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // TODO: Send notification email via nodemailer
    // await sendEmail({ to: process.env.FROM_EMAIL, subject: `New ${contact.type}`, ... })

    res.status(201).json({
      success: true,
      message: 'Thank you! We\'ll be in touch shortly.',
      data: { id: contact._id, type: contact.type },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Join waitlist for a product
// @route   POST /api/v1/contact/waitlist
// @access  Public
exports.joinWaitlist = async (req, res) => {
  try {
    const { email, name, product } = req.body;

    // Check if already on waitlist
    const existing = await Contact.findOne({ email, type: 'waitlist', product });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'You\'re already on the waitlist!',
      });
    }

    const contact = await Contact.create({
      email,
      name: name || 'Waitlist User',
      type: 'waitlist',
      product,
    });

    res.status(201).json({
      success: true,
      message: 'You\'re on the waitlist! We\'ll notify you at launch.',
      data: { id: contact._id },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Subscribe to newsletter
// @route   POST /api/v1/contact/newsletter
// @access  Public
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await Contact.findOne({ email, type: 'newsletter' });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Already subscribed!' });
    }

    await Contact.create({ email, name: 'Subscriber', type: 'newsletter' });

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully!',
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all contacts (admin)
// @route   GET /api/v1/contact
// @access  Private (Admin)
exports.getContacts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;

    const contacts = await Contact.find(filter).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
