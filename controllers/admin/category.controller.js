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

    console.log(newCategories)

    res.render("admin/pages/category/create", {
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