const country = require("./country");
const act = require("./act");


exports.run = async() => {
    await country.reset();
    await country.create();
    // await act.reset();
    // await act.create();    

    console.log("Refresh Complete")
}