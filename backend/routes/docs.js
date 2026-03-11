const express = require('express');
const router = express.Router();
const { getDocs, getDoc, createDoc, updateDoc, deleteDoc } = require('../controllers/docController');

router.route('/').get(getDocs).post(createDoc);
router.route('/:id').get(getDoc).put(updateDoc).delete(deleteDoc);

module.exports = router;
