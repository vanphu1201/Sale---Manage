const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryRouteSchema = new Schema({
    
});
const Category = mongoose.model('Category', categoryRouteSchema, "category");

module.exports = Category;