// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express App
// =============================================================
var app = express();

// Static directory
app.use(express.static(__dirname + "/public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

const session = require("express-session");

app.use(
  session({
    secret: "ipaIsBest",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
  })
);

var routes = require("./controllers/beer_controller.js");
const userPost_routes = require("./controllers/post_controller.js");
const authPost_routes = require("./controllers/auth_controller.js");

app.use(routes);
app.use(userPost_routes);
app.use(authPost_routes);

var PORT = process.env.PORT || 8080;

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("Listening for your beer selection on PORT " + PORT);
  });
});
