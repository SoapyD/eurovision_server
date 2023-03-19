// const passport = require("passport");
const User = require("../models/user");
// const { getToken } = require("../utils/authenticate");
const utils = require('../utils')
const jwt = require("jsonwebtoken")



exports.register = (req,res) => {

	// CHECK TO SEE IF THE USERNAME ALREADY EXISTS
	User.findOne({username: req.body.username}, function(err, user){
	
		if (err){
			// req.flash("error", err.message);
			return res.redirect("/register")
		}		
		if(user) {
			// req.flash("error", "Username already exists, please select a new one");
			return res.redirect("/register")			
		}

		User.register(
			new User({username: req.body.username, role:req.body.role}), req.body.password, function(err, user){
				if (err){
					// console.log(err)
					// req.flash("error", err.message);
					res.statusCode = 500
					return res.send(err)
				}
				else{
					const token = utils.authenticate.getToken({_id: user._id})
					const refreshToken = utils.authenticate.getRefreshToken({_id: user._id})
					user.refreshToken.push({ refreshToken })
					user.save((err, user) => {
						if(err){
							res.statusCode = 500
							res.send(err)
						}else{
							res.cookie("refreshToken", refreshToken, utils.authenticate.COOKIE_OPTIONS)
							res.send({ success: true, token})
						}
					})					
					// passport.authenticate("local")(req,res,function(){
						// req.flash("success", "Welcome to Site " + user.username);
						// res.send({ success: true })
					// })
				}
			});
	});
}


exports.login = (req,res) => {
	const token = utils.authenticate.getToken({ _id: req.user._id })
	const refreshToken = utils.authenticate.getRefreshToken({ _id: req.user._id })
	User.findById(req.user._id).then(
	  user => {
		user.refreshToken.push({ refreshToken })
		user.save((err, user) => {
		  if (err) {
			res.statusCode = 500
			res.send(err)
		  } else {
			res.cookie("refreshToken", refreshToken, utils.authenticate.COOKIE_OPTIONS)
			res.send({ success: true, token })
		  }
		})
	  },
	  err => next(err)
	)
}


exports.refreshToken = (req,res, next) => {
	const { signedCookies = {} } = req
	const { refreshToken } = signedCookies
	// const { cookies = {} } = req
	// const { refreshToken } = cookies

	// if (req.cookies.refreshToken){
	// 	console.log('cookie: ',req.cookies.refreshToken)
	// }else{
	// 	console.log('blank cookie')
	// }
	// if (req.signedCookies.refreshToken){
	// 	console.log('signedCookies: ',req.signedCookies.refreshToken)
	// }else{
	// 	console.log('blank signedCookies')
	// }
  
	if (refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
			const userId = payload._id
			User.findOne({ _id: userId }).then(
		  		user => {
				if (user) {
			  		// Find the refresh token against the user record in database
			  		const tokenIndex = user.refreshToken.findIndex(
						item => item.refreshToken === refreshToken
			  		)
  
					if (tokenIndex === -1) {
						res.statusCode = 401
						res.send("Unauthorized")
					} else {
						const token = utils.authenticate.getToken({ _id: userId })
						// If the refresh token exists, then create new one and replace it.
						const newRefreshToken = utils.authenticate.getRefreshToken({ _id: userId })
						user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
						user.save((err, user) => {
							if (err) {
								res.statusCode = 500
								res.send(err)
							} else {
								res.cookie("refreshToken", newRefreshToken, utils.authenticate.COOKIE_OPTIONS)
								res.send({ success: true, token })
							}
						})
					}
				} else {
					res.statusCode = 401
					res.send("Unauthorized")
				}
		  	},
		  	err => next(err)
		)
		} catch (err) {
			res.statusCode = 401
			res.send("Unauthorized")
		}
	} else {
	  	res.statusCode = 401
	  	res.send("Unauthorized")
	}
}

exports.me = async(req,res) => {

    let events = await databaseHandler.findData({
        model: "Event"
        ,search_type: "find"
    })
    events = events[0];

	res.send({user: req.user, room_name: 'test room', event_id: 0, events: events})
}


exports.logout = (req,res) => {
	const { signedCookies = {} } = req
	const { refreshToken } = signedCookies
	// const { cookies = {} } = req
	// const { refreshToken } = cookies
	
	User.findById(req.user._id).then(
	  user => {
		const tokenIndex = user.refreshToken.findIndex(
		  item => item.refreshToken === refreshToken
		)
  
		if (tokenIndex !== -1) {
		  user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
		}
  
		user.save((err, user) => {
		  if (err) {
			res.statusCode = 500
			res.send(err)
		  } else {
			res.clearCookie("refreshToken", utils.authenticate.COOKIE_OPTIONS)
			res.send({ success: true })
		  }
		})
	  },
	  err => next(err)
	)
}






