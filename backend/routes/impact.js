const express = require('express');
const router = express.Router();
const { calculateImpact, getReports, getDashboardStats } = require('../controllers/impactController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/calculate', calculateImpact);
router.get('/reports', getReports);
router.get('/dashboard', getDashboardStats);

module.exports = router;
