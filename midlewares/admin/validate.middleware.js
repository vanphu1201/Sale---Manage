module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Hãy nhập tiêu đề cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    // if (!req.body.category) {
    //     req.flash("error", "Hãy nhập tiêu đề cho sản phẩm!");
    //     res.redirect(req.headers.referer);
    // }
    if (!req.body.price) {
        req.flash("error", "Hãy nhập giá cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    if (!req.body.discountPercentage) {
        req.body.discountPercentage = 0;
    }
    if (!req.body.stock) {
        req.flash("error", "Hãy nhập số lượng tồn kho cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    if (!req.body.description) {
        req.flash("error", "Hãy nhập mô tả cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    
    next();
}


module.exports.editPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Hãy nhập tiêu đề cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    // if (!req.body.category) {
    //     req.flash("error", "Hãy nhập tiêu đề cho sản phẩm!");
    //     res.redirect(req.headers.referer);
    // }
    if (!req.body.price) {
        req.flash("error", "Hãy nhập giá cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    if (!req.body.discountPercentage) {
        req.body.discountPercentage = 0;
    }
    if (!req.body.stock) {
        req.flash("error", "Hãy nhập số lượng tồn kho cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    if (!req.body.description) {
        req.flash("error", "Hãy nhập mô tả cho sản phẩm!");
        res.redirect(req.headers.referer);
    }
    
    next();
}