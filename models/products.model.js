const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    }
    
});
const Products = mongoose.model('Products', ProductsSchema, "products");

module.exports = Products;