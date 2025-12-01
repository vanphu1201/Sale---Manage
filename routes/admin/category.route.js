const express = require("express");
const route = express.Router();

const controller = require("../../controllers/admin/category.controller");


route.get("/category", controller.index);

module.exports = route;