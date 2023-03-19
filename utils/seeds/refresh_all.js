const country = require("./country");
const act = require("./act");
const event = require("./event");
const room = require("./room");


exports.run = async() => {
    await country.reset();
    await country.create();
    await act.reset();
    await act.create();  
    await event.reset();
    await event.create();        

    await room.reset();
    await room.create();

    console.log("Refresh Complete")
}