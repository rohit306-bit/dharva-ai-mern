const express = require('express');
const router = express.Router();
const { getAuditLogs, verifyIntegrity, getAuditStats } = require('../controllers/auditController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/logs', getAuditLogs);
router.get('/stats', getAuditStats);
router.get('/verify/:id', verifyIntegrity);

module.exports = router;
