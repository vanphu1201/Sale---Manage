const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./products.route");
const categoryRoute = require("./category.route");


module.exports = (app) => {
    app.use('/admin', dashboardRoute);

    app.use('/admin', productsRoute);

    app.use('/admin', categoryRoute);
}