const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');


router.route('/')
    .get(vendorController.getVendorsList)
    .post(vendorController.createVendor)

router.route('/:id')
    .get(vendorController.getVendorDetail)
    .patch(vendorController.updateVendor)
    .delete(vendorController.deleteVendor)

    router.route('/add/product')
    .patch(vendorController.addProduct)

module.exports = router;