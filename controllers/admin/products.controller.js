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

    const products = await Products.find(find).sort({position: "desc"});
    
    
    // Tính current price
    currentPrice.currentPriceMany(products);
    // Hết Tính current price



    res.render('admin/pages/products/index.pug', {
        pageTitle: 'Products',
        title: "Trang danh sách sản phẩm",
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

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Create product",
        title: "Trang tạo sản phẩm"
    })
}


// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProduct = await Products.countDocuments({deleted: false});
        req.body.position = countProduct + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    
    const newProduct = new Products(req.body);
    await newProduct.save();
    res.redirect("/admin/products");
}



// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const product = await Products.findOne({
        _id: id,
        deleted: false
    })

    res.render("admin/pages/products/edit.pug", {
        pageTitle: "Edit product",
        title: "Trang sửa sản phẩm",
        product: product
    });
}