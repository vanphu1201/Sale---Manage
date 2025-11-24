const Products = require("../../models/products.model");

const currentPrice = require("../../helper/current-price.helper");

module.exports.index = async (req, res) => {
    const products = await Products.find({
        deleted: false
    })

    // Tính current price
    currentPrice.currentPriceMany(products);
    // Hết Tính current price

    res.render('admin/pages/products/index.pug', {
        pageTitle: 'Products',
        products: products
    })
}