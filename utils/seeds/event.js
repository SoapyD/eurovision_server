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
                    {act: 'Croatia', order: 1},
                    {act: 'Ireland', order: 2},
                    {act: 'Latvia', order: 3},
                    {act: 'Malta', order: 4},
                    {act: 'Norway', order: 5},
                    {act: 'Portugal', order: 6},
                    {act: 'Serbia', order: 7},
                    {act: 'Azerbaijan', order: 8},
                    {act: 'Czech Republic', order: 9},
                    {act: 'Finland', order: 10},
                    {act: 'Israel', order: 11},
                    {act: 'Moldova', order: 12},
                    {act: 'Netherlands', order: 13},
                    {act: 'Sweden', order: 14},
                    {act: 'Switzerland', order: 15},
                ]
            },
            {
                name: 'Semi-Final 2',
                order: 2,
                year: 2023,
                acts: [
                    {act: 'Armenia', order: 1},
                    {act: 'Belgium', order: 2},
                    {act: 'Cyprus', order: 3},
                    {act: 'Denmark', order: 4},
                    {act: 'Estonia', order: 5},
                    {act: 'Greece', order: 6},
                    {act: 'Iceland', order: 7},
                    {act: 'Romania', order: 8},
                    {act: 'Albania', order: 9},
                    {act: 'Australia', order: 10},
                    {act: 'Austria', order: 11},
                    {act: 'Georgia', order: 12},
                    {act: 'Lithuania', order: 13},
                    {act: 'Poland', order: 14},
                    {act: 'San Marino', order: 15},
                    {act: 'Slovenia', order: 16},
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