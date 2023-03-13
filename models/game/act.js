const mongoose = require("mongoose");


const actSchema = new mongoose.Schema({
	artist: String
    ,song: String

    ,country: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Country' 
    }    
});


module.exports = mongoose.model("Act", actSchema);