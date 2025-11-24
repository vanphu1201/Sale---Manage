const Products = require("../../models/products.model");

module.exports.index = async (req, res) => {
    const products = await Products.find({
        status: "active",
        deleted: false
    });
    res.render('client/pages/products/index.pug', {
        pageTitle: 'Products',
        products: products
    })
}