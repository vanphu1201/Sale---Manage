const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/category.controller");


route.get("/category", controller.index);

route.get("/category/create", controller.create);

route.post("/category/create", controller.createPost);



module.exports = route;