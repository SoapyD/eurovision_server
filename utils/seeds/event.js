exports.reset = async() => {

    //REMOVE ALL DATA FOR MODELS WE WANT TO RESET
    let list = [
    {model: "Event"},   
    ]
    await databaseHandler.removeData(list);

    // await exports.create();
}

exports.create = async() => {
    
    let list = {
        model: 'Event'
        ,params:
        [
            {
                name: 'Semi-Final 1',
                order: 1,
                year: 2023,
                acts: [
                    {act: 'Norway', order: 1},
                    {act: 'Malta', order: 2},
                    {act: 'Serbia', order: 3},
                    {act: 'Latvia', order: 4},
                    {act: 'Portugal', order: 5},
                    {act: 'Ireland', order: 6},
                    {act: 'Croatia', order: 7},
                    {act: 'Switzerland', order: 8},
                    {act: 'Israel', order: 9},
                    {act: 'Moldova', order: 10},
                    {act: 'Sweden', order: 11},
                    {act: 'Azerbaijan', order: 12},
                    {act: 'Czech Republic', order: 13},
                    {act: 'Netherlands', order: 14},
                    {act: 'Finland', order: 15},
                ]
            },
            {
                name: 'Semi-Final 2',
                order: 2,
                year: 2023,
                acts: [
                    {act: 'Denmark', order: 1},
                    {act: 'Armenia', order: 2},
                    {act: 'Romania', order: 3},
                    {act: 'Estonia', order: 4},
                    {act: 'Belgium', order: 5},
                    {act: 'Cyprus', order: 6},
                    {act: 'Iceland', order: 7},
                    {act: 'Greece', order: 8},
                    {act: 'Poland', order: 9},
                    {act: 'Slovenia', order: 10},
                    {act: 'Georgia', order: 11},
                    {act: 'San Marino', order: 12},
                    {act: 'Austria', order: 13},
                    {act: 'Albania', order: 14},
                    {act: 'Lithuania', order: 15},
                    {act: 'Australia', order: 16},
                ]
            }            

        ]
    }

    let acts = await databaseHandler.findData({
        model: "Act"
        ,search_type: "find"
    })
    acts = acts[0];

    //foreach event
    list.params.forEach((item) => {
        //foreach act
        item.acts.forEach((subitem) => {

            acts.forEach((act) => {
                if (act.country.name == subitem.act){
                    subitem.act = act._id
                    return
                }
            })

        })
    })


    return Promise.all([databaseHandler.createData(list)]);    
}