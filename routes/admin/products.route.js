const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/products.controller");

route.get("/products", controller.index);

route.get("/products/changeStatus/:changeStatus/:id", controller.changeStatus);

route.get("/products/delete/:id", controller.delete);




module.exports = route;