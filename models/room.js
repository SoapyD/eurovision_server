const mongoose = require("mongoose");


const roomSchema = new mongoose.Schema({

	room_name: String
    ,event: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event' 
    }
    ,users: [{
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        }
        ,scores: [{
            act: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Act' 
            }
            ,song: {
                type: Number
                ,default: 0
            }
            ,staging: {
                type: Number
                ,default: 0
            }
        }]
    }
    ]   

    // 	room_name: String
// 	,password: String
//     ,sockets: [{
//         socket: String
//         ,user: String
//     }]
//     ,users: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User' 
//     }]

//     ,admins: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User' 
//     }]

//     ,game_data: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'GameData' 
//     }

//     ,max_users: {type: Number, default: -1}
//     ,use_waiting_room: {type: Boolean, default: false}

//    ,created_date: {type: Date, default: Date.now}
//    ,updateddate: {type: Date, default: Date.now}	
	
});


module.exports = mongoose.model("Room", roomSchema);