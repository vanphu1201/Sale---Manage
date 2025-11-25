const Products = require("../../models/products.model");

const currentPrice = require("../../helper/current-price.helper");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    
    let find = {
        deleted: false
    }

    // Search product
    const searchValue = req.query.search;
    if (searchValue) {
        const re = new RegExp(searchValue, "i");
        find = {
            ...find,
            title: re
        }
    }
    // End Search product

    const products = await Products.find(find);
    
    
    // Tính current price
    currentPrice.currentPriceMany(products);
    // Hết Tính current price



    res.render('admin/pages/products/index.pug', {
        pageTitle: 'Products',
        products: products,
        searchValue: searchValue
    })
}


// [POST] /admin/products/changeStatus/:changeStatus/:id
module.exports.changeStatus = async (req, res) => {
    const changeStatus = req.params.changeStatus;
    const id = req.params.id;
    await Products.updateOne({_id: id}, {status: changeStatus});
    res.redirect(req.headers.referer);
}


// [POST] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Products.updateOne({_id: id}, {deleted: true});
    res.redirect(req.headers.referer);
}