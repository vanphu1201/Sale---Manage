const dashboardRoute = require("./dashboard.route");
const productsRoute = require("./products.route");

module.exports = (app) => {
    app.use('/admin', dashboardRoute);

    app.use('/admin', productsRoute)

}