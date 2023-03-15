const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
	name: String
    ,order: Number
    ,year: Number
    ,acts: [{
        act: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Act' 
        }
        ,order: Number
    }
    ]    
});


module.exports = mongoose.model("Event", eventSchema);