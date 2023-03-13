const models = {};
models.Room = require("./room");
models.User = require("./user");
models.Error = require("./error");

models.Country = require("./game/country");
models.Act = require("./game/act");
models.Event = require("./game/event");

module.exports = models