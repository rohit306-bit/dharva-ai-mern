const express = require('express');
const router = express.Router();
const {
  getAISystems,
  getAISystem,
  createAISystem,
  updateAISystem,
  deleteAISystem,
} = require('../controllers/aiSystemController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getAISystems).post(createAISystem);
router.route('/:id').get(getAISystem).put(updateAISystem).delete(authorize('admin', 'superadmin'), deleteAISystem);

module.exports = router;
