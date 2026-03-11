const express = require('express');
const router = express.Router();
const { getPricingPlans, createPlan, updatePlan, deletePlan } = require('../controllers/pricingController');

router.route('/').get(getPricingPlans).post(createPlan);
router.route('/:id').put(updatePlan).delete(deletePlan);

module.exports = router;
