require('dotenv').config();


const express = require('express');

// method override
const methodOverride = require('method-override');
// End method override

// body parser
const bodyParser = require('body-parser');
// End body parser


const app = express();
const port = process.env.PORT;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())


// Use method override
app.use(methodOverride('X-HTTP-Method-Override'));
// End Use method override


// Database
const database = require("./configs/database")
// End Database


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

// database
database();
// end database


// route
Route(app);
RouteAdmin(app);
// End route

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
