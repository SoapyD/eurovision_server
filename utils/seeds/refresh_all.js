const country = require("./country");
const act = require("./act");
const event = require("./event");


exports.run = async() => {
    await country.reset();
    await country.create();
    await act.reset();
    await act.create();  
    await event.reset();
    await event.create();        


    let events = await databaseHandler.findData({
        model: "Event"
        ,search_type: "find"
    })
    events = events[0];
    let act_0 = events[0].acts[0].act;

    console.log("Refresh Complete")
}