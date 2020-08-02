const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');  // insted of writing try and catch block
const appError = require('../utils/appError');
const Vendor = require('../models/vendorModel');

// note catchAsync will used insted of try and catch block for more info check utils/catchAsync.js

exports.getProductList = catchAsync(async (req, res, next) => {
    const productList = await Product.find().populate({
        path: 'vendors',
        select: 'name -product'
    })
    return res.status(200).json({
        status: 'success',
        data: {productList}
    })
})

exports.createProduct = catchAsync(async (req, res, next) => {
    const body = req.body;
    const newProduct = await Product.create(body)
    if (!newProduct) {
        return next(new appError('creating product faild ', 400))
    }
    return res.status(200).json({
        status: 'success',
        data: {newProduct}
    })
})

exports.getProductDetail = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById(id).populate({
        path: 'vendors',
        select: 'name -product'
    })
    if (!product) {
        return next(new appError('No product found with that id', 404))
    }
    return res.status(200).json({
        status: 'success',
        data: {product}
    })
})

exports.updateProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const product = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!product) {
        return next(new appError('No product found with that id', 404))
    }
    return res.status(200).json({
        status: 'success',
        data: {product}
    })
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const product = await Product.findByIdAndDelete(id, body)
    if (!product) {
        return next(new appError('No product found with that id', 404))
    }
    return res.status(204).json({
        status: 'success',
        data: {}
    })
})

