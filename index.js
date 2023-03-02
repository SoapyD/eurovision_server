if(!process.env.INSTANCE_TYPE){
	require('dotenv').config();
	console.log("dev env variables loaded")	
}


const classes = require('./classes');
// const utils = require("./utils");


const express = require("express");
const app = express();

const http = require('http')
const { Server } = require('socket.io');

const middleware = require('./middleware');
middleware.setup.run(app)

const server = http.createServer(app)
const io = new Server(server)


/*
io.on("connection", (socket) => {
	console.log(`User Connected ${socket.id}`)

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log(`Room Joined: ${data}`)
	});
	
	socket.on("send_message", (data) => {
		// socket.to(data.room).emit("receive_message", data);
		io.to(data.room).emit("receive_message", data)
		console.log(data)
		// console.log(`Message: ${data}`)
	});
})
*/

global.socketHandler = new classes.server_game_socket_handler({
	namespace: "/"
	,io: io
});

socketHandler.checkMessages();


server.listen(process.env.SERVER_PORT, () => {
	console.log(`SERVER IS RUNNING ON PORT ${process.env.SERVER_PORT}`)
})


