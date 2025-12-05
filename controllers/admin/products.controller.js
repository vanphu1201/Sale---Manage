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
    


    quantityStatus = await Products.find({deleted: false});
    currentStatus = req.query.status;



    // pagination
    const countProduct = await Products.countDocuments({deleted: false});
    const objectPagination = {
        countProduct: countProduct,
        limit: 10,
        skip: 0,
        currentPage: 1,
    }
    const totalPage =  Math.ceil(countProduct / objectPagination.limit);
    objectPagination.totalPage = totalPage;
    if (req.query.page) {
        objectPagination.currentPage = req.query.page;
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit;
    }
    // End pagination

    const products = await Products.find(find).sort(sort).limit(objectPagination.limit).skip(objectPagination.skip);

    // Tính current price
    currentPrice.currentPriceMany(products);
    // Hết Tính current price



    res.render('admin/pages/products/index.pug', {
        pageTitle: 'Products',
        title: "Trang danh sách sản phẩm",
        products: products,
        searchValue: searchProductAdmin(req.query, find).searchValue,
        quantityStatus: quantityStatus,
        currentStatus: currentStatus,
        pagination: objectPagination
    })
}


// [POST] /admin/products/changeStatus/:changeStatus/:id
module.exports.changeStatus = async (req, res) => {
    const changeStatus = req.params.changeStatus;
    const id = req.params.id;
    await Products.updateOne({_id: id}, {status: changeStatus});
    req.flash("success", "Thay đổi trạng thái sản phẩm thành công!");
    res.redirect("/admin/products");
}


// [POST] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await Products.updateOne({_id: id}, {deleted: true});
    req.flash("success", "Xóa sản phẩm thành công!");
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

    const newProduct = new Products(req.body);
    await newProduct.save();
    req.flash("success", "Tạo sản phẩm thành công!");
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

 
    await Products.updateOne({_id: req.params.id}, (req.body));
    req.flash("success", "Cập nhập sản phẩm thành công!");
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