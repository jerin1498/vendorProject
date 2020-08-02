const mongoose = require('mongoose');
const slugify = require('slugify');


const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'vendor must have name'],
        unique: [true, 'vendor name already taken try new one'],
        trim: true,
        maxlength: [20, 'vendor name must not exied 40 characters'],
        minimumlength: [3, 'vendor must have minimum 10 characters']
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'vendor must have address']
    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'This email already exists please use another email'],
        required: [true, 'user must have an email id'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        maxlength: 14,
        minilength: 10
    },
    imageCover: {
        type: String
    },
    product: [// child reference type
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    ],
    slug: String,
})


// pre populate middleware
vendorSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'product',
        select: 'name'
    })
    next();
});


vendorSchema.pre('save', function (next) { 
    this.slug = slugify(this.name, { lower: true });
    next();
});




vendor = mongoose.model('Vendor', vendorSchema);
module.exports = vendor;