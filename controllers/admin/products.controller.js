const Products = require("../../models/products.model");

const currentPrice = require("../../helper/current-price.helper");

// [GET] /admin/products
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


// [POST] /admin/products/changeStatus/:changeStatus/:id
module.exports.changeStatus = async (req, res) => {
    const changeStatus = req.params.changeStatus;
    const id = req.params.id;
    await Products.updateOne({_id: id}, {status: changeStatus});
    res.redirect(req.headers.referer);
}