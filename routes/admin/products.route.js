const express = require("express");
const route = express.Router();

const multer  = require('multer');
const upload = multer();

const uploadClould = require("../../midlewares/admin/uploadClould.middleware");

const controller = require("../../controllers/admin/products.controller");

const validate = require("../../midlewares/admin/validate.middleware");


route.get("/products", controller.index);

route.get("/products/changeStatus/:changeStatus/:id", controller.changeStatus);

route.get("/products/delete/:id", controller.delete);

route.get("/products/create", controller.create);

route.post(
    "/products/create",
    upload.single('thumbnail'),
    uploadClould.upload,
    validate.createPost,
    controller.createPost
);

route.get("/products/edit/:id", controller.edit);

route.post(
    "/products/edit/:id",
    upload.single('thumbnail'),
    uploadClould.upload,
    validate.editPost,
    controller.editPost
);

route.get("/products/detail/:id", controller.detail);

route.post("/products/changeMultiStatus/:change/:ids", controller.changeMulti);




module.exports = route;