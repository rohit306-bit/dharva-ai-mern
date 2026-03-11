const express = require('express');
const router = express.Router();
const {
  getLaunches,
  getLaunch,
  createLaunch,
  updateLaunch,
  deleteLaunch,
} = require('../controllers/launchController');

router.route('/').get(getLaunches).post(createLaunch);
router.route('/:id').get(getLaunch).put(updateLaunch).delete(deleteLaunch);

module.exports = router;
