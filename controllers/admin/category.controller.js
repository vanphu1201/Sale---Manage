const Category = require("../../models/category.model");


// [GET] /admin/category
module.exports.index = async (req, res) => {
    res.render("admin/pages/category/index", {

    });
}



// [GET] /admin/category/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/category/create", {

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