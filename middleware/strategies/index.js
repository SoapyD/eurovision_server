
try{
    exports.local = require("./local");
}
catch(error){
    console.log(error)
}

try{
    exports.jwt = require("./jwt");
}
catch(error){
    console.log(error)    
}

try{
    exports.saml = require("./saml");
}
catch(error){
    // console.log(error)    
}