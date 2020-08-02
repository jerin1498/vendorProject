const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product must have name'],
        unique: [true, 'product name already taken try new one'],
        trim: true,
        maxlength: [40, 'product name must not exied 40 characters'],
        minimumlength: [3, 'product must have minimum 10 characters']
    },
    price: {
        type: Number,
        required: [true, 'a product must have a price']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String
    },
    slug: String,
},{
    toJSON: { virtuals: true }, // for outputing virtual
    toObject: {virtuals: true}
})


// virtual populate vendor in product without saving in the database parent referecne
productSchema.virtual('vendors', {
    ref: 'Vendor',
    foreignField: 'product',
    localField: '_id' 
});

productSchema.pre('save', function (next) { 
    this.slug = slugify(this.name, { lower: true });
    next();
});



Product = mongoose.model('Product', productSchema);
module.exports = Product;