const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryRouteSchema = new Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: ""
        },
        description: String,
        icon_category: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        seo_title: {
            type: String,
            default: ""
        },
        meta_description: {
            type: String,
            default: ""
        },

        meta_keywords: {
            type: String,
            default: ""
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);
const Category = mongoose.model('Category', categoryRouteSchema, "category");

module.exports = Category;