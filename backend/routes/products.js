const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.route('/').get(getProducts).post(createProduct);
router.route('/:slug').get(getProduct);
router.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
