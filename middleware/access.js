
exports.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
		
	switch(process.env.INSTANCE_TYPE){
		case "DEV":
		case "DEV-ONLINE":
			return next();
			break;
	}

	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login")
}


// const cors = require("cors")
// //Add the client URL to the CORS policy
// const whitelist = process.env.WHITELISTED_DOMAINS
// ? process.env.WHITELISTED_DOMAINS.split(",")
// : []

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//         } else {
//         callback(new Error("Not allowed by CORS"))
//         }
//     },
    
//     credentials: true,
// }

// exports.cors = cors(corsOptions)