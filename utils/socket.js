

const checkJoined = async(params) => {

	let index = params.room.users.findIndex( element => {
		if (element.user.username === params.user.username) {
			return true;
		}
	});

	console.log('search index:',index, 'array length:',params.room.users.length)

	if (index == -1){
		console.log('Adding User')
		let event = await databaseHandler.findData({
			model: "Event"
			,search_type: "findById"
			,params: params.room.event			
		}, false)
		event = event[0]

		let user_data = {
			user: params.user._id
			,scores: event.acts
		}
		
		params.room.users.push(user_data)
		params.room.save()
	}
}



exports.setup = (expressServer, corsOptions) => {

	const socketio = require('socket.io');
	const io = socketio(expressServer, { cors: corsOptions });


	io.on("connection", (socket) => {
		console.log(`User Connected ${socket.id}`)

		socket.on("join_room", async(data) => {
			socket.join(data.room_name);

			//GET ROOM
			let room = await databaseHandler.findData({
				model: "Room"
				,search_type: "find"
				,params: {
					room_name: data.room_name
				}
			})
			room = room[0][0];

			//IF USER DOESN'T EXIST, ADD SCORING ENTRIES FOR USER
			let user = await databaseHandler.findData({
				model: "User"
				,search_type: "find"
				,params: {
					username: data.message.username
				}
			})
			user = user[0][0];	

			checkJoined({
				user: user
				,room: room
			})

			console.log(`Room Joined: ${data.room_name}`)
		});
		
		socket.on("send_message", (data) => {
			io.to(data.room_name).emit("receive_message", data)
			console.log(data)
			// console.log(`Message: ${data}`)
		});

		socket.on("send_score", async(data) => {
			// io.to(data.room_name).emit("receive_message", data)
			console.log(data)

			//GET ROOM
			let room = await databaseHandler.findData({
				model: "Room"
				,search_type: "find"
				,params: {
					room_name: data.room_name
				}
			})
			room = room[0][0];		
			if(room){

				let user_index = room.users.findIndex( element => {
					if (element.user.username === data.message.username) {
						return true;
					}
				});

				if(user_index != -1){
					let score_index = room.users[user_index].scores.findIndex( element => {
						if (element.act.country.name === data.message.country) {
							return true;
						}
					});
					// console.log('user index::',user_index,'song index:',song_index)

					if(score_index != -1){
						//UPDATE EXISTING ROOM OBJECT
						room.users[user_index].scores[score_index][data.message.sliderType] = data.message.value;
						
						//SETUP UPDATE SCRIPT
						let update = {}
						update["users."+user_index+".scores."+score_index+'.'+data.message.sliderType] = data.message.value;
	
						let update_options = 
						{
							model: "Room"
							,params: [
								{
									filter: {_id: room._id}, 
									value: {$set: update}
								}
							]
						}                            
						databaseHandler.updateOne(update_options)
						
						//LOOP AND GET SCORES FOR SONG, KEEP ELEMENT COUNT OF NUMBER OF USERS SCORING FOR EACH ITTERATION
						let scores = []
						for(let i=0;i<=10;i++){
							scores.push({song: 0, staging: 0})
						}
						room.users.forEach((user) => {
							let score = user.scores[score_index];
							if(score.song > 0){
								scores[score.song].song += 1;
							}
							if(score.staging > 0){
								scores[score.staging].staging += 1;
							}							
						})
						// console.log(scores)
						io.to(data.room_name).emit("receive_chart", {
							scores: scores, 
							country: data.message.country 
						})

						//GET TOTAL SCORES
						let song = {total: 0.0, entries: 0.0, avg: 0}
						let staging = {total: 0, entries: 0, avg: 0}
						scores.forEach((score, i) => {
							if(score.song > 0){
								song.total += i
								song.entries += 1
							}
							if(score.staging > 0){
								staging.total += i
								staging.entries += 1
							}							
						})

						song.avg = Math.round(song.total / song.entries)
						staging.avg = Math.round(staging.total / staging.entries)
						let total = song.avg + staging.avg
						
						io.to(data.room_name).emit("receive_groupScore", {
							song: song.avg,
							staging: staging.avg,
							total: total,
							country: data.message.country 
						})						
					}
					// room.save();

				}

				// console.log("POS TO MOD", index)

				//IF USER DOESN'T EXIST, ADD SCORING ENTRIES FOR USER
				// let user = await databaseHandler.findData({
				// 	model: "User"
				// 	,search_type: "find"
				// 	,params: {
				// 		username: data.message.username
				// 	}
				// })
				// user = user[0][0];	

				//FIND INDEX FOR SCORE BEING ADJUSTED
				//UPDATE EITHER SONG OR STAGING SCORE

				//SEND UPDATE SCORE MATRIX TO ALL USERS FOR GRAPH UPDATE

				//UPDATE GROUP SCORES
			}		
		});	
	})
}