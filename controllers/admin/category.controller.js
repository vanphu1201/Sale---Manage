const Category = require("../../models/category.model");


// [GET] /admin/category
module.exports.index = async (req, res) => {
    const categories = await Category.find({deleted: false});
    res.render("admin/pages/category/index", {
        pageTitle: "Category",
        title: "Trang danh mục sản phẩm",
        categories: categories
    });
}



// [GET] /admin/category/create/:id
module.exports.create = async (req, res) => {
    const id = (req.params.id == "new" ? "" : req.params.id);
    const categories = await Category.find({deleted: false});
    let categoriesTitle = [];
    categoriesTitle = categories.map(item => item.title);
    console.log(categoriesTitle)
    res.render("admin/pages/category/create", {
        categories: categories,
        categoriesTitle: categoriesTitle,
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