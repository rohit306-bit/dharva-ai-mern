const express = require('express');
const router = express.Router();
const { generateDocument, getDocuments, updateDocumentStatus } = require('../controllers/complianceController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/generate', generateDocument);
router.get('/documents', getDocuments);
router.patch('/documents/:id/status', updateDocumentStatus);

module.exports = router;
