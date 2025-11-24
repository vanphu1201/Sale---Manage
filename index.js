const express = require('express');
const app = express();
const port = 3000;

// static public
app.use(express.static('public'));
// End static public


//Nhúng route
const Route = require("./routes/client/index.route");
const RouteAdmin = require("./routes/admin/index.route");
//Hết Nhúng route


// pug
app.set('views', './views');
app.set('view engine', 'pug');
// end pug



// route
Route(app);
RouteAdmin(app);
// End route

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
