const Vendor = require('../models/vendorModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');  // insted of writing try and catch block
const appError = require('../utils/appError');

// note catchAsync will used insted of try and catch block for more info check utils/catchAsync.js


exports.getVendorsList = catchAsync(async (req, res, next) => {
    const vendorList = await Vendor.find()
    return res.status(200).json({
        status: 'success',
        data: {vendorList}
    })
})

exports.createVendor = catchAsync(async (req, res, next) => {
    const body = req.body;
    const newVendor = await Vendor.create(body)
    if (!newVendor) {
        return next(new appError('creating vendor faild ', 400))
    }
    return res.status(200).json({
        status: 'success',
        data: {newVendor}
    })
})


exports.getVendorDetail = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const vendor = await Vendor.findById(id)
    if (!vendor) {
        return next(new appError('No vendor found with that id', 404))
    }
    return res.status(200).json({
        status: 'success',
        data: {vendor}
    })
})



exports.updateVendor = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const vendor = await Vendor.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!vendor) {
        return next(new appError('No vendor found with that id', 404))
    }
    return res.status(200).json({
        status: 'success',
        data: {vendor}
    })
})



exports.deleteVendor = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const venodr = await Vendor.findByIdAndDelete(id, body)
    if (!venodr) {
        return next(new appError('No venodr found with that id', 404))
    }
    return res.status(204).json({
        status: 'success',
        data: {}
    })
})

exports.addProduct = catchAsync(async (req, res, next) => {
    const { vendorId, productId } = req.body
    if (!vendorId || !productId) {
        return next(new appError('must send productId and vendorId'))
    }
    try {
        let vendor = await Vendor.findById(vendorId)
        let destructureProductId = vendor.product.map(prod => prod.id)
        productId.forEach(product => destructureProductId.push(product))
        destructureProductId = [...new Set(destructureProductId)]
        const updatedVendor_ = await Vendor.findByIdAndUpdate(vendorId, {product: destructureProductId}, { new: true, runValidators: true })

        return res.status(200).json({
            status: 'success',
            data: {vendor: updatedVendor_}
        })
    } catch (err) {
        next(new appError('error while adding products', 400))
    }
})
