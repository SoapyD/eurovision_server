// const express = require('express');

const cors = require("cors")
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const methodOverride = require('method-override');
// const flash = require('connect-flash');
const passport = require("passport");

const controllers = require('../controllers');
const routes = require("../routes");
// const utils = require("../utils");

const strategies = require('./strategies')

const classes = require('../classes');
global.databaseHandler = new classes.mongoose_db_handler();
global.errorHandler = new classes.server_error_handler();
// global.collisionHandler = new classes.game_collisions();
// global.actionHandler = new classes.game_actions();


exports.run = async(app) => {
	

    // setup sessions
    app.use(require("express-session")({
        secret: process.env.SESSION_SECRET, //used to encode and decode sessions
        resave: false,
        saveUninitialized: false,
        }));
    app.use(passport.session());
    app.use(passport.initialize());
    
	
    //setup app
    app.set("view engine", "ejs"); //set ejs as the view engine
    app.use(bodyParser.urlencoded({ extended: true })); //setup body parser so it can read url parameters
    app.use(bodyParser.json()); //allow the app to read json input into the body
    app.use(cookieParser(process.env.COOKIE_SECRET)) //Allow the app to read cookies, which will be used for refresh token handling

    /*
    app.use(express.static(__dirname + "/../public")); //setup a public folder for js and css
    app.use(methodOverride("_method")); //setup means of changing POST methods to DELETE and PUT methods
    app.use(flash()); //setup flash messages  
    */

    //setup user authentication and password serialization and deserialization
    strategies.local.setup();
    strategies.jwt.setup();    

    /*
    //setup the local variables
    app.use(function(req, res, next){
        res.locals.user = req.user;
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");	
        next();
    })
    */

    //Add the client URL to the CORS policy
    const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : []

    const corsOptions = {
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error("Not allowed by CORS"))
        }
      },
    
      credentials: true,
    }

    app.use(cors(corsOptions))

    //automatically setup routes along route paths
    for (const [key, value] of Object.entries(routes)) {
        app.use(routes[key].path,routes[key]);
    } 
    
    /*
    app.use(controllers.error.get404);

    utils.seeder.resetRooms();

	*/
    return corsOptions
}