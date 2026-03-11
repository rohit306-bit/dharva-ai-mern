const express = require('express');
const router = express.Router();
const {
  submitContact,
  joinWaitlist,
  subscribeNewsletter,
  getContacts,
} = require('../controllers/contactController');

router.route('/').post(submitContact).get(getContacts);
router.post('/waitlist', joinWaitlist);
router.post('/newsletter', subscribeNewsletter);

module.exports = router;
