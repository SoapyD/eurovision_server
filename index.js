if(!process.env.INSTANCE_TYPE){
	require('dotenv').config();
	console.log("dev env variables loaded")	
}


const classes = require('./classes');
const utils = require("./utils");


const express = require("express");
const app = express();

const middleware = require('./middleware');
let corsOptions = middleware.setup.run(app)

let expressServer;

expressServer = app.listen(process.env.SERVER_PORT||8080, process.env.IP, function(){
	console.log(`SERVER IS RUNNING ON PORT ${process.env.SERVER_PORT}`)
})		

utils.socket.setup(expressServer, corsOptions)

