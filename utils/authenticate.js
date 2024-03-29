const passport = require("passport")
const jwt = require("jsonwebtoken")
const dev = process.env.INSTANCE_TYPE !== "prod"
let sameSite = 'None'
if (process.env.INSTANCE_TYPE !== "prod"){
  sameSite = 'Lax'
}

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: sameSite, //CURRENTLY TURNED OFF AS IT'S STOPPING SIGNED COOKIES PASSING FROM CLIENT
}

exports.getToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  })
}

exports.getRefreshToken = user => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  })
  return refreshToken
}

exports.verifyUser = passport.authenticate("jwt", { session: false })
