const Category = require("../../models/category.model");


// [GET] /admin/category
module.exports.index = async (req, res) => {
    const categories = await Category.find({deleted: false});
    function createTree(arr, parentId = "") {
        const tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(arr, item.id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const newCategories = createTree(categories);
    res.render("admin/pages/category/index", {
        pageTitle: "Category",
        title: "Trang danh mục sản phẩm",
        categories: newCategories
    });
}



// [GET] /admin/category/create/:id
module.exports.create = async (req, res) => {
    const id = (req.params.id == "new" ? "new" : req.params.id);
    console.log(id)
    const categories = await Category.find({deleted: false});

    function createTree(arr, parentId = "") {
        const tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(arr, item.id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const newCategories = createTree(categories);

    res.render("admin/pages/category/create", {
        pageTitle: "Create Category",
        title: "Trang tạo mới danh mục",
        categories: newCategories,
        id: id
    });
}



// [POST] /admin/category/create
module.exports.createPost = async (req, res) => {
    if (req.body.status == "on") {
        req.body.status = "active";
    } else {
        req.body.status = "inactive";
    }

    const category = new Category(req.body);
    await category.save();

    res.redirect("/admin/category");
}



// [GET] /admin/category/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const category = await Category.findOne({
        _id: id,
        deleted: false
    })

    const categories = await Category.find({deleted: false});

    function createTree(arr, parentId = "") {
        const tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(arr, item.id);
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const newCategories = createTree(categories);
    
    res.render("admin/pages/category/edit", {
        pageTitle: "Edit category",
        title: "Trang danh mục sản phẩm",
        category: category,
        categories: newCategories,
        id: id,
        parent_id: category.parent_id
    });
}



// [POST] /admin/category/edit/:id
module.exports.editPost = async (req, res) => {
    const id = req.params.id;
    const category = await Category.findOne({
        _id: id,
        deleted: false
    })
    if (req.body.status == "on") {
        req.body.status = "active";
    } else {
        req.body.status = "inactive";
    }
    if (req.body.slug == category.slug) {
        delete req.body.slug;
    }
    await Category.updateOne({_id: id, deleted: false}, req.body);

    res.redirect(req.headers.referer);
}