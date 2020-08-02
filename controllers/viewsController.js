const Vendor = require('../models/vendorModel');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');


exports.productList = catchAsync(async (req, res, next)=>{
    const products = await Product.find()
    return res.status(200).render('productList', {products})
})


exports.vendorList = catchAsync(async (req, res, next)=>{
    const vendors = await Vendor.find()
    return res.status(200).render('vendorList', {vendors})
})


exports.productDetail = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById(id).populate({
        path: 'vendors',
        select: 'name -product'
    })
    return res.status(200).render('productDetail', {product})
})


exports.vendorDetail = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const vendor = await Vendor.findById(id)
    console.log(vendor)
    return res.status(200).render('vendorDetail', {vendor})
})

exports.addProductToVendor = catchAsync(async(req, res, next) => {
    const vendorId = req.params.id
    const vendor = await Vendor.findById(vendorId)
    const products = await Product.find()
    console.log(vendor)
    // console.log(products)
    return res.status(200).render('addProductToVendor', {vendor, products})
})

exports.createProduct = (req, res, next) => {
    return res.status(200).render('createProduct')
}

exports.createVendor = (req, res, next) => {
    return res.status(200).render('createVendor')
}