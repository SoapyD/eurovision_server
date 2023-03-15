const mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

	const Session = new mongoose.Schema({
		refreshToken: {
			type: String,
			default: "",
		}
	})
	
	const userSchema = new mongoose.Schema({
		userName: String,
		password: String,

		authStrategy: {
			type: String,
			default: "local",
		},
		refreshToken: {
			type: [Session],
		}
	});
	
	//Remove refreshToken from the response
	userSchema.set("toJSON", {
		transform: function(doc, ret, options) {
			delete ret.refreshToken
			return ret
		},
	})
	
	userSchema.plugin(passportLocalMongoose);
	
	module.exports = mongoose.model("User", userSchema);