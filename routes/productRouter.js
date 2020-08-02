const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.route('/')
    .get(productController.getProductList)
    .post(productController.createProduct)

router.route('/:id')
    .get(productController.getProductDetail)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

    

module.exports = router;  