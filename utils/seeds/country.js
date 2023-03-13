exports.reset = async() => {

    //REMOVE ALL DATA FOR MODELS WE WANT TO RESET
    let list = [
    {model: "Country"},   
    ]
    await databaseHandler.removeData(list);

    // await exports.create();
}

exports.create = async() => {
    
    let list = {
        model: 'Country'
        ,params:
    [
        {name: 'Albania', order: 1},
        {name: 'Armenia', order: 2},
        {name: 'Australia', order: 3},
        {name: 'Austria', order: 4},
        {name: 'Azerbaijan', order: 5},
        {name: 'Belarus', order: 6},
        {name: 'Belgium', order: 7},
        {name: 'Bulgaria', order: 8},
        {name: 'Croatia', order: 9},
        {name: 'Cyprus', order: 10},
        {name: 'Czech Republic', order: 11},
        {name: 'Denmark', order: 12},
        {name: 'Estonia', order: 13},
        {name: 'Finland', order: 14},
        {name: 'France', order: 15},
        {name: 'Georgia', order: 16},
        {name: 'Germany', order: 17},
        {name: 'Greece', order: 18},
        {name: 'Hungary', order: 19},
        {name: 'Iceland', order: 20},
        {name: 'Ireland', order: 21},
        {name: 'Israel', order: 22},
        {name: 'Italy', order: 23},
        {name: 'Latvia', order: 24},
        {name: 'Lithuania', order: 25},
        {name: 'Malta', order: 26},
        {name: 'Moldova', order: 27},
        {name: 'Montenegro', order: 28},
        {name: 'Netherlands', order: 29},
        {name: 'North Macedonia', order: 30},
        {name: 'Norway', order: 31},
        {name: 'Poland', order: 32},
        {name: 'Portugal', order: 33},
        {name: 'Romania', order: 34},
        {name: 'Russia', order: 35},
        {name: 'San Marino', order: 36},
        {name: 'Serbia', order: 37},
        {name: 'Slovenia', order: 38},
        {name: 'Spain', order: 39},
        {name: 'Sweden', order: 40},
        {name: 'Switzerland', order: 41},
        {name: 'Ukraine', order: 42},
        {name: 'United Kingdom', order: 43},                        
    ]
    }
    return Promise.all([databaseHandler.createData(list)]);    
}