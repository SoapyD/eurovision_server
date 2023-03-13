const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
	name: String
    ,order: Number
    ,year: Number
    ,acts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Act' 
    }]    
});


module.exports = mongoose.model("Event", eventSchema);