const Products = require("../../models/products.model");

const currentPrice = require("../../helper/current-price.helper");
const filterStatusHelper = require("../../helper/filter-status.helper");
const searchProductAdmin = require("../../helper/search-product-admin.helper");
const sortHelper = require("../../helper/sort.helper");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    
    let find = {
        deleted: false
    }

    // filter status
    find = filterStatusHelper(req.query, find);
    // End filter status


    // Search product
    find = searchProductAdmin(req.query, find).find;
    // End Search product

    // Sort
    let sort = {
        position: "desc"
    }
    sort = sortHelper(req.query, sort);
    // End Sort


    const products = await Products.find(find).sort(sort);

    
    
    // Tính current price
    currentPrice.currentPriceMany(products);
    // Hết Tính current price

    quantityStatus = await Products.find({deleted: false});
    currentStatus = req.query.status;

    res.render('admin/pages/products/index.pug', {
        pageTitle: 'Products',
        title: "Trang danh sách sản phẩm",
        products: products,
        searchValue: searchProductAdmin(req.query, find).searchValue,
        quantityStatus: quantityStatus,
        currentStatus: currentStatus
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



// [POST] /admin/products/edit/:id
module.exports.editPost = async (req, res) => {
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
    
    await Products.updateOne({_id: req.params.id}, (req.body));
    res.redirect("/admin/products");
}


// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const product = await Products.findOne({
        _id: id,
        deleted: false
    })

    currentPrice.currentPriceOnce(product);

    res.render("admin/pages/products/detail.pug", {
        pageTitle: "Detail product",
        title: "Trang Chi tiết sản phẩm",
        product: product
    });
}



// [POST] /admin/products/changeMultiStatus/:change/:ids
module.exports.changeMulti = async (req, res) => {
    const idsString = ((req.params.ids).split("-"));
    const ids = idsString.splice(1, idsString.length)
    const change = req.params.change;
    

    switch (change) {
        case "active":
            await Products.updateMany({_id: {$in: ids}}, {status: "active"});
            break;
        case "inactive":
            await Products.updateMany({_id: {$in: ids}}, {status: "inactive"});
            break;
        case "delete":
            await Products.updateMany({_id: {$in: ids}}, {deleted: true});
            break;
    }

    res.redirect(req.headers.referer);
}