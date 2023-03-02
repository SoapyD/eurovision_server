// const classes = require("../classes");


exports.user_access = [require("./access").isLoggedIn]
exports.cors = [require("./access").cors]

exports.setup = require("./setup")