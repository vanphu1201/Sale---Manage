const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/category.controller");


route.get("/category", controller.index);

route.get("/category/create/:id", controller.create);

route.post("/category/create/", controller.createPost);



module.exports = route;