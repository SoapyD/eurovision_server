const express = require("express");
const router = express.Router();

const controllers = require('../controllers');
const passport = require("passport");
const utils = require('../utils')


router.post("/register", controllers.authenticate.register)

router.post("/login", passport.authenticate("local"), controllers.authenticate.login)

router.post("/refreshToken", controllers.authenticate.refreshToken)

router.get("/me", utils.authenticate.verifyUser, controllers.authenticate.me)

router.get("/logout", utils.authenticate.verifyUser, controllers.authenticate.logout)

module.exports = router;