const express = require('express');
const viewsController = require('../controllers/viewsController');
const router = express.Router();


router.route('/')
    .get(viewsController.productList)

router.route('/productList')
    .get(viewsController.productList)
router.route('/productDetail/:id')
    .get(viewsController.productDetail)
router.route('/createProduct')
    .get(viewsController.createProduct)


router.route('/vendorList')
    .get(viewsController.vendorList)
router.route('/vendorDetail/:id')
    .get(viewsController.vendorDetail)
router.route('/createVendor')
    .get(viewsController.createVendor)

router.route('/addProductToVendor/:id')
    .get(viewsController.addProductToVendor)



module.exports = router;
